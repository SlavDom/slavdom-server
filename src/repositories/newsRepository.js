import * as newsModel from '../db/models/newsModel';
import * as languageModel from '../db/models/languageModel';
import { newsComparator } from '../utils/comparators';

/**
 * @param {string} theme requested theme of the news
 * @param {string} language requested language code
 * @returns {object} the news found by language and code
 */
async function getNews(theme, language) {
  // We get a language id from the database
  const langId = await languageModel.getId(language);
  // If there exists such a language. we get its id
  if (langId !== null) {
    // We get the amount of news that are of the requested theme and language
    const news = await newsModel.findByThemeAndLanguageId(theme, langId);
    return news;
  }
  // If there is no such a language
  return {};
}

/**
 * @param {string} language requested language code
 * @param {number} page requested page
 * @param {number} amount requested page length
 * @returns {array} the news list
 */
async function getNewsPage(language, page, amount) {
  // We get a language id from the database
  const langId = await languageModel.getId(language);
  // If there exists such a language. we get its id
  if (langId !== null) {
    // We get the amount of news that are of the requested language
    const newsList = await newsModel.findByLanguageId(langId);
    newsList.sort(newsComparator);
    // We get the amount of all news in the store
    const amountAll = newsList.length;
    // Try to get the requested page;
    const newsListToSlice = newsList.slice((page - 1) * amount);
    // If we get something on the requested page
    if (newsListToSlice.length > 0) {
      // Shorten the result array
      newsListToSlice.length = amount;
      const result = [];
      newsListToSlice.forEach((a) => {
        if (a !== null) {
          result.push(a);
        }
      });
      return {
        data: result,
        amount: amountAll,
      };
    }
    // If we do not have enough data return the first page
    // Shorten the result array
    newsList.length = amount;
    const result = [];
    newsList.forEach((a) => {
      if (a !== null) {
        result.push(a);
      }
    });
    return {
      data: result,
      amount: amountAll,
    };
  }
  // If there is no such a language
  return {
    data: [],
    amount: 0,
  };
}

/**
 * @param {object} news the news to save
 * @param {string} language language the news is related to
 */
async function saveNews(news, language) {
  // We get a language entity from the database
  const langId = await languageModel.getId(language);
  // If there exists such a language. we get its id
  if (langId !== null) {
    // We add to news model a language attribute with its ID
    news.languageId = langId;
    // We created the model into the database
    await newsModel.create(news);
  }
}

export {
  saveNews,
  getNews,
  getNewsPage,
};

