import "jest";

import {Request, Response} from "express";

import NewsController from "../../src/controllers/newsController";
import NewsRepository from "../../src/repositories/newsRepository";
import helper from "../../src/controllers/controllerHelper";
import {News} from "../../src/db/types/News";
import {ObjectID} from "bson";
import {Page} from "../../src/types/Page";

describe("NewsController", () => {
  const newsController = new NewsController();
  const englishLanguageCode: string = "englishLanguageCode";
  const englishLanguageId: ObjectID = new ObjectID("XXXXXXXXXXXX");
  const notExistingLanguageCode: string = "notExistingLanguageCode";

  const req: Request = {} as Request;
  req.query = {};
  const res: Response = {} as Response;

  afterEach = () => {
    req.query = {};
  };

  describe("#getNews()", () => {
    const randomNewsTheme: string =  "randomNewsTheme";
    const testNews: object = {
      theme: randomNewsTheme,
      languageId: englishLanguageId,
    };

    test("gets the news by theme and language", () => {
      req.query.lang = englishLanguageCode;
      req.query.theme = randomNewsTheme;
      NewsRepository.prototype.getNews = jest.fn().mockReturnValue(testNews);
      helper.sendData = jest.fn().mockReturnValue(testNews);
      return newsController.getNews(req, res).then((news: News) => {
        expect(news).toEqual(testNews);
      });
    });

    test("returns empty object if there is no such a language", () => {
      req.query.lang = notExistingLanguageCode;
      req.query.theme = randomNewsTheme;
      NewsRepository.prototype.getNews = jest.fn().mockReturnValue(null);
      helper.sendData = jest.fn().mockReturnValue(undefined);
      return newsController.getNews(req, res).then((news: News) => {
        expect(news).toEqual(undefined);
      });
    });
  });

  describe("#getNewsPage()", () => {
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
      NewsRepository.prototype.getNewsPage = jest.fn().mockReturnValue(englishLanguageId);
      helper.sendDataWithoutShell = jest.fn().mockReturnValue(newsList);
      return newsController.getNewsPage(req, res).then((page: Page<News>) => {
        page.data.forEach((news: News) => {
          expect(newsList.data).toContain(news);
        });
        expect(page.amount).toEqual(2);
      });
    });

    test("returns empty list if there is no such a language", () => {
      req.query.lang = nonExistingPage;
      req.query.amount = 3;
      req.query.page = nonExistingPage;
      NewsRepository.prototype.getNewsPage = jest.fn().mockReturnValue(null);
      helper.sendDataWithoutShell = jest.fn().mockReturnValue(emptyList);
      return newsController.getNewsPage(req, res).then((page: Page<News>) => {
        expect(page.amount).toEqual(0);
      });
    });

    test("returns the first page if the page value is too big", () => {
      req.query.lang = englishLanguageCode;
      req.query.amount = 3;
      req.query.page = nonExistingPage;
      NewsRepository.prototype.getNewsPage = jest.fn().mockReturnValue(newsList);
      helper.sendDataWithoutShell = jest.fn().mockReturnValue(newsList);
      return newsController.getNewsPage(req, res).then((page: Page<News>) => {
        page.data.forEach((news: News) => {
          expect(newsList.data).toContain(news);
        });
        expect(page.amount).toEqual(2);
      });
    });
  });
});
