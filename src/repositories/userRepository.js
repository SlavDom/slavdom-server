import UserModel from '../db/models/userModel';

export default class UserRepository {

  constructor() {
    this.userModel = new UserModel();
  }

  async saveUser(user) {
    await this.userModel.create(user);
  }

}
