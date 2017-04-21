"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var translationSchema_1 = require("./translationSchema");
var Schema = db_1.default.Schema;
var languageSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    translations: [translationSchema_1.default],
});
exports.default = languageSchema;
