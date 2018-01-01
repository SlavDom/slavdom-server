import "jest";
import NewsRepository from "../../src/repositories/newsRepository";
import NewsModel from "../../src/db/models/newsModel";
import LanguageModel from "../../src/db/models/languageModel";
import {News} from "../../src/types/News";
import {ObjectID} from "bson";
import {Page} from "../../src/types/Page";

describe("NewsRepository", () => {
  const newsRepository = new NewsRepository();
  const englishLanguageCode: string = "englishLanguageCode";
  const englishLanguageId: ObjectID = new ObjectID("XXXXXXXXXXXX");
  const notExistingLanguageCode: string = "notExistingLanguageCode";

  describe("#getNews()", () => {
    const randomNewsTheme: string =  "randomNewsTheme";
    const testNews: object = {
      theme: randomNewsTheme,
      languageId: englishLanguageId,
    };

    test("gets the news by theme and language", () => {
      LanguageModel.prototype.getId = jest.fn().mockReturnValue(englishLanguageId);
      NewsModel.prototype.findByThemeAndLanguageId = jest.fn().mockReturnValue(testNews);
      return newsRepository.getNews(randomNewsTheme, englishLanguageCode).then((news: News) => {
        expect(news).toEqual(testNews);
      });
    });

    test("returns empty object if there is no such a language", () => {
      LanguageModel.prototype.getId = jest.fn().mockReturnValue(null);
      return newsRepository.getNews(randomNewsTheme, notExistingLanguageCode).then((news: News) => {
        expect(news).toEqual(undefined);
      });
    });
  });

  describe("#getNewsPage()", () => {
    const existingPage: number = 1;
    const nonExistingPage: number = 3;
    const newsList: object = [
      {
        fullText: "",
        theme: "hello-world",
      },
      {
        fulltext: "",
        theme: "hello-england",
      },
    ];

    test("gets the news list by language, page and page length", () => {
      LanguageModel.prototype.getId = jest.fn().mockReturnValue(englishLanguageId);
      NewsModel.prototype.findByLanguageId = jest.fn().mockReturnValue(newsList);
      return newsRepository.getNewsPage(englishLanguageCode, existingPage, 3).then((page: Page<News>) => {
        page.data.forEach((news: News) => {
          expect(newsList).toContain(news);
        });
        expect(page.amount).toEqual(2);
      });
    });

    test("returns empty list if there is no such a language", () => {
      LanguageModel.prototype.getId = jest.fn().mockReturnValue(null);
      return newsRepository.getNewsPage(notExistingLanguageCode, existingPage, 3).then((page: Page<News>) => {
        expect(page.amount).toEqual(0);
      });
    });

    test("returns the first page if the page value is too big", () => {
      LanguageModel.prototype.getId = jest.fn().mockReturnValue(englishLanguageId);
      NewsModel.prototype.findByLanguageId = jest.fn().mockReturnValue(newsList);
      return newsRepository.getNewsPage(englishLanguageCode, nonExistingPage, 3).then((page: Page<News>) => {
        page.data.forEach((news: News) => {
          expect(newsList).toContain(news);
        });
        expect(page.amount).toEqual(2);
      });
    });
  });
});
