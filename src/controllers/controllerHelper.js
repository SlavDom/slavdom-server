import errorHelper from '../helpers/errorHelper';

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

export default {
  sendFailureMessage,
  sendSuccessMessage,
  sendData,
};
