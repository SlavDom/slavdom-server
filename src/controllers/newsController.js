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
var newsRepository_1 = require("../repositories/newsRepository");
var controllerHelper_1 = require("./controllerHelper");
var NewsController = (function () {
    function NewsController() {
        this.newsRepository = new newsRepository_1.default();
    }
    /**
     * @param {object} req - the request
     * @param {object} res - the response
     * @returns {json}
     * Get a single news by its theme and lang
     */
    NewsController.prototype.getNews = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, theme, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        lang = req.query.lang;
                        theme = req.query.theme;
                        return [4 /*yield*/, this.newsRepository.getNews(theme, lang)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, controllerHelper_1.default.sendData({ data: result }, res)];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, controllerHelper_1.default.sendFailureMessage(err_1, res)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {object} req - the request
     * @param {object} res - the response
     * @returns {json}
     * Get the list page of news
     */
    NewsController.prototype.getNewsPage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, page, amount, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        lang = req.query.lang;
                        page = req.query.page;
                        amount = req.query.amount;
                        if (page === undefined) {
                            page = 1;
                        }
                        if (amount === undefined) {
                            amount = 5;
                        }
                        if (lang === undefined) {
                            return [2 /*return*/, controllerHelper_1.default.sendFailureMessage("There is no language parameter in the query", res)];
                        }
                        return [4 /*yield*/, this.newsRepository.getNewsPage(lang, page, amount)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, controllerHelper_1.default.sendData(result, res)];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, controllerHelper_1.default.sendFailureMessage(err_2, res)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {object} req - the request
     * @param {object} res - the response
     * @returns {json}
     * Saves the news
     */
    NewsController.prototype.saveNews = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, news, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        lang = req.body.lang;
                        news = {
                            theme: req.body.theme,
                            title: req.body.title,
                            shortText: req.body.shortText,
                            fullText: req.body.fullText,
                        };
                        return [4 /*yield*/, this.newsRepository.saveNews(news, lang)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, controllerHelper_1.default.sendData({ data: result }, res)];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, controllerHelper_1.default.sendFailureMessage(err_3, res)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return NewsController;
}());
exports.default = NewsController;
