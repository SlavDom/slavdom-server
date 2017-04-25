import "jest";

import {Request, Response} from "express";
import * as sinon from "sinon";

import NewsController from "../../src/controllers/newsController";
import NewsRepository from "../../src/repositories/newsRepository";
import helper from "../../src/controllers/controllerHelper";
import {ObjectID} from "bson";
import {Page} from "../../src/types/Page";
import * as assert from "assert";

describe("NewsController", () => {
  const newsController = new NewsController();
  const englishLanguageCode: string = "englishLanguageCode";
  const englishLanguageId: ObjectID = new ObjectID("XXXXXXXXXXXX");
  const notExistingLanguageCode: string = "notExistingLanguageCode";

  const req: Request = {} as Request;
  req.query = {};
  const res: Response = {} as Response;
  res.send = () => res;

  afterEach = () => {
    req.query = {};
  };

  describe("#getNews()", () => {
    const spy = sinon.spy(helper, "sendData");
    const randomNewsTheme: string =  "randomNewsTheme";
    const testNews: object = {
      theme: randomNewsTheme,
      languageId: englishLanguageId,
    };

    test("gets the news by theme and language", () => {
      req.query.lang = englishLanguageCode;
      req.query.theme = randomNewsTheme;
      NewsRepository.prototype.getNews = jest.fn().mockReturnValue(testNews);
      return newsController.getNews(req, res).then(() => {
        assert(spy.withArgs(res, testNews).calledOnce);
      });
    });

    test("returns empty object if there is no such a language", () => {
      req.query.lang = notExistingLanguageCode;
      req.query.theme = randomNewsTheme;
      NewsRepository.prototype.getNews = jest.fn().mockReturnValue(null);
      return newsController.getNews(req, res).then(() => {
        assert(spy.withArgs(res, null).calledOnce);
      });
    });
  });

  describe("#getNewsPage()", () => {
    const spy = sinon.spy(helper, "sendDataWithoutShell");
    const existingPage: number = 1;
    const nonExistingPage: number = 3;
    const newsList: Page<object> = {
      data: [
        {
          fullText: "",
          theme: "hello-world",
        },
        {
          fulltext: "",
          theme: "hello-england",
        },
      ],
      amount: 2,
    };
    const emptyList: Page<object> = {
      data: [],
      amount: 0,
    };

    test("gets the news list by language, page and page length", () => {
      req.query.lang = englishLanguageCode;
      req.query.amount = 3;
      req.query.page = existingPage;
      NewsRepository.prototype.getNewsPage = jest.fn().mockReturnValue(newsList);
      return newsController.getNewsPage(req, res).then(() => {
        assert(spy.withArgs(res, newsList).calledOnce);
      });
    });

    test("returns empty list if there is no such a language", () => {
      req.query.lang = nonExistingPage;
      req.query.amount = 3;
      req.query.page = nonExistingPage;
      NewsRepository.prototype.getNewsPage = jest.fn().mockReturnValue(emptyList);
      return newsController.getNewsPage(req, res).then(() => {
        assert(spy.withArgs(res, emptyList).calledOnce);
      });
    });

    test("returns the first page if the page value is too big", () => {
      req.query.lang = englishLanguageCode;
      req.query.amount = 3;
      req.query.page = nonExistingPage;
      NewsRepository.prototype.getNewsPage = jest.fn().mockReturnValue(newsList);
      return newsController.getNewsPage(req, res).then(() => {
        assert(spy.withArgs(res, newsList).calledTwice);
      });
    });
  });
});
