import { Translation } from '../../typings/app/models';
import LanguageModel from '../db/models/languageModel';

/** Module for translation repository */
export default class TranslationRepository {

  constructor() {
    this.languageModel = new LanguageModel();
  }

    /** Getting a list of translations
     * @returns the list of translations */
  async getTranslations(lang) {
    const langer = await this.languageModel.read(lang);
    return langer[0].translations;
  }

  async getTranslationsFromList(lang, codes) {
    const res = [];
    const langer = await this.languageModel.read(lang);
    let langerEn = null;
    if (lang !== 'en') {
      langerEn = await this.languageModel.read('en');
    }
    for (let i = 0; i < codes.length; i++) {
      let flag = false;
      if (langer.length > 0) {
        for (let j = 0; j < langer[0].translations.length; j++) {
          if (langer[0].translations[j].code === codes[i]) {
            res.push(langer[0].translations[j].result);
            flag = true;
          }
        }
      }
      if (!flag) {
        for (let j = 0; j < langerEn[0].translations.length; j++) {
          if (langerEn[0].translations[j].code === codes[i]) {
            res.push(langerEn[0].translations[j].result);
            flag = true;
          }
        }
      }
    }
    return res;
  }

    // /** Getting a translation by its id
    //  * @returns one translation */
    // getById(id: number): Translation {
    //     return translationModel.findById(id);
    // }

    /** Getting translations with common code
     * @returns the list of translations */
  async getByLangAndCode(lang, code) {
    let res = null;
    const langer = await this.languageModel.read(lang);
    const translations = langer[0].translations;
    translations.forEach((a) => {
      if (a.code === code) {
        res = a;
      }
    });
    return res;
  }

    /** Saving a new translation to repository
     * @returns boolean created translation */
  async saveTranslation(translation) {
    const langer = await this.languageModel.read(translation.language);
    console.log(langer[0]);
    const lang = langer[0];
    const translations = langer[0].translations;
    const translationForInsertion = {
      code: translation.code,
      result: translation.result,
    };
    translations.push(translationForInsertion);
    lang.translations = translations;
    console.log(lang);
    await this.languageModel.update(lang);
    return true;
  }
}
