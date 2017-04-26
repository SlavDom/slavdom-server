import * as bcrypt from "bcrypt";
import * as _ from "lodash";
import {Request, Response} from "express";

import UserRepository from "../repositories/userRepository";
import {User, UserData, UserError} from "../types/User";
import signupValidation from "../../shared/signup";

export default class UserController {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async saveUser(req: Request, res: Response): Promise<void> {
    this.validateInput(req.body, signupValidation).then(({errors, isValid}) => {
      if (isValid) {
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
    });
  }

  public ajaxUsernameCheck(req: Request, res: Response): Promise<Response> {
    return this.userRepository.checkUsernameUniqueness(req.params.identifier.toLowerCase())
      .then((user: User) => res.json({user}));
  }

  public ajaxEmailCheck(req: Request, res: Response): Promise<Response> {
    return this.userRepository.checkEmailUniqueness(req.params.identifier.toLowerCase())
      .then((user: User) => res.json({user}));
  }

  private validateInput(
    data: UserData,
    otherValidations: (data: UserData) => { errors: UserError, isValid: boolean },
  ): Promise<{errors: UserError, isValid: boolean}> {
    const {errors} = otherValidations(data);
    const userRepository = new UserRepository();
    return userRepository.checkUniqueness(data.username, data.email).then((user: User) => {
      if (user) {
        if (user.username === data.username) {
          errors.username = "Sorry, this username has been taken";
        }
        if (user.email === data.email) {
          errors.email = "Email is already registered";
        }
      }
      return {
        errors,
        isValid: _.isEmpty(errors),
      };
    });
  }
}
