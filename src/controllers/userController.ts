import * as bcrypt from "bcrypt";
import {Request, Response} from "express";

import UserRepository from "../repositories/userRepository";

export default class UserController {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async saveUser(req: Request, res: Response): Promise<void> {
    const passwordDigest = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();
    const timezone = req.body.timezone;
    const user = {username, passwordDigest, timezone, email};
    this.userRepository.saveUser(user)
      .then(() => res.json({success: true}))
      .catch(err => res.status(500).json({error: err}));
  }

  public ajaxCheck(req: Request, res: Response): JSON {
    return this.userRepository.checkUniqueness(req.params.identifier.toLowerCase(), req.params.identifier.toLowerCase())
      .then(user => res.json({user}));
  }
}
