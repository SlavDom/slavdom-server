import BaseModel from './baseModel';
import NewsEntity from '../entities/newsEntity';

export default class NewsModel extends BaseModel {

  async create(news) {
    const newsObject = new NewsEntity(news);
    return newsObject.save((err) => {
      if (err) throw err;
      return true;
    });
  }

  async get(id) {
    return NewsEntity.find({
      id,
    }).exec((err, news) => {
      if (err) throw err;
      return news;
    });
  }

  /* Function for getting a news entity object by its theme and title
  * @param theme
  * @ param title */
  async read(theme, language_id) {
    return NewsEntity.find({
      theme,
      language_id,
    }).exec((err, news) => {
      if (err) throw err;
      return news;
    });
  }

  async readByLang(language_id) {
    return NewsEntity.find({
      language_id,
    }).exec((err, news) => {
      if (err) throw err;
      return news;
    });
  }

  async update(news) {
    return NewsEntity.update({ _id: news.id }, { $set: news }, () => {});
  }

  del(id) {
    NewsEntity.remove({
      id,
    });
  }
}