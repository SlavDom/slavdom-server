import mongoose from "../db";
import userSchema from "../schemas/userSchema";
import * as logger from "../../logger";
import {IUser} from "../data/user";
import {MongoError} from "mongodb";

export default class UserModel {

  private mongooseUserModel: any;

  constructor() {
    this.mongooseUserModel = mongoose.model("User", userSchema);
  }

  public async create(user: IUser): Promise<IUser> {
    const userObject = this.mongooseUserModel(user);
    return userObject.save((err: MongoError): boolean => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`User ${user.name} has been created.`);
      return true;
    });
  }

  public async checkUniqueness(username: string, email: string): Promise<IUser> {
    return this.mongooseUserModel
      .findOne({
        $or: [
          { username },
          { email },
        ],
      }, "username email")
      .exec((err, user) => {
        if (err) {
          throw err;
        }
        return user;
      });
  }

}
