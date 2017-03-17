import BaseModel from './baseModel';
import LanguageEntity from '../entities/languageEntity';

export default class LanguageModel extends BaseModel {

  create(language) {
    const languageObject = new LanguageEntity(language);
    languageObject.save((err) => {
      if (err) throw err;
    });
  }

  async read(code) {
    return LanguageEntity.find({
      code,
    }).exec((err, language) => {
      if (err) throw err;
      return language;
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
