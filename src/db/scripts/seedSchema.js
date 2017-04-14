import * as languageModel from '../models/languageModel';
import * as newsModel from '../models/newsModel';
import { languageSeeder, newsSeeder } from '../seeders';

async function seedLanguages() {
  const promises = [];
  languageSeeder.forEach((language) => {
    promises.push(languageModel.create(language));
  });
  await Promise.all(promises);
}

async function seedData() {
  await seedLanguages();
  const languages = {
    en: await languageModel.getId('en'),
    nsl: await languageModel.getId('nsl'),
    is: await languageModel.getId('is'),
  };
  newsSeeder.forEach((news) => {
    const languageId = languages[news.languageId];
    news.languageId = languageId;
    newsModel.create(news);
  });
}

export default seedData;
