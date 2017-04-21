"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
function sendMail(from, subject, text) {
    var smtpConfig = {
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: "test.slavdom@yandex.ru",
            pass: "qwerty12345",
        },
    };
    var transport = nodemailer.createTransport(smtpConfig);
    var message = {
        from: "test.slavdom@yandex.ru",
        to: "test.slavdom@yandex.ru",
        subject: subject,
        text: "From " + from + ": " + text,
        html: "<p>From: " + from + "</p><p>Text message: " + text + "</p>",
    };
    return transport.sendMail(message);
}
exports.sendMail = sendMail;
