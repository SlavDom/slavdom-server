import mongoose from '../db';
import languageSchema from '../schemas/languageSchema';
import * as logger from '../../logger';

async function create(language) {
  const languageModel = mongoose.model('Language', languageSchema);
  const languageObject = languageModel(language);
  return languageObject.save((err) => {
    if (err) throw err;
    logger.logDatabase(`Language ${language.code} has been created`);
    return true;
  });
}

async function findByCode(code) {
  const languageModel = mongoose.model('Language', languageSchema);
  return languageModel
    .findOne({
      code,
    })
    .exec((err, language) => {
      if (err) throw err;
      return language;
    });
}

async function getId(code) {
  const languageModel = mongoose.model('Language', languageSchema);
  return languageModel
    .findOne({
      code,
    }, '_id')
    .exec((err, id) => {
      if (err) throw err;
      return id;
    });
}

async function update(language) {
  const languageModel = mongoose.model('Language', languageSchema);
  return languageModel.update(
    { _id: language.id },
    { $set: language },
    () => {},
  );
}

function remove(id) {
  const languageModel = mongoose.model('Language', languageSchema);
  languageModel.remove({
    id,
  });
}

export {
  create,
  findByCode,
  getId,
  update,
  remove
}
