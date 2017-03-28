import LanguageModel from '../models/languageModel';
import NewsModel from '../models/newsModel';
import { languageSeeder, newsSeeder } from '../seeders';

async function seedLanguages() {
  const languageModel = new LanguageModel();
  const promises = [];
  languageSeeder.forEach((language) => {
    promises.push(languageModel.create(language));
  });
  await Promise.all(promises);
}

async function seedData() {
  await seedLanguages();
  const languageModel = new LanguageModel();
  const languages = {
    en: await languageModel.getId('en'),
    nsl: await languageModel.getId('nsl'),
    is: await languageModel.getId('is'),
  };
  newsSeeder.forEach((news) => {
    const languageId = languages[news.languageId];
    const newsModel = new NewsModel();
    news.languageId = languageId;
    newsModel.create(news);
  });
}

export default seedData;
