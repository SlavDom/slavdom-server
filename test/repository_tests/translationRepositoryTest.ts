import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import TranslationRepository from "../../src/repositories/translationRepository";
import LanguageModel from "../../src/db/models/languageModel";
import {AssociativeArray} from "../../src/types/AssociativeArray";
import {Translation} from "../../src/db/types/Translation";

describe("TranslationRepository", () => {
  const translationRepository: TranslationRepository = new TranslationRepository();
  const languageModel: LanguageModel = new LanguageModel();

  describe("#getTranslations()", () => {
    const englishLanguageCode: string = "en";
    const notExistingLanguageCode: string = "notExistingLanguageCode";
    const existingLanguageCode: string = "existingLanguageCode";

    const translationList = [{
      code: "some-code",
      prefix: "reg",
      result: "Some code",
    },
    {
      code: "some-next-code",
      prefix: "reg",
      result: "Some next code",
    }];
    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it("gets the list of translations by language", () => {
      languageModel.findByCode = sinon.stub().withArgs(existingLanguageCode).returns(existingLanguage);
      translationRepository.getTranslations(existingLanguageCode).then((translations: Translation[]) => {
        expect(translations).to.equal(translationList);
      });
    });

    it("returns the list of english translations if the language does not exist", () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(notExistingLanguageCode).returns(null)
        .withArgs(englishLanguageCode).returns(englishLanguage);
      translationRepository.getTranslations(notExistingLanguageCode).then((translations: Translation[]) => {
        expect(translations).to.equal(translationList);
      });
    });
  });

  describe("#getTranslationsResultsFromList()", () => {
    const englishLanguageCode = "en";
    const notExistingLanguageCode = "notExistingLanguageCode";
    const existingLanguageCode = "existingLanguageCode";

    const codesList = [
      "some-code",
      "some-next-code",
    ];

    const translationList = [{
      code: "some-code",
      prefix: "reg",
      result: "Some code",
    },
    {
      code: "some-next-code",
      prefix: "reg",
      result: "Some next code",
    }];

    const resultList = [
      "Some code",
      "Some next code",
    ];

    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it("gets the translations results list by language and list of codes", () => {
      languageModel.findByCode = sinon.stub().withArgs(existingLanguageCode).returns(existingLanguage);
      translationRepository.getTranslationsResultsFromList(existingLanguageCode, codesList).then((results) => {
        results.forEach((result: string) => {
          expect(resultList).to.include(result);
        });
      });
    });

    it("returns the list of translations results of default language if there is not proper " +
      "translations on the requested one", () => {
        languageModel.findByCode = sinon.stub()
          .withArgs(notExistingLanguageCode).returns(null)
          .withArgs(englishLanguageCode).returns(englishLanguage);
        translationRepository.getTranslationsResultsFromList(notExistingLanguageCode, codesList).then((results) => {
          results.forEach((result) => {
            expect(resultList).to.include(result);
          });
        });
      });
  });

  describe("#getTranslationsByPrefix()", () => {
    const englishLanguageCode: string = "en";
    const notExistingLanguageCode: string = "notExistingLanguageCode";
    const existingLanguageCode: string = "existingLanguageCode";
    const prefix: string = "reg";

    const translationList: object[] = [{
      code: "some-code",
      prefix: "reg",
      result: "Some code",
    },
    {
      code: "some-next-code",
      prefix: "reg",
      result: "Some next code",
    }];

    const resultList: string[] = [
      "Some code",
      "Some next code",
    ];

    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it("gets the list of translations by the requested prefix", () => {
      languageModel.findByCode = sinon.stub().withArgs(existingLanguageCode).returns(existingLanguage);
      translationRepository.getTranslationsByPrefix(existingLanguageCode, prefix)
        .then((translations: AssociativeArray<string>) => {
          for (const code of translations.keys) {
            expect(resultList).to.include(translations[code]);
          }
      });
    });

    it("gets the list of translations with the default translations if there is no example for requested prefix",
      () => {
        languageModel.findByCode = sinon.stub()
          .withArgs(notExistingLanguageCode).returns(null)
          .withArgs(englishLanguageCode).returns(englishLanguage);
        translationRepository.getTranslationsByPrefix(notExistingLanguageCode, prefix)
          .then((translations: AssociativeArray<string>) => {
            for (const code of translations.keys) {
              expect(resultList).to.include(translations[code]);
            }
        });
      });
  });

  describe("#getByLangAndCode()", () => {
    const englishLanguageCode = "en";
    const notExistingLanguageCode = "notExistingLanguageCode";
    const existingLanguageCode = "existingLanguageCode";

    const someTranslation = {
      code: "some-code",
      prefix: "reg",
      result: "Some code",
    };

    const translationList = [
      someTranslation,
      {
        code: "some-next-code",
        prefix: "reg",
        result: "Some next code",
      }];

    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it("gets the translation by its language and code values", () => {
      languageModel.findByCode = sinon.stub().withArgs(existingLanguageCode).returns(existingLanguage);
      translationRepository.getByLangAndCode(existingLanguageCode, "some-code").then((translation: Translation) => {
        expect(translation).to.equal(someTranslation);
      });
    });

    it("returns the default translation if there is no suitable translation on the requested language and code", () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(notExistingLanguageCode).returns(null)
        .withArgs(englishLanguageCode).returns(englishLanguage);
      translationRepository.getByLangAndCode(notExistingLanguageCode, "some-code").then((translation: Translation) => {
        expect(translation).to.equal(someTranslation);
      });
    });
  });
});
