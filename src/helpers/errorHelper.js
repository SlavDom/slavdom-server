import logger from '../logger';
import textValue from './textValueHelper';

export default {
    logError,
    getErrorMessage
};

function getErrorMessage(error) {
    if (!error) return '';

    if (error.isAppError) {
        if (!error.message) {
            let message = textValue.error(error.type, error.code, error.data);
            if (!message) message = `Cannot find error message for type:${error.type} code:${error.code}`;
            error.message = message;
        }
        if (error.uiShow) return error.message;
    }

    return error.message || error;
}

function logError(error) {
    if (error.isAppError && !error.log) return;
    logger.error(error);
}