"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var Schema = db_1.default.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordDigest: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    name: String,
    surname: String,
    patronymic: String,
    nation: String,
    nativeLang: String,
    city: String,
    timezone: {
        type: String,
        required: true,
    },
    nonCussing: Boolean,
    registeredAt: {
        type: Date,
        default: Date.now(),
    },
    loggedAt: Schema.Types.Date,
    role: Number,
});
exports.default = userSchema;
