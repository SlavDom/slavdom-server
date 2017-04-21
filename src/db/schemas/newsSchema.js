"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var commentarySchema_1 = require("./commentarySchema");
var Schema = db_1.default.Schema;
var newsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    shortText: String,
    fullText: String,
    theme: String,
    createdAt: String,
    updateAt: String,
    commentaries: [commentarySchema_1.default],
    createdBy: Schema.Types.ObjectId,
    languageId: Schema.Types.ObjectId,
});
exports.default = newsSchema;
