import "jest";

import TranslationRepository from "../../src/repositories/translationRepository";
import LanguageModel from "../../src/db/models/languageModel";
import {AssociativeArray} from "../../src/types/AssociativeArray";
import {Translation} from "../../src/db/types/Translation";
import {Language} from "../../src/db/types/Language";
import {ObjectID} from "bson";

describe("TranslationRepository", () => {
  const translationRepository: TranslationRepository = new TranslationRepository();

  const englishLanguageCode: string = "en";
  const notExistingLanguageCode: string = "notExistingLanguageCode";
  const existingLanguageCode: string = "existingLanguageCode";
  const someTranslation: Translation = {
    id: new ObjectID("XXXXXXXXXXXX"),
    code: "some-code",
    prefix: ["reg"],
    result: "Some code",
  } as Translation;
  const someNewTranslation: Translation = {
    id: new ObjectID("XXXXXXXXXXXY"),
    code: "some-next-code",
    prefix: ["reg"],
    result: "Some next code",
  } as Translation;

  const translationEnglishList: Translation[] = [
    someTranslation,
    someNewTranslation,
  ] as Translation[];
  const englishLanguage: Language = {
    code: englishLanguageCode,
    translations: translationEnglishList,
  } as Language;
  const translationList: Translation[] = [
    someTranslation,
    someNewTranslation,
  ] as Translation[];
  const existingLanguage: Language = {
    code: existingLanguageCode,
    translations: translationList,
  } as Language;

  describe("#getTranslations()", () => {

    test("gets the list of translations by language", () => {
      LanguageModel.prototype.findByCode = jest.fn().mockReturnValue(existingLanguage);
      return translationRepository.getTranslations(existingLanguageCode).then((translations: Translation[]) => {
        expect(translations).toEqual(translationList);
      });
    });

    test("returns the list of english translations if the language does not exist", () => {
      LanguageModel.prototype.findByCode = jest.fn()
        .mockReturnValueOnce(null)
        .mockReturnValue(englishLanguage);
      return translationRepository.getTranslations(notExistingLanguageCode).then((translations: Translation[]) => {
        expect(translations).toEqual(translationList);
      });
    });
  });

  describe("#getTranslationsResultsFromList()", () => {
    const codesList: string[] = [
      "some-code",
      "some-next-code",
    ];
    const resultList: string[] = [
      "Some code",
      "Some next code",
    ];

    test("gets the translations results list by language and list of codes", () => {
      LanguageModel.prototype.findByCode = jest.fn().mockReturnValue(existingLanguage);
      return translationRepository.getTranslationsResultsFromList(existingLanguageCode, codesList).then((results) => {
        results.forEach((result: string) => {
          expect(resultList).toContain(result);
        });
      });
    });

    test("returns the list of translations results of default language if there is not proper " +
      "translations on the requested one", () => {
        LanguageModel.prototype.findByCode = jest.fn()
          .mockReturnValueOnce(null)
          .mockReturnValue(englishLanguage);
        return translationRepository.getTranslationsResultsFromList(notExistingLanguageCode, codesList)
          .then((results) => {
            results.forEach((result) => {
              expect(resultList).toContain(result);
            });
        });
      });
  });

  describe("#getTranslationsByPrefix()", () => {
    const prefix: string = "reg";
    const resultList: string[] = [
      "Some code",
      "Some next code",
    ];

    test("gets the list of translations by the requested prefix", () => {
      LanguageModel.prototype.findByCode = jest.fn().mockReturnValue(existingLanguage);
      return translationRepository.getTranslationsByPrefix(existingLanguageCode, prefix)
        .then((translations: AssociativeArray<string>) => {
          for (const code in translations) {
            if (translations.hasOwnProperty(code)) {
              expect(resultList).toContain(translations[code]);
            }
          }
      });
    });

    test("gets the list of translations with the default translations if there is no example for requested prefix",
      () => {
        LanguageModel.prototype.findByCode = jest.fn()
          .mockReturnValueOnce(null)
          .mockReturnValue(englishLanguage);
        return translationRepository.getTranslationsByPrefix(notExistingLanguageCode, prefix)
          .then((translations: AssociativeArray<string>) => {
            for (const code in translations) {
              if (translations.hasOwnProperty(code)) {
                expect(resultList).toContain(translations[code]);
              }
            }
        });
      });
  });

  describe("#getByLangAndCode()", () => {

    test("gets the translation by its language and code values", () => {
      LanguageModel.prototype.findByCode = jest.fn().mockReturnValue(existingLanguage);
      return translationRepository.getByLangAndCode(existingLanguageCode, "some-code")
        .then((translation: Translation) => {
          expect(translation).toEqual(someTranslation);
        });
    });

    it("returns the default translation if there is no suitable translation on the requested language and code",
      () => {
      LanguageModel.prototype.findByCode = jest.fn()
        .mockReturnValueOnce(null)
        .mockReturnValue(englishLanguage);
      return translationRepository.getByLangAndCode(notExistingLanguageCode, "some-code")
        .then((translation: Translation) => {
          expect(translation).toEqual(someTranslation);
        });
    });
  });
});
