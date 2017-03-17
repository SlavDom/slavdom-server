import LanguageModel from '../db/models/languageModel';

/** Module for translation repository */
export default class TranslationRepository {

  constructor() {
    this.languageModel = new LanguageModel();
  }

    /** Getting a list of translations
     * @returns the list of translations */
  async getTranslations(lang) {
    let langer = await this.languageModel.read(lang);
    if (langer.length === 0) {
      langer = await this.languageModel.read('en');
    }
    return langer[0].translations;
  }

  async getTranslationsFromList(lang, codes) {
    const res = [];
    const langer = await this.languageModel.read(lang);
    let langerEn = null;
    if (lang !== 'en') {
      langerEn = await this.languageModel.read('en');
    }
    for (let i = 0; i < codes.length; i += 1) {
      let flag = false;
      if (langer.length > 0) {
        for (let j = 0; j < langer[0].translations.length; j += 1) {
          if (langer[0].translations[j].code === codes[i]) {
            res.push(langer[0].translations[j].result);
            flag = true;
          }
        }
      }
      if (!flag) {
        for (let j = 0; j < langerEn[0].translations.length; j += 1) {
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
    let langer = await this.languageModel.read(lang);
    let translations = langer[0].translations;
    let flag = false;
    translations.forEach((a) => {
      if (a.code === code) {
        res = a;
        flag = true;
      }
    });
    if (!flag) {
      langer = await this.languageModel.read('en');
      translations = langer[0].translations;
      translations.forEach((a) => {
        if (a.code === code) {
          res = a;
        }
      });
    }
    return res;
  }

    /** Saving a new translation to repository
     * @returns boolean created translation */
  async saveTranslation(translation) {
    const langer = await this.languageModel.read(translation.language);
    const lang = langer[0];
    const translations = langer[0].translations;
    const translationForInsertion = {
      code: translation.code,
      result: translation.result,
    };
    translations.push(translationForInsertion);
    lang.translations = translations;
    await this.languageModel.update(lang);
    return true;
  }
}
