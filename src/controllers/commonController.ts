import { sendMail } from "../utils/mailer";
import helper from "./controllerHelper";
import { logInfo } from "../logger";

export default class CommonController {

  public static async mailSender(req, res) {
    try {
      const from = req.body.from;
      const message = req.body.message;
      const theme = req.body.theme;
      const result = await
      sendMail(from, theme, message);
      logInfo("Mail is sent!");
      return helper.sendData({data: result}, res);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }
}
