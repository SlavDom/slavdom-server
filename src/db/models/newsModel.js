import mongoose from '../db';
import newsSchema from '../schemas/newsSchema';
import * as logger from '../../log';

export default class NewsModel {

  constructor() {
    this.newsModel = mongoose.model('News', newsSchema);
  }

  async create(news) {
    const newsObject = this.newsModel(news);
    return newsObject.save((err) => {
      if (err) throw err;
      logger.logDatabase(`News ${news.title} has been created.`);
      return true;
    });
  }

  async get(id) {
    return this.newsModel
      .findOne({
        id,
      })
      .exec((err, news) => {
        if (err) throw err;
        return news;
      });
  }

  async read(theme, languageId) {
    return this.newsModel
      .findOne({
        theme,
        languageId,
      })
      .exec((err, news) => {
        if (err) throw err;
        return news;
      });
  }

  async readByLang(languageId) {
    return this.newsModel
      .find({
        languageId,
      })
      .exec((err, news) => {
        if (err) throw err;
        return news;
      });
  }

  async update(news) {
    return this.newsModel.update(
      { _id: news.id },
      { $set: news },
      () => {},
    );
  }

  remove(id) {
    this.newsModel.remove({
      id,
    });
  }
}
