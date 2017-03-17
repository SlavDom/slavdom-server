import config from '../config';
import emailHelper from '../helpers/emailHelper';
import errorHelper from '../helpers/errorHelper';
import AppError from '../appError';

const configuration = require('../../conf.json');

function setStatusMessage(req, message, type) {
  if (!type) {
    type = 'error';
  }

  let uiClass = '';

  switch (type) {
    case 'error':
      uiClass = 'alert-danger';
      break;
    case 'success':
      uiClass = 'alert-success';
      break;
    case 'info':
      uiClass = 'alert-info';
      break;
    case 'warning':
      uiClass = 'alert-warning';
      break;
    default:
      throw new AppError(`Not supported status message type: '${type}'`);
  }

  const statusMessage = {
    message,
    uiClass,
  };

  req.flash('statusMessage', statusMessage);
}

function redirectToLogIn(message, type, req, res) {
  setStatusMessage(req, message, type);
  res.redirect(`${configuration.client_dev_href}/login`);
}

function sendAuthErrorMessage(message, done, req) {
  return done(null, false, setStatusMessage(req, message));
}

function sendAuthMessage(message, type, done, req) {
  if (message) return done(null, false, setStatusMessage(req, message, type));

  return done();
}

function sendResetPasswordEmail(email, token) {
  const data = {
    token,
    siteRootUrl: config.app.rootUrl,
  };

  return emailHelper.sendEmailTemplate('password_reset', data, {
    to: email,
    from: config.email.fromNoReply,
  });
}

function sendActivationEmail(email, token) {
  const data = {
    token,
    siteRootUrl: config.app.rootUrl,
  };

  return emailHelper.sendEmailTemplate('activation', data, {
    to: email,
    from: config.email.fromNoReply,
  });
}

function handleError(error) {
  errorHelper.logError(error);

  const errorMessage = errorHelper.getErrorMessage(error);

  if (!errorMessage) return 'Auth Error'; // Cannot find error description

  return errorMessage;
}

export default {
  setStatusMessage,
  handleError,
  redirectToLogIn,
  sendAuthErrorMessage,
  sendAuthMessage,
  sendResetPasswordEmail,
  sendActivationEmail,
};
