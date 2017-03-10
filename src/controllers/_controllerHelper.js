import errorHelper from "../helpers/errorHelper";
import AppError from "../appError";
import {Response} from "express";
import * as Joi from "joi";

export default {
    sendFailureMessage,
    sendSuccessMessage,
    sendData,
    loadSchema
};

function sendFailureMessage(error, res) {
    errorHelper.logError(error);
    let errorMessage = errorHelper.getErrorMessage(error);

    res.send({status: 'failure', message: errorMessage});
}

function sendSuccessMessage(message, res) {
    res.send({status: 'success', message: message});
}

function sendData(data, res) {
    data.status = 'success';
    res.send(data);
}

function loadSchema(data, schema): Promise<any> {
    let validationOptions = {
        stripUnknown: true
    };

    return new Promise(
        (resolve, reject) => {
        Joi.validate(data, schema, validationOptions, function (err, val) {
            if (!err) return resolve(val);

            let error = null;

            if (err.name !== 'ValidationError') {
                error = new Error('Unsupported Validation Error');
                return reject(err);
            }

            let validationMessage = err.details[0].message;

            error = new AppError('app', 'request_validation', {
                data: {validationMessage}
            });

            return reject(error);
        });
    });
}