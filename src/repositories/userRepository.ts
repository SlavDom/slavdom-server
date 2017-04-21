import UserModel from "../db/models/userModel";
import {User} from "../db/data/User";

export default class UserRepository {

  private userModel: any;

  constructor() {
    this.userModel = new UserModel();
  }

  public async saveUser(user: User) {
    await this.userModel.create(user);
  }

  public checkUniqueness(username: string, email: string) {
    return this.userModel.checkUniqueness(username, email);
  }

}
