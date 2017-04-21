"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var Schema = db_1.default.Schema;
var commentarySchema = new Schema({
    text: String,
    rating: Number,
    timestamp: Schema.Types.Date,
    publishedBy: Schema.Types.ObjectId,
});
exports.default = commentarySchema;
