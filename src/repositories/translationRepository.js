import LanguageModel from '../db/models/languageModel';

/** Module for translation repository */
export default class TranslationRepository {

  constructor() {
    this.languageModel = new LanguageModel();
  }

    /** Getting a list of translations
     * @returns the list of translations */
  async getTranslations(lang) {
    // We read the requested language entity
    let language = await this.languageModel.read(lang);
    // If there is no such a language in the database
    if (language.length === 0) {
      // Then we read the default language entity
      language = await this.languageModel.read('en');
    }
    // We return only the array of translations into this language
    return language[0].translations;
  }

  async getTranslationsFromList(lang, codes) {
    // We create a result array
    const res = [];
    // We read language entity by its code name
    const language = await this.languageModel.read(lang);
    let languageEn = null;
    if (lang !== 'en') {
      // If the requested language is not English, we should read the default language entity
      languageEn = await this.languageModel.read('en');
    }
    // In this cycle we collect translations
    for (let i = 0; i < codes.length; i += 1) {
      let flag = false;
      // Checking language existence
      if (language.length > 0) {
        // In this cycle we try to get proper values from the requested language entity
        for (let j = 0; j < language[0].translations.length; j += 1) {
          if (language[0].translations[j].code === codes[i]) {
            res.push(language[0].translations[j].result);
            flag = true;
          }
        }
      }
      // If there is no such a language or we have not collected necessary translations
      // we read data from default language entity
      if (!flag) {
        for (let j = 0; j < languageEn[0].translations.length; j += 1) {
          if (languageEn[0].translations[j].code === codes[i]) {
            res.push(languageEn[0].translations[j].result);
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
    // We read the requested language model
    let language = await this.languageModel.read(lang);
    let flag = false;
    let translations = null;
    // If there is such a language in the database
    if (language.length > 0) {
      // We read the array of translations into this language
      translations = language[0].translations;
      translations.forEach((a) => {
        // We try to find the requested translation by its code
        if (a.code === code) {
          // If there is such a translations, we turn the checker on
          res = a;
          flag = true;
        }
      });
    }
    // If the checker is still off, we get the default translation value
    if (!flag) {
      language = await this.languageModel.read('en');
      translations = language[0].translations;
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
    // We read a language entity from the database
    const language = await this.languageModel.read(translation.language);
    // If there is such a language
    if (language.length > 0) {
      // We get the language itself
      const lang = language[0];
      // We get the array of translation into this language
      const translations = language[0].translations;
      // We build a model for inserting into database
      const translationForInsertion = {
        code: translation.code,
        result: translation.result,
      };
      // We check whether there is already a translation with the same code
      const translationToCheck = this.getByLangAndCode(translation.language, translation.code);
      // If we create a new one
      if (translationToCheck === null) {
        // We add to array of translations a new translation
        translations.push(translationForInsertion);
      } else {
        // Here we should replace the value of the result in existing translation
        translations.map((a) => {
          if (a.code === translationToCheck.code) {
            a.result = translation.result;
          }
          return a;
        });
      }
      // We update the value of array
      lang.translations = translations;
      // And then we update the entity's value in the database
      await this.languageModel.update(lang);
      // If everything is ok, we just return true
      return true;
    }
      // If there is no such a language, we return false
    return false;
  }
}
