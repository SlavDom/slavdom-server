import mongoose from '../db';
import newsSchema from '../schemas/newsSchema';
import * as logger from '../../log';

async function create(news) {
  const newsModel = mongoose.model('News', newsSchema);
  const newsObject = newsModel(news);
  return newsObject.save((err) => {
    if (err) throw err;
    logger.logDatabase(`News ${news.title} has been created.`);
    return true;
  });
}

async function get(id) {
  const newsModel = mongoose.model('News', newsSchema);
  return newsModel
    .findOne({
      id,
    })
    .exec((err, news) => {
      if (err) throw err;
      return news;
    });
}

async function findByThemeAndLanguageId(theme, languageId) {
  const newsModel = mongoose.model('News', newsSchema);
  return newsModel
    .findOne({
      theme,
      languageId,
    })
    .exec((err, news) => {
      if (err) throw err;
      return news;
    });
}

async function findByLanguageId(languageId) {
  const newsModel = mongoose.model('News', newsSchema);
  return newsModel
    .find({
      languageId,
    })
    .exec((err, news) => {
      if (err) throw err;
      return news;
    });
}

async function update(news) {
  const newsModel = mongoose.model('News', newsSchema);
  return newsModel.update(
    { _id: news.id },
    { $set: news },
    () => {},
  );
}

function remove(id) {
  const newsModel = mongoose.model('News', newsSchema);
  newsModel.remove({
    id,
  });
}

export {
  get,
  remove,
  update,
  findByLanguageId,
  findByThemeAndLanguageId,
  create,
};
