"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var languageModel_1 = require("../db/models/languageModel");
var TranslationRepository = (function () {
    function TranslationRepository() {
        this.languageModel = new languageModel_1.default();
    }
    /** @param {string} lang requested languages
     * @returns {array} the list of translations
     * Getting a list of translations */
    TranslationRepository.prototype.getTranslations = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var language;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.languageModel.findByCode(lang)];
                    case 1:
                        language = _a.sent();
                        if (!(language === null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.languageModel.findByCode("en")];
                    case 2:
                        // Then we read the default language entity
                        language = _a.sent();
                        _a.label = 3;
                    case 3: 
                    // We return only the array of translations into this language
                    return [2 /*return*/, language.translations];
                }
            });
        });
    };
    /** @param {string} lang requested language
     * @param {array} codes the list of requested codes
     * @returns {array} the list of translations
     * */
    TranslationRepository.prototype.getTranslationsFromList = function (lang, codes) {
        return __awaiter(this, void 0, void 0, function () {
            var res, language, languageEn, _loop_1, _i, codes_1, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = [];
                        return [4 /*yield*/, this.languageModel.findByCode(lang)];
                    case 1:
                        language = _a.sent();
                        languageEn = null;
                        if (!(lang !== "en")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.languageModel.findByCode("en")];
                    case 2:
                        // If the requested language is not English, we should read the default language entity
                        languageEn = _a.sent();
                        _a.label = 3;
                    case 3:
                        _loop_1 = function (code) {
                            var flag = false;
                            // Checking language existence
                            if (language !== null) {
                                // In this cycle we try to get proper values from the requested language entity
                                _.forEach(language.translations, function (elem) {
                                    if (elem.code === code) {
                                        res.push(elem.result);
                                        flag = true;
                                    }
                                });
                            }
                            // If there is no such a language or we have not collected necessary translations
                            // we read data from default language entity
                            if (!flag) {
                                _.forEach(languageEn.translations, function (elem) {
                                    if (elem.code === code) {
                                        res.push(elem.result);
                                        flag = true;
                                    }
                                });
                            }
                        };
                        // In this cycle we collect translations
                        for (_i = 0, codes_1 = codes; _i < codes_1.length; _i++) {
                            code = codes_1[_i];
                            _loop_1(code);
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    TranslationRepository.prototype.getTranslationsByPrefix = function (lang, prefix) {
        return __awaiter(this, void 0, void 0, function () {
            var res, language;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = {};
                        return [4 /*yield*/, this.languageModel.findByCode(lang)];
                    case 1:
                        language = _a.sent();
                        if (language !== null) {
                            // We search all values from the list
                            _.forEach(language.translations, function (elem) {
                                if (elem.prefix.includes(prefix)) {
                                    res[elem.code] = elem.result;
                                }
                            });
                        }
                        return [4 /*yield*/, this.languageModel.findByCode("en")];
                    case 2:
                        // We read the default language
                        language = _a.sent();
                        // We check whether all values have been added to array
                        _.forEach(language.translations, function (elem) {
                            if (elem.prefix.includes(prefix)) {
                                if (!res[elem.code]) {
                                    res[elem.code] = elem.result;
                                }
                            }
                        });
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Getting translations with common code
     * @param {string} lang language
     * @param {string} code code of the translation
     * @returns {object} the list of translations */
    TranslationRepository.prototype.getByLangAndCode = function (lang, code) {
        return __awaiter(this, void 0, void 0, function () {
            var res, language, flag, translations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = null;
                        return [4 /*yield*/, this.languageModel.findByCode(lang)];
                    case 1:
                        language = _a.sent();
                        flag = false;
                        translations = null;
                        // If there is such a language in the database
                        if (language !== null) {
                            // We read the array of translations into this language
                            translations = language.translations;
                            translations.forEach(function (a) {
                                // We try to find the requested translation by its code
                                if (a.code === code) {
                                    // If there is such a translations, we turn the checker on
                                    res = a;
                                    flag = true;
                                }
                            });
                        }
                        if (!!flag) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.languageModel.findByCode("en")];
                    case 2:
                        language = _a.sent();
                        translations = language[0].translations;
                        translations.forEach(function (a) {
                            if (a.code === code) {
                                res = a;
                            }
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/, res];
                }
            });
        });
    };
    //   /** Saving a new translation to repository
    //    * @returns boolean created translation */
    TranslationRepository.prototype.saveTranslation = function (translation) {
        return __awaiter(this, void 0, void 0, function () {
            var language, translations, translationForInsertion, translationToCheck_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.languageModel.findByCode(translation.language)];
                    case 1:
                        language = _a.sent();
                        if (!(language !== null)) return [3 /*break*/, 4];
                        translations = language.translations;
                        translationForInsertion = {
                            code: translation.code,
                            result: translation.result,
                        };
                        return [4 /*yield*/, this.getByLangAndCode(translation.language, translation.code)];
                    case 2:
                        translationToCheck_1 = _a.sent();
                        // If we create a new one
                        if (translationToCheck_1 === null) {
                            // We add to array of translations a new translation
                            translations.push(translationForInsertion);
                        }
                        else {
                            // Here we should replace the value of the result in existing translation
                            translations.map(function (a) {
                                if (a.code === translationToCheck_1.code) {
                                    a.result = translation.result;
                                }
                                return a;
                            });
                        }
                        // We update the value of array
                        language.translations = translations;
                        // And then we update the entity's value in the database
                        return [4 /*yield*/, this.languageModel.update(language)];
                    case 3:
                        // And then we update the entity's value in the database
                        _a.sent();
                        // If everything is ok, we just return true
                        return [2 /*return*/, true];
                    case 4: 
                    // If there is no such a language, we return false
                    return [2 /*return*/, false];
                }
            });
        });
    };
    return TranslationRepository;
}());
exports.default = TranslationRepository;
