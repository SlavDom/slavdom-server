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
  const english = await languageModel.getId('en');
  newsSeeder.forEach((news) => {
    const newsModel = new NewsModel();
    news.language_id = english;
    newsModel.create(news);
  });
}

export default seedData;
