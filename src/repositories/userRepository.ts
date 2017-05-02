import UserModel from "../db/models/userModel";
import {User} from "../types/User";

export default class UserRepository {

  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public async saveUser(user: User) {
    await this.userModel.create(user);
  }

  public getUserByUsernameOrEmail(username: string, email: string) {
    return this.userModel.getUserByUsernameOrEmail(username, email);
  }

  public checkUniqueness(username: string, email: string) {
    return this.userModel.checkUniqueness(username, email);
  }

  public checkUsernameUniqueness(username: string) {
    return this.userModel.checkUsernameUniqueness(username);
  }

  public checkEmailUniqueness(email: string) {
    return this.userModel.checkEmailUniqueness(email);
  }

}
