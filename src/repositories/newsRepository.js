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
var newsModel_1 = require("../db/models/newsModel");
var languageModel_1 = require("../db/models/languageModel");
var comparators_1 = require("../utils/comparators");
var NewsRepository = (function () {
    function NewsRepository() {
        this.newsModel = new newsModel_1.default();
        this.languageModel = new languageModel_1.default();
    }
    /**
     * @param {string} theme requested theme of the news
     * @param {string} language requested language code
     * @returns {object} the news found by language and code
     */
    NewsRepository.prototype.getNews = function (theme, language) {
        return __awaiter(this, void 0, void 0, function () {
            var langId, news;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.languageModel.getId(language)];
                    case 1:
                        langId = _a.sent();
                        if (!(langId !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.newsModel.findByThemeAndLanguageId(theme, langId)];
                    case 2:
                        news = _a.sent();
                        return [2 /*return*/, news];
                    case 3: 
                    // If there is no such a language
                    return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
     * @param {string} language requested language code
     * @param {number} page requested page
     * @param {number} amount requested page length
     * @returns {array} the news list
     */
    NewsRepository.prototype.getNewsPage = function (language, page, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var langId, newsList, amountAll, newsListToSlice, result_1, result_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.languageModel.getId(language)];
                    case 1:
                        langId = _a.sent();
                        if (!(langId !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.newsModel.findByLanguageId(langId)];
                    case 2:
                        newsList = _a.sent();
                        newsList.sort(comparators_1.newsComparator);
                        amountAll = newsList.length;
                        newsListToSlice = newsList.slice((page - 1) * amount);
                        // If we get something on the requested page
                        if (newsListToSlice.length > 0) {
                            // Shorten the result array
                            newsListToSlice.length = amount;
                            result_1 = [];
                            newsListToSlice.forEach(function (a) {
                                if (a !== null) {
                                    result_1.push(a);
                                }
                            });
                            return [2 /*return*/, {
                                    data: result_1,
                                    amount: amountAll,
                                }];
                        }
                        // If we do not have enough data return the first page
                        // Shorten the result array
                        newsList.length = amount;
                        result_2 = [];
                        newsList.forEach(function (a) {
                            if (a !== null) {
                                result_2.push(a);
                            }
                        });
                        return [2 /*return*/, {
                                data: result_2,
                                amount: amountAll,
                            }];
                    case 3: 
                    // If there is no such a language
                    return [2 /*return*/, {
                            data: [],
                            amount: 0,
                        }];
                }
            });
        });
    };
    /**
     * @param {object} news the news to save
     * @param {string} language language the news is related to
     */
    NewsRepository.prototype.saveNews = function (news, language) {
        return __awaiter(this, void 0, void 0, function () {
            var langId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.languageModel.getId(language)];
                    case 1:
                        langId = _a.sent();
                        if (!(langId !== null)) return [3 /*break*/, 3];
                        // We add to news model a language attribute with its ID
                        news.languageId = langId;
                        // We created the model into the database
                        return [4 /*yield*/, this.newsModel.create(news)];
                    case 2:
                        // We created the model into the database
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return NewsRepository;
}());
exports.default = NewsRepository;
