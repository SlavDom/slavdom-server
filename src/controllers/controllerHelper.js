"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
function sendFailureMessage(error, res) {
    var message = logger_1.logError(error);
    res.send({ status: "failure", message: message });
}
function sendSuccessMessage(message, res) {
    res.send({ status: "success", message: message });
}
function sendData(data, res) {
    data.status = "success";
    res.send(data);
}
exports.default = {
    sendFailureMessage: sendFailureMessage,
    sendSuccessMessage: sendSuccessMessage,
    sendData: sendData,
};
