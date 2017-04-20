import { logError } from "../logger";

function sendFailureMessage(error, res) {
  const message = logError(error);
  res.send({ status: "failure", message });
}

function sendSuccessMessage(message, res) {
  res.send({ status: "success", message });
}

function sendData(data, res) {
  data.status = "success";
  res.send(data);
}

export default {
  sendFailureMessage,
  sendSuccessMessage,
  sendData,
};
