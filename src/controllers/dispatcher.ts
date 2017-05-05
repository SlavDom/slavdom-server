import helper from "./controllerHelper";
import {Request, Response} from "express";
import NewsRepository from "../repositories/newsRepository";
import TranslationRepository from "../repositories/translationRepository";
import {AssociativeArray} from "../types/AssociativeArray";
import {News} from "../types/News";

export default class Dispatcher {

  private newsRepository: NewsRepository;
  private translationRepository: TranslationRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
    this.translationRepository = new TranslationRepository();
  }

  public async translationPageAndNews(req: Request, res: Response): Promise<void> {
    try {
      const theme: string = req.query.theme;
      const lang: string = req.query.lang;
      const prefix: string = req.query.prefix;
      const news: News|undefined = await this.newsRepository.getNews(theme, lang);
      const translations: AssociativeArray<string> = await this.translationRepository
        .getTranslationsByPrefix(lang, prefix);
      helper.sendDataWithoutShell(res, {news, translations});
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }
}
