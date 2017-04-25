import "jest";

import {Response, Request} from "express";
import * as sinon from "sinon";

import TranslationRepository from "../../src/repositories/translationRepository";
import TranslationController from "../../src/controllers/translationController";
import helper from "../../src/controllers/controllerHelper";
import {AssociativeArray} from "../../src/types/AssociativeArray";
import {Translation} from "../../src/db/types/Translation";
import {ObjectID} from "bson";

describe("TranslationRepository", () => {
  const translationCotnroller: TranslationController = new TranslationController();

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
  const translationList: Translation[] = [
    someTranslation,
    someNewTranslation,
  ] as Translation[];
  const resultList: string[] = [
    "Some code",
    "Some next code",
  ];

  const req: Request = {} as Request;
  req.query = {};
  const res: Response = {} as Response;
  res.send = () => res;
  let spy: any;

  beforeEach(() => {
    spy = sinon.spy(helper, "sendData");
  });

  afterEach(() => {
    req.query = {};
    spy.restore();
  });

  describe("#getTranslations()", () => {

    test("gets the list of translations by language", () => {
      req.query.lang = englishLanguageCode;
      TranslationRepository.prototype.getTranslations = jest.fn().mockReturnValue(translationList);
      return translationCotnroller.getTranslations(req, res).then(() => {
        expect(spy.withArgs(res, translationList).calledOnce).toBeTruthy();
      });
    });

    test("returns the list of english translations if the language does not exist", () => {
      req.query.lang = notExistingLanguageCode;
      TranslationRepository.prototype.getTranslations = jest.fn().mockReturnValueOnce(translationEnglishList);
      return translationCotnroller.getTranslations(req, res).then(() => {
        expect(spy.withArgs(res, translationEnglishList).calledOnce).toBeTruthy();
      });
    });
  });

  describe("#getTranslationsFromList()", () => {

    test("gets the translations results list by language and list of codes", () => {
      req.query.lang = englishLanguageCode;
      req.query.code = "[\"some-code\", \"some-next-code\"]";
      TranslationRepository.prototype.getTranslationsResultsFromList = jest.fn().mockReturnValue(resultList);
      return translationCotnroller.getTranslationsFromList(req, res).then(() => {
        expect(spy.withArgs(res, resultList).calledOnce).toBeTruthy();
      });
    });

    test("returns the list of translations results of default language if there is not proper " +
      "translations on the requested one", () => {
      req.query.lang = notExistingLanguageCode;
      req.query.code = "[\"some-code\", \"some-next-code\"]";
      TranslationRepository.prototype.getTranslationsResultsFromList = jest.fn().mockReturnValue(resultList);
      return translationCotnroller.getTranslationsFromList(req, res)
        .then(() => {
          expect(spy.withArgs(res, resultList).calledOnce).toBeTruthy();
        });
    });
  });

  describe("#getTranslationsByPrefix()", () => {
    const prefix: string = "reg";
    const resultArray: AssociativeArray<string> = {
      "some-code": "Some code",
      "some-next-code": "Some next code",
    };

    test("gets the list of translations by the requested prefix", () => {
      req.query.lang = englishLanguageCode;
      req.query.prefix = ["reg"];
      TranslationRepository.prototype.getTranslationsByPrefix = jest.fn().mockReturnValue(resultArray);
      return translationCotnroller.getTranslationsByPrefix(req, res)
        .then(() => {
          expect(spy.withArgs(res, resultArray).calledOnce).toBeTruthy();
        });
    });

    test("gets the list of translations with the default translations if there is no example for requested prefix",
      () => {
        req.query.lang = notExistingLanguageCode;
        req.query.prefix = ["reg"];
        TranslationRepository.prototype.getTranslationsByPrefix = jest.fn().mockReturnValue(resultArray);
        return translationCotnroller.getTranslationsByPrefix(req, res)
          .then(() => {
            expect(spy.withArgs(res, resultArray).calledOnce).toBeTruthy();
          });
      });
  });

  describe("#getTranslation()", () => {

    test("gets the translation by its language and code values", () => {
      req.query.lang = englishLanguageCode;
      req.query.code = someTranslation.code;
      TranslationRepository.prototype.getByLangAndCode = jest.fn().mockReturnValue(someTranslation);
      return translationCotnroller.getTranslation(req, res)
        .then(() => {
          expect(spy.withArgs(res, someTranslation).calledOnce).toBeTruthy();
        });
    });

    it("returns the default translation if there is no suitable translation on the requested language and code",
      () => {
        req.query.lang = englishLanguageCode;
        req.query.prefix = someNewTranslation.code;
        TranslationRepository.prototype.getByLangAndCode = jest.fn().mockReturnValue(someNewTranslation);
        return translationCotnroller.getTranslation(req, res)
          .then(() => {
            expect(spy.withArgs(res, someNewTranslation).calledOnce).toBeTruthy();
          });
      });
  });
});
