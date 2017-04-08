import mongoose from '../db';
import languageSchema from '../schemas/languageSchema';
import * as logger from '../../log';

export default class LanguageModel {

  constructor() {
    this.languageModel = mongoose.model('Language', languageSchema);
  }

  async create(language) {
    const languageObject = this.languageModel(language);
    return languageObject.save((err) => {
      if (err) throw err;
      logger.logDatabase(`Language ${language.code} has been created`);
      return true;
    });
  }

  async findByCode(code) {
    return this.languageModel
      .findOne({
        code,
      })
      .exec((err, language) => {
        if (err) throw err;
        return language;
      });
  }

  async getId(code) {
    return this.languageModel
      .findOne({
        code,
      }, '_id')
      .exec((err, id) => {
        if (err) throw err;
        return id;
      });
  }

  async update(language) {
    return this.languageModel.update(
      { _id: language.id },
      { $set: language },
      () => {},
    );
  }

  remove(id) {
    this.languageModel.remove({
      id,
    });
  }
}
