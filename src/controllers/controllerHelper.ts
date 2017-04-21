import { logError } from "../logger";
import {Response} from "express";

function sendFailureMessage(error: Error | string, res: Response) {
  const message = logError(error);
  res.send({ status: "failure", message });
}

function sendSuccessMessage(message: string, res: Response) {
  res.send({ status: "success", message });
}

function sendData(data, res: Response) {
  data.status = "success";
  res.send(data);
}

export default {
  sendFailureMessage,
  sendSuccessMessage,
  sendData,
};
