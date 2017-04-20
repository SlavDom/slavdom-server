import mongoose from "../db";
import userSchema from "../schemas/userSchema";
import * as logger from "../../logger";

export default class UserModel {

  private mongooseUserModel: any;

  constructor() {
    this.mongooseUserModel = mongoose.model("User", userSchema);
  }

  public async create(user) {
    const userObject = this.mongooseUserModel(user);
    return userObject.save(err => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`User ${user.name} has been created.`);
      return true;
    });
  }

  public async checkUniqueness(username, email) {
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
