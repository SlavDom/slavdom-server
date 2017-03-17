import { Strategy as LocalStrategy } from 'passport-local';
import * as moment from 'moment';
import userRepository from '../repositories/userRepository';
import AppError from '../appError';
import helper from './authHelper';

async function getUserByResetToken(token) {
  if (!token) throw new AppError('auth', 'reset_password:no_token');

  const localUser = await userRepository.getUserByResetToken(token);

  if (!localUser) throw new AppError('auth', 'reset_password:wrong_token');

  const activationTime = localUser.profile.local.reset.created;
  const isTokenExpired = moment().diff(activationTime, 'hours') > 24;

  if (isTokenExpired) {
    const user = await userRepository.refreshResetToken(localUser.id);

    await helper.sendResetPasswordEmail(user.email, user.profile.local.reset.token);

    throw new AppError('auth', 'reset_password:expired_token');
  }

  return localUser;
}

async function logInPostLocal(req, email, password, done) {
  if (email) email = email.toLowerCase();

  try {
    const user = await userRepository.getLocalUserByEmail(email);

        // if no user is found
    if (!user) throw new AppError('auth', 'user_not_found');

    if (!user.profile.local.isActivated) {
      throw new AppError('auth', 'account_not_activated');
    }

    const isCorrectPassword = await userRepository.comparePasswords(user.id, password);

    if (!isCorrectPassword) throw new AppError('auth', 'wrong_password');

        // all is ok!
    return done(null, user);
  } catch (err) {
    const errorMessage = helper.handleError(err);
    return helper.sendAuthErrorMessage(errorMessage, done, req);
  }
}

async function signUpPostLocal(req, name, surname, patronymic, country, email, username, password, done) {
  try {
        // Use lower-case e-mails to avoid case-sensitive e-mail matching
    if (email) email = email.toLowerCase();

    if (req.user) throw new AppError('auth', 'already_logged_in');

    const localUser = await userRepository.getLocalUserByEmail(email);

    const alreadyActivated = localUser && localUser.profile.local.isActivated;
    if (alreadyActivated) throw new AppError('auth', 'email_activated');

    let user = await userRepository.findUserWithEmail(email);
    user = await userRepository.saveLocalAccount(user, {
      name,
      surname,
      patronymic,
      country,
      email,
      username,
      password,
    });

    await helper.sendActivationEmail(user.email, user.profile.local.activation.token);

    const message = 'info.auth.activation_email_confirmation';
    return helper.sendAuthMessage(message, 'success', done, req);
  } catch (err) {
    const errorMessage = helper.handleError(err);
    helper.sendAuthErrorMessage(errorMessage, done, req);
  }
}

async function activate(req, res) {
  try {
    const token = req.params.token;

    if (!token) throw new AppError('auth', 'activation:no_token');

    const localUser = await userRepository.getUserByActivationToken(token);

    if (!localUser) throw new AppError('auth', 'wrong_activation_token');

    const activationTime = localUser.profile.local.activation.created;
    const isTokenExpired = moment().diff(activationTime, 'hours') > 24;

    if (isTokenExpired) {
      const user = await userRepository.refreshActivationToken(localUser.id);

      await helper.sendActivationEmail(user.email, user.profile.local.activation.token);

      throw new AppError('auth', 'activation:expired_token');
    } else {
      await userRepository.activateUser(localUser.id);

      const message = 'info.auth.activation_success';
      return helper.redirectToLogIn(message, 'info', req, res);
    }
  } catch (err) {
    const errorMessage = helper.handleError(err);
    return helper.redirectToLogIn(errorMessage, 'error', req, res);
  }
}

async function logOut(req, res) {
  req.logOut();
  res.redirect('/login');
}

async function forgotPasswordPost(req, res) {
  try {
    const email = req.body.email.toLowerCase();

    const localUser = await userRepository.getLocalUserByEmail(email);

    if (!localUser) throw new AppError('auth', 'forgot_password:no_email');

    const updatedUser = await userRepository.resetPassword(localUser.id);

    await helper.sendResetPasswordEmail(updatedUser.email, updatedUser.profile.local.reset.token);

    const message = 'info.auth.reset_password_email_confirmation';
    helper.setStatusMessage(req, message, 'success');
    return res.send({ success: message });
  } catch (err) {
    const errorMessage = helper.handleError(err);
    helper.setStatusMessage(req, errorMessage, 'error');
    return res.send({ error: errorMessage });
  }
}

async function resetPasswordPost(req, res) {
  try {
    const token = req.body.token;
    const password = req.body.password;

    const localUser = await getUserByResetToken(token);

    await userRepository.updateUserPassword(localUser.id, password);

    const message = 'info.auth.reset_password_success';
    return helper.redirectToLogIn(message, 'success', req, res);
  } catch (err) {
    const errorMessage = helper.handleError(err);
    return res.send({ error: errorMessage });
  }
}

export default function init(passport) {
  const strategySignInSettings = {
    usernameField: 'username',
    passwordField: 'password',
    // allows to pass in the express req
    passReqToCallback: true,
  };

  const strategySignUpSettings = {
    nameField: 'name',
    surnameField: 'surname',
    patronymicField: 'patronymic',
    countryField: 'country',
    emailField: 'email',
    usernameField: 'username',
    passwordField: 'password',
  };

  passport.use('local-signup', new LocalStrategy(strategySignUpSettings, signUpPostLocal));
  passport.use('local-login', new LocalStrategy(strategySignInSettings, logInPostLocal));

  return {
    logInPost: passport.authenticate('local-login', {}),
    logOut,
    signUpPost: passport.authenticate('local-signup', {}),
    activate,
    forgotPasswordPost,
    resetPasswordPost,
  };
}
