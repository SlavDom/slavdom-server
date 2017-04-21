import NewsRepository from "../repositories/newsRepository";
import helper from "./controllerHelper";

/**
 * @param {object} req - the request
 * @param {object} res - the response
 * @returns {json}
 * Get a single news by its theme and lang
 */
async function getNews(req, res) {
  try {
    const newsRepository = new NewsRepository();
    const lang = req.query.lang;
    const theme = req.query.theme;
    const result = await newsRepository.getNews(theme, lang);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/**
 * @param {object} req - the request
 * @param {object} res - the response
 * @returns {json}
 * Get the list page of news
 */
async function getNewsPage(req, res) {
  try {
    const newsRepository = new NewsRepository();
    const lang = req.query.lang;
    let page = req.query.page;
    let amount = req.query.amount;
    if (page === undefined) {
      page = 1;
    }
    if (amount === undefined) {
      amount = 5;
    }
    if (lang === undefined) {
      return helper.sendFailureMessage("There is no language parameter in the query", res);
    }
    const result = await newsRepository.getNewsPage(lang, page, amount);
    return helper.sendData(result, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/**
 * @param {object} req - the request
 * @param {object} res - the response
 * @returns {json}
 * Saves the news
 */
async function saveNews(req, res) {
  try {
    const newsRepository = new NewsRepository();
    const lang = req.body.lang;
    const news = {
      theme: req.body.theme,
      title: req.body.title,
      shortText: req.body.shortText,
      fullText: req.body.fullText,
    };
    const result = await newsRepository.saveNews(news, lang);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

export default {
  getNews,
  getNewsPage,
  saveNews,
};
