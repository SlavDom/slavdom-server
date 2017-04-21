import { expect } from 'chai';
import * as sinon from 'sinon';

import TranslationRepository from '../../src/repositories/translationRepository';
import * as languageModel from '../../src/db/models/languageModel';

describe('TranslationRepository', () => {
  const translationRepository = new TranslationRepository();

  describe('#getTranslations()', () => {
    const englishLanguageCode = 'en';
    const notExistingLanguageCode = 'notExistingLanguageCode';
    const existingLanguageCode = 'existingLanguageCode';

    const translationList = [{
      code: 'some-code',
      prefix: 'reg',
      result: 'Some code',
    },
    {
      code: 'some-next-code',
      prefix: 'reg',
      result: 'Some next code',
    }];
    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it('gets the list of translations by language', () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(existingLanguageCode)
        .returns(existingLanguage);
      translationRepository.getTranslations(existingLanguageCode).then((data) => {
        expect(data).to.equal(translationList);
      });
    });

    it('returns the list of english translations if the language does not exist', () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(notExistingLanguageCode)
        .returns(null)
        .withArgs(englishLanguageCode)
        .returns(englishLanguage);
      translationRepository.getTranslations(notExistingLanguageCode).then((data) => {
        expect(data).to.equal(translationList);
      });
    });
  });

  describe('#getTranslationsFromList()', () => {
    const englishLanguageCode = 'en';
    const notExistingLanguageCode = 'notExistingLanguageCode';
    const existingLanguageCode = 'existingLanguageCode';

    const codesList = [
      'some-code',
      'some-next-code',
    ];

    const translationList = [{
      code: 'some-code',
      prefix: 'reg',
      result: 'Some code',
    },
    {
      code: 'some-next-code',
      prefix: 'reg',
      result: 'Some next code',
    }];

    const resultList = [
      'Some code',
      'Some next code',
    ];

    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it('gets the translation list by language, and list of codes', () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(existingLanguageCode)
        .returns(existingLanguage);
      translationRepository.getTranslationsFromList(existingLanguageCode, codesList).then((data) => {
        data.forEach((t) => {
          expect(resultList).to.include(t);
        });
      });
    });

    it('returns the list of translations of default language if there is not proper translations on the requested one',
      () => {
        languageModel.findByCode = sinon.stub()
          .withArgs(notExistingLanguageCode)
          .returns(null)
          .withArgs(englishLanguageCode)
          .returns(englishLanguage);
        translationRepository.getTranslationsFromList(notExistingLanguageCode, codesList).then((data) => {
          data.forEach((t) => {
            expect(resultList).to.include(t);
          });
        });
      });
  });

  describe('#getTranslationsByPrefix()', () => {
    const englishLanguageCode = 'en';
    const notExistingLanguageCode = 'notExistingLanguageCode';
    const existingLanguageCode = 'existingLanguageCode';
    const prefix = 'reg';

    const translationList = [{
      code: 'some-code',
      prefix: 'reg',
      result: 'Some code',
    },
    {
      code: 'some-next-code',
      prefix: 'reg',
      result: 'Some next code',
    }];

    const resultList = [
      'Some code',
      'Some next code',
    ];

    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it('gets the list of translations by the requested prefix', () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(existingLanguageCode)
        .returns(existingLanguage);
      translationRepository.getTranslationsByPrefix(existingLanguageCode, prefix).then((data) => {
        for (key in data.keys) {
          expect(resultList).to.include(data[key]);
        }
      });
    });

    it('gets the list of translations with the default translations if there is no example for requested prefix',
      () => {
        languageModel.findByCode = sinon.stub()
          .withArgs(notExistingLanguageCode)
          .returns(null)
          .withArgs(englishLanguageCode)
          .returns(englishLanguage);
        translationRepository.getTranslationsByPrefix(notExistingLanguageCode, prefix).then((data) => {
          for (key in data.keys) {
            expect(resultList).to.include(data[key]);
          }
        });
      });
  });

  describe('#getByLangAndCode()', () => {
    const englishLanguageCode = 'en';
    const notExistingLanguageCode = 'notExistingLanguageCode';
    const existingLanguageCode = 'existingLanguageCode';

    const translation = {
      code: 'some-code',
      prefix: 'reg',
      result: 'Some code',
    };

    const translationList = [
      translation,
      {
        code: 'some-next-code',
        prefix: 'reg',
        result: 'Some next code',
      }];

    const englishLanguage = {
      code: englishLanguageCode,
      translations: translationList,
    };
    const existingLanguage = {
      code: existingLanguageCode,
      translations: translationList,
    };

    it('gets the translation by its language and code values', () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(existingLanguageCode)
        .returns(existingLanguage);
      translationRepository.getByLangAndCode(existingLanguageCode, 'some-code').then((data) => {
        expect(data).to.equal(translation);
      });
    });

    it('returns the default translation if there is no suitable translation on the requested language and code', () => {
      languageModel.findByCode = sinon.stub()
        .withArgs(notExistingLanguageCode)
        .returns(null)
        .withArgs(englishLanguageCode)
        .returns(englishLanguage);
      translationRepository.getByLangAndCode(notExistingLanguageCode, 'some-code').then((data) => {
        expect(data).to.equal(translation);
      });
    });
  });
});
