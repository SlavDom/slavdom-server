import "jest";
import {Response, Request} from "express";
import * as sinon from "sinon";

import UserController from "../../src/controllers/userController";
import UserRepository from "../../src/repositories/userRepository";
import {User} from "../../src/db/types/User";

describe("userController", () => {
  const userController: UserController = new UserController();

  const req: Request = {} as Request;
  const res: Response = {} as Response;
  res.json = () => res;

  const username: string = "username";
  let spy: any;

  afterEach = (() => {
    spy.restore();
  });

  beforeEach(() => {
    spy = sinon.spy(res, "json");
  });

  describe("#saveUser()", () => {
    const password: string = "myPassword";
    const email: string = "email";
    const timezone: string = "timezome";

    test("successfully save sent user", () => {
      req.body.password = password;
      req.body.username = username;
      req.body.email = email;
      req.body.timezone = timezone;
      UserRepository.prototype.saveUser = jest.fn().mockReturnValue(true);
      return userController.saveUser(req, res).then(() => {
        expect(spy.withArgs({success: true}).calledOnce).toBeTruthy();
      });
    });
  });

  describe("#ajaxCheck()", () => {
    const user: User = {
      username,
    } as User;

    test("got the user if such one exists in the database", () => {
      req.params.identifier = username;
      UserRepository.prototype.checkUniqueness = jest.fn().mockReturnValue(user);
      return userController.ajaxCheck(req, res).then((response: Response) => {
        expect(user).toEqual(response.user);
      });
    });
  });
});