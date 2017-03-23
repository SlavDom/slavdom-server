import mongoose from 'mongoose';
import BaseModel from './baseModel';
import LanguageEntity from '../entities/languageEntity';

export default class LanguageModel extends BaseModel {

  async create(language) {
    // language.language_id = mongoose.Types.ObjectId();
    const languageObject = new LanguageEntity(language);
    return languageObject.save((err) => {
      if (err) throw err;
      return true;
    });
  }

  async read(code) {
    return LanguageEntity.findOne({
      code,
    }).exec((err, language) => {
      if (err) throw err;
      return language;
    });
  }

  async getId(code) {
    return LanguageEntity.findOne({
      code,
    }).exec((err, language) => {
      if (err) throw err;
      if (language !== null) {
        return language._id;
      } else {
        return null;
      }
    });
  }

  async update(language) {
    return LanguageEntity.update({ _id: language.id }, { $set: language }, () => {});
  }

  del(id) {
    LanguageEntity.remove({
      id,
    });
  }
}
