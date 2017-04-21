import mongoose from "../db";
import languageSchema from "../schemas/languageSchema";
import * as logger from "../../logger";
import {ILanguage} from "../data/language";
import {MongoError} from "mongodb";
import {ObjectID} from "bson";

export default class LanguageModel {

  private languageModel: any;

  constructor() {
    this.languageModel = mongoose.model<ILanguage>("Language", languageSchema);
  }

  public async create(language: ILanguage): Promise<boolean> {
    const languageObject = this.languageModel(language);
    return languageObject.save(err => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`Language ${language.code} has been created`);
      return true;
    });
  }

  public async findByCode(code: string): Promise<ILanguage> {
    return this.languageModel
        .findOne({
          code,
        })
        .exec((err, language) => {
          if (err) {
            throw err;
          }
          return language;
        });
  }

  public async getId(code: string): Promise<ObjectID> {
    return this.languageModel
        .findOne({
          code,
        }, "_id")
        .exec((err: MongoError, id: ObjectID) => {
          if (err) {
            throw err;
          }
          return id;
        });
  }

  public async update(language): Promise<void> {
    return this.languageModel.update(
        {_id: language.id},
        {$set: language},
    );
  }

  public remove(id: ObjectID): void {
    this.languageModel.remove({
      id,
    });
  }
}
