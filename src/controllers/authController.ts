import {Request, Response} from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import UserRepository from "../repositories/userRepository";
import signinValidation from "../../shared/signin";
import config from "../config";

export default class AuthController {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public auth(req: Request, res: Response) {
    const { errors, isValid } = signinValidation(req.body);
    if (isValid) {
      const { identifier, password } = req.body;
      this.userRepository.getUserByUsernameOrEmail(identifier, identifier).then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.passwordDigest)) {
            const token = jwt.sign({
              id: user.id,
              username: user.username,
            }, config.jwtSecret);
            res.json({token});
          } else {
            res.status(401).json({errors: {form: "Invalid Credentials"}});
          }
        } else {
          res.status(401).json({errors: {form: "Invalid Credentials"}});
        }
      });
    } else {
      res.status(400).json(errors);
    }
  }

}
