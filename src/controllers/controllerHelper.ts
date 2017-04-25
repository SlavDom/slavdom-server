import { logError } from "../logger";
import {Response} from "express";

function sendFailureMessage(error: Error | string, res: Response): void {
  const message = logError(error);
  res.send({
    status: "failure",
    message,
  });
}

function sendSuccessMessage(message: string, res: Response): void {
  res.send({
    status: "success",
    message,
  });
}

function sendData(res: Response, data?: object): void {
  res.send({
    status: "success",
    data,
  });
}

function sendDataWithoutShell(data: object, res: Response): void {
  res.send(data);
}

export default {
  sendFailureMessage,
  sendSuccessMessage,
  sendData,
  sendDataWithoutShell,
};
