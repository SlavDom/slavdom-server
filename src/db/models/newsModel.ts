import mongoose from "../db";
import newsSchema from "../schemas/newsSchema";
import * as logger from "../../logger";
import {INews} from "../data/news";

export default class NewsModel {

  private newsModel: any;

  constructor() {
    this.newsModel = mongoose.model<INews>("News", newsSchema);
  }

  public async create(news: INews): Promise<boolean> {
    const newsObject = this.newsModel(news);
    return newsObject.save(err => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`News ${news.title} has been created.`);
      return true;
    });
  }

  public async get(id: string): Promise<INews> {
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

  public async findByThemeAndLanguageId(theme: string, languageId: string): Promise<INews> {
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

  public async findByLanguageId(languageId: string): Promise<INews> {
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

  public async update(news): Promise<void> {
    return this.newsModel.update(
        {_id: news.id},
        {$set: news},
    );
  }

  public remove(id) {
    this.newsModel.remove({
      id,
    });
  }

}