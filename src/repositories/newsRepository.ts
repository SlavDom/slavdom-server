import NewsModel from "../db/models/newsModel";
import LanguageModel from "../db/models/languageModel";
import { newsComparator } from "../utils/comparators";
import {News} from "../types/News";
import {ObjectID} from "bson";
import {Page} from "../types/Page";

export default class NewsRepository {

  private newsModel: NewsModel;
  private languageModel: LanguageModel;

  constructor() {
    this.newsModel = new NewsModel();
    this.languageModel = new LanguageModel();
  }

  /**
   * @param {string} theme requested theme of the news
   * @param {string} languageCode requested language code
   * @returns {object} the news found by language and code
   */
  public async getNews(theme: string, languageCode: string): Promise<News|undefined> {
    // We get a language id from the database
    const langId: ObjectID = await this.languageModel.getId(languageCode);
    let news: News|undefined;
    // If there exists such a language. we get its id
    if (langId !== null) {
      // We get the amount of news that are of the requested theme and language
      news = await this.newsModel.findByThemeAndLanguageId(theme, langId);
    }
    // If there is no such a language
    return news;
  }

  /**
   * @param {string} language requested language code
   * @param {number} page requested page
   * @param {number} amount requested page length
   * @returns {array} the news list
   */
  public async getNewsPage(language: string, page: number, amount: number): Promise<Page<News>> {
    // We get a language id from the database
    const langId: ObjectID = await this.languageModel.getId(language);
    // If there exists such a language. we get its id
    if (langId !== null) {
      // We get the amount of news that are of the requested language
      const newsList: News[] = await this.newsModel.findByLanguageId(langId);
      newsList.sort(newsComparator);
      // We get the amount of all news in the store
      const amountAll: number = newsList.length;
      // Try to get the requested page;
      const newsListToSlice: News[] = newsList.slice((page - 1) * amount);
      // If we get something on the requested page
      if (newsListToSlice.length > 0) {
        // Shorten the result array
        newsListToSlice.length = amount;
        const result: News[] = [];
        newsListToSlice.forEach((news: News) => {
          if (news !== null) {
            result.push(news);
          }
        });
        return {
          data: result,
          amount: amountAll,
        };
      }
      // If we do not have enough data return the first page
      // Shorten the result array
      newsList.length = amount;
      const result: News[] = [];
      newsList.forEach((news: News) => {
        if (news !== null) {
          result.push(news);
        }
      });
      return {
        data: result,
        amount: amountAll,
      };
    }
    // If there is no such a language
    return {
      data: [],
      amount: 0,
    };
  }

  /**
   * @param {object} news the news to save
   * @param {string} languageCode language the news is related to
   */
  public async saveNews(news: News, languageCode: string): Promise<News|undefined> {
    // We get a language entity from the database
    const languageId: ObjectID = await this.languageModel.getId(languageCode);
    // If there exists such a language. we get its id
    let result: News|undefined;
    if (languageId !== null) {
      // We add to news model a language attribute with its ID
      news.languageId = languageId;
      // We created the model into the database
      result = await this.newsModel.create(news);
    }
    return result;
  }
}

