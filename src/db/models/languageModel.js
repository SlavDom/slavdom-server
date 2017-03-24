import LanguageEntity from '../entities/languageEntity';

export default class LanguageModel {

  async create(language) {
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
    return LanguageEntity
      .findOne({
        code,
      }, '_id')
      .exec((err, id) => {
        if (err) throw err;
        return id;
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
