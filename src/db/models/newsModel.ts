import mongoose from "../db";
import newsSchema from "../schemas/newsSchema";
import * as logger from "../../logger";
import {INews} from "../data/news";
import {ObjectID} from "bson";
import {MongoError} from "mongodb";
import {Model} from "mongoose";

export default class NewsModel {

  private newsModel: Model<INews>;

  constructor() {
    this.newsModel = mongoose.model<INews>("News", newsSchema);
  }

  public async create(news: INews): Promise<INews> {
    const newsObject = new this.newsModel(news);
    return newsObject.save((err: MongoError): boolean => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`News ${news.title} has been created.`);
      return true;
    });
  }

  public async get(id: ObjectID): Promise<INews> {
    return this.newsModel
        .findOne({
          id,
        })
        .exec((err: MongoError, news: INews) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  public async findByThemeAndLanguageId(theme: string, languageId: ObjectID): Promise<INews> {
    return this.newsModel
        .findOne({
          theme,
          languageId,
        })
        .exec((err: MongoError, news: INews) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  public async findByLanguageId(languageId: ObjectID): Promise<INews[]> {
    return this.newsModel
        .find({
          languageId,
        })
        .exec((err: MongoError, news: INews) => {
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

  public remove(id: ObjectID) {
    this.newsModel.remove({
      id,
    });
  }

}