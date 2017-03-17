import * as Joi from 'joi';
import errorHelper from '../helpers/errorHelper';
import AppError from '../appError';

function sendFailureMessage(error, res) {
  errorHelper.logError(error);
  const errorMessage = errorHelper.getErrorMessage(error);

  res.send({ status: 'failure', message: errorMessage });
}

function sendSuccessMessage(message, res) {
  res.send({ status: 'success', message });
}

function sendData(data, res) {
  data.status = 'success';
  res.send(data);
}

function loadSchema(data, schema) {
  const validationOptions = {
    stripUnknown: true,
  };

  return new Promise(
        (resolve, reject) => {
          Joi.validate(data, schema, validationOptions, (err, val) => {
            if (!err) return resolve(val);

            let error = null;

            if (err.name !== 'ValidationError') {
              error = new Error('Unsupported Validation Error');
              return reject(err);
            }

            const validationMessage = err.details[0].message;

            error = new AppError('app', 'request_validation', {
              data: { validationMessage },
            });

            return reject(error);
          });
        });
}

export default {
  sendFailureMessage,
  sendSuccessMessage,
  sendData,
  loadSchema,
};
