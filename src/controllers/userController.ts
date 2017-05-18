import * as bcrypt from "bcrypt";
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
    const {errors, isValid} = await this.validateSignupInput(req.body, signupValidation);
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
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    let login: string = req.query.login;
    if (login === "me") {
      login = "eakarpov"; // TODO: When added auth plug-in insert here user's own login
    }
    this.userRepository.getUserByUserName(login)
        .then((user) => {
          if (user == null) {
            res.json(200, {});
          } else {
            res.json(200, {
              username: user.username,
              name: user.name,
              surname: user.surname,
            });
          }
        })
        .catch((e) => {
          res.json(400, e);
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

  private validateSignupInput(
    data: UserSignupData,
    otherValidations: (data: UserSignupData) => ValidationResult<UserSignupErrors>,
  ): Promise<ValidationResult<UserSignupErrors>> {
    const validationResult = otherValidations(data);
    const userRepository = new UserRepository();
    return userRepository.checkUniqueness(data.username, data.email).then((user: User) => {
      if (user) {
        if (user.username === data.username) {
          validationResult.errors.username = "Sorry, this username has been taken";
          validationResult.isValid = false;
        }
        if (user.email === data.email) {
          validationResult.errors.email = "Email is already registered";
          validationResult.isValid = false;
        }
      }
      return validationResult;
    });
  }
}
