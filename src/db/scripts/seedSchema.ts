import * as _ from "lodash";
import LanguageModel from "../models/languageModel";
import NewsModel from "../models/newsModel";
import { languageSeeder, newsSeeder } from "../seeders";
import {Language} from "../../types/Language";
import {News} from "../../types/News";
import {ObjectID} from "bson";

async function seedLanguages(languageModel: LanguageModel) {
  const promises: Array<Promise<boolean>> = [];
  languageSeeder.forEach((language: Language) => {
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
  _.forEach(newsSeeder, (news: News) => {
    news.languageId = _.get<ObjectID>(languages, news.languageId);
    newsModel.create(news);
  });
}

export default seedData;
