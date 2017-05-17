import NewsRepository from "../repositories/newsRepository";
import helper from "./controllerHelper";
import {Request, Response} from "express";
import {News} from "../types/News";
import {Page} from "../types/Page";

export default class NewsController {

  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  /**
   * @param {object} req - the request
   * @param {object} res - the response
   * @returns {json}
   * Get a single news by its theme and lang
   */
  public async getNews(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.query.lang;
      const theme = req.query.theme;
      const result = await this.newsRepository.getNews(theme, lang);
      helper.sendData(res, result);
    } catch (err) {
      helper.sendFailureMessage(err, res);
    }
  }

  /**
   * @param {object} req - the request
   * @param {object} res - the response
   * @returns {json}
   * Get the list page of news
   */
  public async getNewsPage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.query.lang;
      let page = req.query.page;
      let amount = req.query.amount;
      if (page === undefined) {
        page = 1;
      }
      if (amount === undefined) {
        amount = 5;
      }
      if (lang === undefined) {
        helper.sendFailureMessage(new Error("There is no language parameter in the query"), res);
      }
      const result: Page<News> = await this.newsRepository.getNewsPage(lang, page, amount);
      helper.sendDataWithoutShell(res, result);
    } catch (err) {
      helper.sendFailureMessage(err, res);
    }
  }

  /**
   * @param {object} req - the request
   * @param {object} res - the response
   * @returns {json}
   * Saves the news
   */
  public async saveNews(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.body.lang;
      const news = {
        theme: req.body.theme,
        title: req.body.title,
        shortText: req.body.shortText,
        fullText: req.body.fullText,
      } as News;
      const result = await this.newsRepository.saveNews(news, lang);
      helper.sendData(res, result);
    } catch (err) {
      helper.sendFailureMessage(err, res);
    }
  }
}
