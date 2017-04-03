/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import TranslationRepository from '../../src/repositories/translationRepository';

describe('translationRepository', () => {
  const translationRepository = new TranslationRepository();

  describe('#getTranslations()', () => {
    const callback = sinon.stub(translationRepository, 'getTranslations');

    it('gets the list of translations by language', () => {
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
      callback.withArgs('en').returns(translationList);
      expect(callback('en')).to.equal(translationList);
    });

    it('returns the list of english translations if the language does not exist', () => {
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
      callback.withArgs('asdasd').returns(translationList);
      expect(callback('asdasd')).to.equal(translationList);
    });
  });

  describe('#getTranslationsFromList()', () => {
    const callback = sinon.stub(translationRepository, 'getTranslationsFromList');

    it('gets the translation list by language, and list of codes', () => {
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
      callback.withArgs('en', ['some-code', 'some-next-code']).returns(translationList);
      expect(callback('en', ['some-code', 'some-next-code'])).to.equal(translationList);
    });

    it('returns the list of translations of default language if there is not proper translations on the requested one',
      () => {
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
        callback.withArgs('asdasd', ['some-code', 'some-next-code']).returns(translationList);
        expect(callback('asdasd', ['some-code', 'some-next-code'])).to.equal(translationList);
      });
  });

  describe('#getTranslationsByPrefix()', () => {
    const callback = sinon.stub(translationRepository, 'getTranslationsByPrefix');

    it('gets the list of translations by the requested prefix', () => {
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
      callback.withArgs('en', 'reg').returns(translationList);
      expect(callback('en', 'reg')).to.equal(translationList);
    });

    it('gets the list of translations with the default translations if there is no example for requested prefix',
      () => {
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
        callback.withArgs('asd', 'reg').returns(translationList);
        expect(callback('asd', 'reg')).to.equal(translationList);
      });
  });

  describe('#getByLangAndCode()', () => {
    const callback = sinon.stub(translationRepository, 'getByLangAndCode');

    it('gets the translation by its language and code values', () => {
      const translation = {
        code: 'some-code',
        prefix: 'reg',
        result: 'Some code',
      };
      callback.withArgs('en', 'some-code').returns(translation);
      expect(callback('en', 'some-code')).to.equal(translation);
    });

    it('returns the default translation if there is no suitable translation on the requested language and code', () => {
      const translation = {
        code: 'some-code',
        prefix: 'reg',
        result: 'Some code',
      };
      callback.withArgs('asd', 'some-code').returns(translation);
      expect(callback('asd', 'some-code')).to.equal(translation);
    });
  });
});
