import mongoose from "../db";
import languageSchema from "../schemas/languageSchema";
import * as logger from "../../logger";
import {MongoError} from "mongodb";
import {ObjectID} from "bson";
import {Language} from "../../types/Language";

export default class LanguageModel {

  private languageModel: any;

  constructor() {
    this.languageModel = mongoose.model<Language>("Language", languageSchema);
  }

  public async create(language: Language): Promise<boolean> {
    const languageObject = this.languageModel(language);
    return languageObject.save((err: MongoError) => {
      if (err) {
        throw err;
      }
      logger.logDatabase(`Language ${language.code} has been created`);
      return true;
    });
  }

  public async findByCode(code: string): Promise<Language> {
    return this.languageModel
        .findOne({
          code,
        })
        .exec((err: MongoError, language: Language) => {
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

  public async update(language: Language): Promise<void> {
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
