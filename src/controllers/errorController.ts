import helper from "./controllerHelper";
import {Request, Response} from "express";

async function send(req: Request, res: Response) {
  try {
    return helper.sendFailureMessage("404 error", res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

export default {
  send,
};
