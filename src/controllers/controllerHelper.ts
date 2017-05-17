import { logError } from "../logger";
import {Response} from "express";

function sendFailureMessage(error: Error, res: Response): void {
  const message = logError(error);
  res.send({
    status: "failure",
    message,
  });
}

function sendData(res: Response, data?: object): void {
  res.send({
    status: "success",
    data,
  });
}

function sendDataWithoutShell(res: Response, data: object): void {
  res.send(data);
}

export default {
  sendFailureMessage,
  sendData,
  sendDataWithoutShell,
};
