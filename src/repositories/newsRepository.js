import NewsModel from '../db/models/newsModel';
import LanguageModel from '../db/models/languageModel';

export default class newsRepository {

  constructor() {
    this.newsModel = new NewsModel();
    this.languageModel = new LanguageModel();
  }

  async getNews(theme, language) {
    // We get a language id from the database
    const langId = await this.languageModel.getId(language);
    // If there exists such a language. we get its id
    if (langId !== null) {
      // We get the amount of news that are of the requested theme and language
      const news = await this.newsModel.read(theme, langId);
      return news;
    }
    // If there is no such a language
    return [];
  }

  async getNewsList(language) {
    // We get a language id from the database
    const langId = await this.languageModel.getId(language);
    // If there exists such a language. we get its id
    if (langId !== null) {
      // We get the amount of news that are of the requested language
      const newsList = await this.newsModel.readByLang(langId);
      return newsList;
    }
    // If there is no such a language
    return [];
  }

  async saveNews(news, language) {
    // We get a language entity from the database
    const langId = await this.languageModel.getId(language);
    // If there exists such a language. we get its id
    if (langId !== null) {
      // We add to news model a language attribute with its ID
      news.languageId = langId;
      // We created the model into the database
      await this.newsModel.create(news);
    }
  }
}
