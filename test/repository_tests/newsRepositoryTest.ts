import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import LanguageModel from "../../src/db/models/languageModel";
import NewsModel from "../../src/db/models/newsModel";
import NewsRepository from "../../src/repositories/newsRepository";
import {Page} from "../../types/Page";
import {News} from "../../src/db/types/News";

describe("newsRepository", () => {
  const newsRepository: NewsRepository = new NewsRepository();
  const languageModel: LanguageModel = new LanguageModel();
  const newsModel: NewsModel = new NewsModel();

  describe("#getNews()", () => {
    const englishLanguageCode: string = "englishLanguageCode";
    const englishLanguageId: string = "englishLanguageId";
    const randomNewsTheme: string =  "randomNewsTheme";
    const notExistingLanguageCode: string = "notExistingLanguageCode";
    const testNews: object = {
      theme: "randomNewsTheme",
      languageId: "englishLanguageId",
    };

    it("gets the news by theme and language", () => {
      languageModel.getId = sinon.stub().returns(englishLanguageId);
      newsModel.findByThemeAndLanguageId = sinon.stub().returns(testNews);
      newsRepository.getNews(randomNewsTheme, englishLanguageCode).then((data: News) => {
        expect(data).to.equal(testNews);
      });
    });

    it("returns empty object if there is no such a language", () => {
      languageModel.getId = sinon.stub().returns(null);
      newsRepository.getNews(randomNewsTheme, notExistingLanguageCode).then((data: News) => {
        expect(data).to.be.empty;
      });
    });
  });

  describe("#getNewsPage()", () => {
    const englishLanguageCode: string = "englishLanguageCode";
    const englishLanguageId: string = "englishLanguageId";
    const notExistingLanguageCode: string = "notExistingLanguageCode";
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

    it("gets the news list by language, page and page length", () => {
      languageModel.getId = sinon.stub().returns(englishLanguageId);
      newsModel.findByLanguageId = sinon.stub().returns(newsList);
      newsRepository.getNewsPage(englishLanguageCode, existingPage, 3).then((data: Page<News>) => {
        data.data.forEach((t) => {
          expect(newsList).to.include(t);
        });
        expect(data.amount).to.equal(2);
      });
    });

    it("returns empty list if there is no such a language", () => {
      languageModel.getId = sinon.stub().returns(null);
      newsRepository.getNewsPage(notExistingLanguageCode, existingPage, 3).then((data: Page<News>) => {
        expect(data.amount).to.equal(0);
      });
    });

    it("returns the first page if the page value is too big", () => {
      languageModel.getId = sinon.stub().returns(englishLanguageId);
      newsModel.findByLanguageId = sinon.stub().returns(newsList);
      newsRepository.getNewsPage(englishLanguageCode, nonExistingPage, 3).then((data: Page<News>) => {
        data.data.forEach((t) => {
          expect(newsList).to.include(t);
        });
        expect(data.amount).to.equal(2);
      });
    });
  });
});
