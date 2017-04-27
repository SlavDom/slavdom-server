import "jest";
import * as sinon from "sinon";
import {Response, Request} from "express";

import CommonController from "../../src/controllers/commonController";
import helper from "../../src/controllers/controllerHelper";
import * as mailer from "../../src/utils/mailer";
import {SentMessageInfo} from "nodemailer";

describe("commonController", () => {
  const req: Request = {} as Request;
  req.query = {};
  const res: Response = {} as Response;
  res.send = () => res;

  afterEach = (() => {
    req.query = {};
  });

  describe("#mailSender()", () => {
    const email: string = "me@ya.ru";
    const message: string = "some message";
    const theme: string = "my theme";
    const sentMessageInfo: SentMessageInfo = {
      messageId: "myId",
      envelope: "",
      accepted: ["nothing"],
      rejected: ["nothing"],
      response: "Everything is OK",
    };

    test("email is sent with requested theme and message", () => {
      req.query.from = email;
      req.query.theme = theme;
      req.query.message = message;
      const spy = sinon.spy(helper, "sendData");
      jest.mock("../../src/utils/mailer");
      mailer.sendMail.mockImplementation(() => {
        return sentMessageInfo;
      });
      return CommonController.mailSender(req, res).then(() => {
        expect(spy.withArgs(res, sentMessageInfo).calledOnce).toBeTruthy();
      });
    });
  });
});
