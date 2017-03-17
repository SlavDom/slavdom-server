import NewsModel from '../db/models/newsModel';
import LanguageModel from '../db/models/languageModel';

export default class newsRepository {

  constructor() {
    this.newsModel = new NewsModel();
    this.languageModel = new LanguageModel();
  }

  async getNews(theme, language) {
    const langEntity = await this.languageModel.read(language);
    const langId = langEntity[0]._id;
    const news = await this.newsModel.read(theme, langId);
    return news;
  }

  async getNewsList(language) {
    const langEntity = await this.languageModel.read(language);
    const langId = langEntity[0]._id;
    const newsList = await this.newsModel.readByLang(langId);
    return newsList;
  }

  async saveNews(news, language) {
    const langEntity = await this.languageModel.read(language);
    const langId = langEntity[0]._id;
    news.language_id = langId;
    await this.newsModel.create(news);
  }
}
