import mongoose from '../db';
import userSchema from '../schemas/userSchema';
import * as logger from '../../logger';

export default class UserModel {

  userModel: any;

  constructor() {
    this.userModel = mongoose.model('User', userSchema);
  }

  async create(user) {
    const userObject = this.userModel(user);
    return userObject.save((err) => {
      if (err) throw err;
      logger.logDatabase(`User ${user.name} has been created.`);
      return true;
    });
  }

  async checkUniqueness(username, email) {
    return this.userModel
      .findOne({
        $or: [
          { username },
          { email },
        ],
      }, 'username email')
      .exec((err, user) => {
        if (err) throw err;
        return user;
      });
  }

}
