import mongoose from "../db";
import newsSchema from "../schemas/newsSchema";
import * as logger from "../../logger";
import {INews} from "../data/news";

export default class NewsModel {

  newsModel: any;

  constructor() {
    this.newsModel = mongoose.model<INews>("News", newsSchema);
  }

  async create(news) {
    const newsObject = this.newsModel(news);
    return newsObject.save(err => {
      if (err) {
        throw err;
      }
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
          if (err) {
            throw err;
          }
          return news;
        });
  }

  async findByThemeAndLanguageId(theme, languageId) {
    return this.newsModel
        .findOne({
          theme,
          languageId,
        })
        .exec((err, news) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  async findByLanguageId(languageId) {
    return this.newsModel
        .find({
          languageId,
        })
        .exec((err, news) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  async update(news) {
    return this.newsModel.update(
        {_id: news.id},
        {$set: news},
    );
  }

  remove(id) {
    this.newsModel.remove({
      id,
    });
  }

}