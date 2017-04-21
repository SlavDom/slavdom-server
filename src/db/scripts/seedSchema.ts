import LanguageModel from "../models/languageModel";
import NewsModel from "../models/newsModel";
import { languageSeeder, newsSeeder } from "../seeders";

async function seedLanguages(languageModel: LanguageModel) {
  const promises = [];
  languageSeeder.forEach(language => {
    promises.push(languageModel.create(language));
  });
  await Promise.all(promises);
}

async function seedData() {
  const languageModel = new LanguageModel();
  const newsModel = new NewsModel();
  await seedLanguages(languageModel);
  const languages = {
    en: await languageModel.getId("en"),
    nsl: await languageModel.getId("nsl"),
    is: await languageModel.getId("is"),
  };
  newsSeeder.forEach(news => {
    news.languageId = languages[news.languageId];
    newsModel.create(news);
  });
}

export default seedData;
