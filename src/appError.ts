import * as _ from "lodash";

export default class AppError {

  private message: string;
  private uiShow: boolean;
  private log: boolean;
  private type: string;
  private code: string;
  private data: any;
  private isAppError: boolean;

  constructor(...args: string[]) {
    this.message = "";
    this.uiShow = true;
    this.log = false;
    this.type = "";
    this.code = "";
    this.data = null;
    this.isAppError = true;

    Error.captureStackTrace(this, this.constructor);

    if (_.isString(args[0]) && _.isString(args[1])) {
      this.type = args[0];
      this.code = args[1];
      _.merge(this, args[2]);
    } else if (_.isString(args[0])) {
      this.message = args[0];
      _.merge(this, args[1]);
    } else {
      throw new Error("Unsupported AppError signature");
    }
  }
}
