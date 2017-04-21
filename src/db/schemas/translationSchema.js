"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var Schema = db_1.default.Schema;
var translationSchema = new Schema({
    code: String,
    prefix: String,
    result: String,
});
exports.default = translationSchema;
