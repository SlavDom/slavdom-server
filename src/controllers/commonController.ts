import { sendMail } from "../utils/mailer";
import helper from "./controllerHelper";
import { logInfo } from "../logger";
import {Request, Response} from "express";
import {UserSignupErrors} from "../types/User";
import signupValidation from "../../shared/signup";

export default class CommonController {

  public static async mailSender(req: Request, res: Response): Promise<void> {
    try {
      const from = req.body.from;
      const message = req.body.message;
      const theme = req.body.theme;
      const result = await sendMail(from, theme, message);
      logInfo("Mail is sent!");
      return helper.sendData(res, result);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }

  public static async validateSignUp(req: Request, res: Response): Promise<void> {
    try {
      const data = JSON.parse(req.query.data);
      const field = req.query.field;
      const errors = JSON.parse(req.query.errors);
      const validator: UserSignupErrors = await signupValidation(data, field, errors);
      return helper.sendDataWithoutShell(res, validator);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }
}
