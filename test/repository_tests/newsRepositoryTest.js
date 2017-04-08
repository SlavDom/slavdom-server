import { expect } from 'chai';
import sinon from 'sinon';

import LanguageModel from '../../src/db/models/languageModel';
import NewsModel from '../../src/db/models/newsModel';
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

    const stubLanguageModel = sinon.createStubInstance(LanguageModel);
    const stubNewsModel = sinon.createStubInstance(NewsModel);

    it('gets the news by theme and language', () => {
      stubLanguageModel.getId.returns(englishLanguageId);
      stubNewsModel.findByThemeAndLanguageId.returns(testNews);
      newsRepository.getNews(randomNewsTheme, englishLanguageCode).then((data) => {
        expect(data).to.equal(testNews);
      });
    });

    it('returns empty list if there is no such a language', () => {
      stubLanguageModel.getId.returns(null);
      newsRepository.getNews(randomNewsTheme, notExistingLanguageCode).then((data) => {
        expect(data).to.equal({});
      });
    });
  });

  describe('#getNewsPage()', () => {
    const callback = sinon.stub(newsRepository, 'getNewsPage');

    it('gets the news list by language, page and page length', () => {
      const newsList = [{
        fullText: '',
        theme: 'hello-world',
      },
      {
        fulltext: '',
        theme: 'hello-england',
      }];
      callback.withArgs('en', 1, 3).returns(newsList);
      expect(callback('en', 1, 3)).to.equal(newsList)
    });

    it('returns empty list if there is no such a language', () => {
      const emptyList = [];
      callback.withArgs('asdasd', 1, 3).returns(emptyList);
      expect(callback('asdasd', 1, 3)).to.be.empty;
    });

    it('returns the first page if the page value is too big', () => {
      const firstPage = [{
        fullText: '',
        theme: 'hello-world',
      },
      {
        fulltext: '',
        theme: 'hello-england',
      }];
      callback.withArgs('en', 12, 3).returns(firstPage);
      expect(callback('en', 12, 3)).to.equal(firstPage);
    });
  });
});
