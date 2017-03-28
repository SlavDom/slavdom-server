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
    if (language === null) {
      // Then we read the default language entity
      language = await this.languageModel.read('en');
    }
    // We return only the array of translations into this language
    return language.translations;
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
      if (language !== null) {
        // In this cycle we try to get proper values from the requested language entity
        for (let j = 0; j < language.translations.length; j += 1) {
          if (language.translations[j].code === codes[i]) {
            res.push(language.translations[j].result);
            flag = true;
          }
        }
      }
      // If there is no such a language or we have not collected necessary translations
      // we read data from default language entity
      if (!flag) {
        for (let j = 0; j < languageEn.translations.length; j += 1) {
          if (languageEn.translations[j].code === codes[i]) {
            res.push(languageEn.translations[j].result);
            flag = true;
          }
        }
      }
    }
    return res;
  }



  async getTranslationsByPrefix(lang, prefix) {
    const res = {};
    // We read the requested language model
    let language = await this.languageModel.read(lang);
    if (language !== null) {
      // We search all values from the list
      language.translations.forEach((elem) => {
        if (elem.prefix === prefix) {
          res[elem.code] = elem.result;
        }
      });
    }
    // We read the default language
    language = await this.languageModel.read('en');
    // We check whether all values have been added to array
    language.translations.forEach((elem) => {
      if (elem.prefix === prefix) {
        if (!res[elem.code]) {
          res[elem.code] = elem.result;
        }
      }
    });
    return res;
  }

    /** Getting translations with common code
     * @returns the list of translations */
  async getByLangAndCode(lang, code) {
    let res = null;
    // We read the requested language model
    let language = await this.languageModel.read(lang);
    let flag = false;
    let translations = null;
    // If there is such a language in the database
    if (language !== null) {
      // We read the array of translations into this language
      translations = language.translations;
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
    if (language !== null) {
      // We get the array of translation into this language
      const translations = language.translations;
      // We build a model for inserting into database
      const translationForInsertion = {
        code: translation.code,
        result: translation.result,
      };
      // We checkUniqueness whether there is already a translation with the same code
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
      language.translations = translations;
      // And then we update the entity's value in the database
      await this.languageModel.update(language);
      // If everything is ok, we just return true
      return true;
    }
      // If there is no such a language, we return false
    return false;
  }
}
