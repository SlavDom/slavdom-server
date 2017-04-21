import { expect } from 'chai';
import sinon from 'sinon';

import * as languageModel from '../../src/db/models/languageModel';
import * as newsModel from '../../src/db/models/newsModel';
import NewsRepository from '../../src/repositories/newsRepository';

describe('NewsRepository', () => {
  const newsRepository = new NewsRepository();

  describe('#getNews()', () => {
    const englishLanguageCode = 'englishLanguageCode';
    const englishLanguageId = 'englishLanguageId';
    const randomNewsTheme = 'randomNewsTheme';
    const notExistingLanguageCode = 'notExistingLanguageCode';

    const testNews = {
      theme: 'randomNewsTheme',
      languageId: 'englishLanguageId',
    };

    it('gets the news by theme and language', () => {
      languageModel.getId = sinon.stub().returns(englishLanguageId);
      newsModel.findByThemeAndLanguageId = sinon.stub().returns(testNews);
      newsRepository.getNews(randomNewsTheme, englishLanguageCode).then((data) => {
        expect(data).to.equal(testNews);
      });
    });

    it('returns empty object if there is no such a language', () => {
      languageModel.getId = sinon.stub().returns(null);
      newsRepository.getNews(randomNewsTheme, notExistingLanguageCode).then((data) => {
        expect(data).to.be.empty;
      });
    });
  });

  describe('#getNewsPage()', () => {
    const englishLanguageCode = 'englishLanguageCode';
    const englishLanguageId = 'englishLanguageId';
    const notExistingLanguageCode = 'notExistingLanguageCode';
    const existingPage = 1;
    const nonExistingPage = 3;

    const newsList = [
      {
        fullText: '',
        theme: 'hello-world',
      },
      {
        fulltext: '',
        theme: 'hello-england',
      },
    ];

    it('gets the news list by language, page and page length', () => {
      languageModel.getId = sinon.stub().returns(englishLanguageId);
      newsModel.findByLanguageId = sinon.stub().returns(newsList);
      newsRepository.getNewsPage(englishLanguageCode, existingPage, 3).then((data) => {
        data.data.forEach((t) => {
          expect(newsList).to.include(t);
        });
        expect(data.amount).to.equal(2);
      });
    });

    it('returns empty list if there is no such a language', () => {
      languageModel.getId = sinon.stub().returns(null);
      newsRepository.getNewsPage(notExistingLanguageCode, existingPage, 3).then((data) => {
        expect(data.amount).to.equal(0);
      });
    });

    it('returns the first page if the page value is too big', () => {
      languageModel.getId = sinon.stub().returns(englishLanguageId);
      newsModel.findByLanguageId = sinon.stub().returns(newsList);
      newsRepository.getNewsPage(englishLanguageCode, nonExistingPage, 3).then((data) => {
        data.data.forEach((t) => {
          expect(newsList).to.include(t);
        });
        expect(data.amount).to.equal(2);
      });
    });
  });
});
