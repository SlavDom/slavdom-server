import NewsRepository from '../repositories/newsRepository';
import helper from './controllerHelper';

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

async function getNewsList(req, res) {
 try {
   const lang = req.query.lang;
   const newsRepository = new NewsRepository();
   const result = await newsRepository.getNewsList(lang);
   return helper.sendData({ data: result }, res);
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
  getNewsList,
  saveNews,
};
