import NewsRepository from '../repositories/newsRepository';
import helper from './controllerHelper';

/*
@param res
@param req
Get a single news by its theme and lang
 */
async function getNews(req, res) {
  try {
    const lang = req.query.lang;
    const theme = req.query.theme;
    const newsRepository = new NewsRepository();
    const result = await newsRepository.getNews(theme, lang);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/*
@param req
@param res
Get the list page of news
 */
async function getNewsPage(req, res) {
  try {
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
      return helper.sendFailureMessage('There is no language parameter in the query', res);
    }
    const newsRepository = new NewsRepository();
    const result = await newsRepository.getNewsPage(lang, page, amount);
    return helper.sendData(result, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveNews(req, res) {
  try {
    const lang = req.body.lang;
    const news = {
      theme: req.body.theme,
      title: req.body.title,
      short_text: req.body.short_text,
      full_text: req.body.full_text,
    };
    const newsRepository = new NewsRepository();
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
