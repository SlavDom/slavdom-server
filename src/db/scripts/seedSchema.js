import LanguageModel from '../models/languageModel';
import NewsModel from '../models/newsModel';

const languageSeed = require('../seeders/language.json');
const newsSeed = require('../seeders/news.json');

async function seedLanguages() {
  const languageModel = new LanguageModel();
  for (let i = 0; i < languageSeed.length; i += 1) {
    await languageModel.create(languageSeed[i]);
  }
}

async function seedData() {
  await seedLanguages();
  const languageModel = new LanguageModel();
  const english = await languageModel.read('en');
  newsSeed.forEach((a) => {
    const news = new NewsModel();
    a.language_id = english[0]._id;
    news.create(a);
  });
  console.log('Database is seeded with initial data.');
}

seedData().then();
