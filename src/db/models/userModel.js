import mongoose from '../db';
import userSchema from '../schemas/userSchema';

export default class UserModel {

  constructor() {
    this.userModel = mongoose.model('User', userSchema);
  }

  async create(user) {
    const userObject = this.userModel(user);
    return userObject.save((err) => {
      if (err) throw err;
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
      })
      .exec((err, user) => {
        if (err) throw err;
        return user;
      });
  }

}
