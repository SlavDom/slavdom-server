import {Strategy as LocalStrategy} from 'passport-local';
import userRepository from '../repositories/userRepository';
import * as moment from 'moment';
import AppError from '../appError';
import helper from './authHelper';

export default function init(passport) {
    let strategySignInSettings = {
        usernameField: 'username',
        passwordField: 'password',
        // allows to pass in the express req
        passReqToCallback: true
    };

    let strategySignUpSettings = {
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
        logOut: logOut,
        signUpPost: passport.authenticate('local-signup', {}),
        activate: activate,
        forgotPasswordPost: forgotPasswordPost,
        resetPasswordPost: resetPasswordPost
    };
}

async function logInPostLocal(req, email, password, done) {
    if (email) email = email.toLowerCase();

    try {
        let user = await userRepository.getLocalUserByEmail(email);

        // if no user is found
        if (!user) throw new AppError('auth', 'user_not_found');

        if (!user.profile.local.isActivated) {
            throw new AppError('auth', 'account_not_activated');
        }

        let isCorrectPassword = await userRepository.comparePasswords(user.id, password);

        if (!isCorrectPassword) throw new AppError('auth', 'wrong_password');

        //all is ok!
        return done(null, user);
    }
    catch (err) {
        let errorMessage = helper.handleError(err);
        helper.sendAuthErrorMessage(errorMessage, done, req);
    }
}

async function signUpPostLocal(req, name, surname, patronymic, country, email, username, password, done) {
    try {
        //Use lower-case e-mails to avoid case-sensitive e-mail matching
        if (email) email = email.toLowerCase();

        if (req.user) throw new AppError('auth', 'already_logged_in');

        let localUser = await userRepository.getLocalUserByEmail(email);

        let alreadyActivated = localUser && localUser.profile.local.isActivated;
        if (alreadyActivated) throw new AppError('auth', 'email_activated');

        let user = await userRepository.findUserWithEmail(email);
        user = await userRepository.saveLocalAccount(user, {
            name: name,
            surname: surname,
            patronymic: patronymic,
            country: country,
            email: email,
            username: username,
            password: password
        });

        await helper.sendActivationEmail(user.email, user.profile.local.activation.token);

      let message = 'info.auth.activation_email_confirmation';
      return helper.sendAuthMessage(message, 'success', done, req);
    }
    catch (err) {
        let errorMessage = helper.handleError(err);
        helper.sendAuthErrorMessage(errorMessage, done, req);
    }
}

async function activate(req, res) {
    try {
        let token = req.params.token;

        if (!token) throw new AppError('auth', 'activation:no_token');

        let localUser = await userRepository.getUserByActivationToken(token);

        if (!localUser) throw new AppError('auth', 'wrong_activation_token');

        let activationTime = localUser.profile.local.activation.created;
        let isTokenExpired = moment().diff(activationTime, 'hours') > 24;

        if (isTokenExpired) {
            let user = await userRepository.refreshActivationToken(localUser.id);

            await helper.sendActivationEmail(user.email, user.profile.local.activation.token);

            throw new AppError('auth', 'activation:expired_token');
        } else {
            await userRepository.activateUser(localUser.id);

            let message = 'info.auth.activation_success';
            return helper.redirectToLogIn(message, 'info', req, res);
        }
    } catch (err) {
        let errorMessage = helper.handleError(err);
        return helper.redirectToLogIn(errorMessage, 'error', req, res);
    }
}

async function logOut(req, res) {
    req.logOut();
    res.redirect('/login');
}

async function forgotPasswordPost(req, res) {
    try {
        let email = req.body.email.toLowerCase();

        let localUser = await userRepository.getLocalUserByEmail(email);

        if (!localUser) throw new AppError('auth', 'forgot_password:no_email');

        let updatedUser = await userRepository.resetPassword(localUser.id);

        await helper.sendResetPasswordEmail(updatedUser.email, updatedUser.profile.local.reset.token);

        let message = 'info.auth.reset_password_email_confirmation';
        helper.setStatusMessage(req, message, 'success');
        return res.send({success: message})

    } catch (err) {
        let errorMessage = helper.handleError(err);
        helper.setStatusMessage(req, errorMessage, 'error');
        return res.send({error: errorMessage})
    }
}

async function resetPasswordPost(req, res) {
    try {
        let token = req.body.token;
        let password = req.body.password;

        let localUser = await getUserByResetToken(token);

        await userRepository.updateUserPassword(localUser.id, password);

        let message = 'info.auth.reset_password_success';
        helper.redirectToLogIn(message, 'success', req, res);

    } catch (err) {
        let errorMessage = helper.handleError(err);
        return res.send({error: errorMessage})
    }
}

async function getUserByResetToken(token) {
    if (!token) throw new AppError('auth', 'reset_password:no_token');

    let localUser = await userRepository.getUserByResetToken(token);

    if (!localUser) throw new AppError('auth', 'reset_password:wrong_token');

    let activationTime = localUser.profile.local.reset.created;
    let isTokenExpired = moment().diff(activationTime, 'hours') > 24;

    if (isTokenExpired) {
        let user = await userRepository.refreshResetToken(localUser.id);

        await helper.sendResetPasswordEmail(user.email, user.profile.local.reset.token);

        throw new AppError('auth', 'reset_password:expired_token');
    }

    return localUser;
}