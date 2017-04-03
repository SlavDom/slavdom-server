/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import NewsRepository from '../../src/repositories/newsRepository';

describe('newsRepository', () => {
  const newsRepository = new NewsRepository();

  describe('#getNews()', () => {
    const callback = sinon.stub(newsRepository, 'getNews');

    it('gets the news by theme and language', () => {
      const news = {
        fullText: '',
        theme: 'hello-world',
      };
      callback.withArgs('hello-world', 'en').returns(news);
      expect(callback('hello-world', 'en')).to.equal(news);
    });

    it('returns empty list if there is no such a language', () => {
      callback.withArgs('hello-world', 'asdasd').returns([]);
      expect(callback('hello-world', 'asdasd')).to.be.empty;
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
