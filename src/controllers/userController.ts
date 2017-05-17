import * as bcrypt from "bcrypt";
import * as _ from "lodash";
import {Request, Response} from "express";

import UserRepository from "../repositories/userRepository";
import {User, UserSignupData, UserSignupErrors} from "../types/User";
import signupValidation from "../../shared/signup";

export default class UserController {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async saveUser(req: Request, res: Response): Promise<void> {
    const formPasswordData: string = req.body.password;
    const formUsernameData: string = req.body.username;
    const formEmailData: string = req.body.email;
    const formTimezoneData: string = req.body.timezone;
    const userData: UserSignupData = {
      username: {
        value: formUsernameData,
        touched: true,
      },
      email: {
        value: formEmailData,
        touched: true,
      },
      password: {
        value: formPasswordData,
        touched: true,
      },
      passwordConfirmation: {
        value: formPasswordData,
        touched: true,
      },
      timezone: {
        value: formTimezoneData,
        touched: true,
      },
    } as UserSignupData;
    const errors = await this.validateInput(userData, signupValidation);
    if (_.every(errors, (elem) => _.isUndefined(elem))) {
      const passwordDigest = bcrypt.hashSync(req.body.password, 10);
      const username = req.body.username.toLowerCase();
      const email = req.body.email.toLowerCase();
      const timezone = req.body.timezone;
      const user = {username, passwordDigest, timezone, email} as User;
      this.userRepository.saveUser(user)
        .then(() => res.json({success: true}))
        .catch((err: Error) => res.status(500).json({error: err}));
    } else {
      res.status(400).json(errors);
    }
  }

  public ajaxUsernameCheck(req: Request, res: Response): Promise<Response> {
    return this.userRepository.checkUsernameUniqueness(req.params.identifier.toLowerCase())
      .then((user: User) => res.json({user}));
  }

  public ajaxEmailCheck(req: Request, res: Response): Promise<Response> {
    return this.userRepository.checkEmailUniqueness(req.params.identifier.toLowerCase())
      .then((user: User) => res.json({user}));
  }

  private async validateInput(
    data: UserSignupData,
    otherValidations: (data: UserSignupData, field: string|undefined, errors: UserSignupErrors) => UserSignupErrors,
  ): Promise<UserSignupErrors> {
    const errors = await otherValidations(data, undefined, {
      username: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined,
      timezone: undefined,
    });
    const userRepository = new UserRepository();
    return userRepository.checkUniqueness(data.username.value, data.email.value).then((user: User) => {
      if (user) {
        if (user.username === data.username.value) {
          errors.username = "Sorry, this username has been taken";
        }
        if (user.email === data.email.value) {
          errors.email = "Email is already registered";
        }
      }
      return errors;
    });
  }
}
