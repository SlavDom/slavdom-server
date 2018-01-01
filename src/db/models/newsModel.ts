import mongoose from "../db";
import newsSchema from "../schemas/newsSchema";
import * as logger from "../../logger";
import {ObjectID} from "bson";
import {MongoError} from "mongodb";
import {Model} from "mongoose";
import {News} from "../../types/News";

export default class NewsModel {

  private newsModel: Model<News>;

  constructor() {
    this.newsModel = mongoose.model<News>("News", newsSchema);
  }

  public async create(news: News): Promise<News> {
    const newsObject = new this.newsModel(news);
    return newsObject.save((err: MongoError): boolean => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`News ${news.title} has been created.`);
      return true;
    });
  }

  public async get(id: ObjectID): Promise<News | null> {
    return this.newsModel
        .findOne({
          id,
        })
        .exec((err: MongoError, news: News) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  public async findByThemeAndLanguageId(theme: string, languageId: ObjectID): Promise<News | null> {
    return this.newsModel
        .findOne({
          theme,
          languageId,
        })
        .exec((err: MongoError, news: News) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  public async findByLanguageId(languageId: ObjectID): Promise<News[]> {
    return this.newsModel
        .find({
          languageId,
        })
        .exec((err: MongoError, news: News) => {
          if (err) {
            throw err;
          }
          return news;
        });
  }

  public async update(news: News): Promise<void> {
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
