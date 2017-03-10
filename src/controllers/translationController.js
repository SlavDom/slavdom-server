import helper from "./_controllerHelper";
import translationRepository from "../repositories/translationRepository";
import * as Joi from "joi";

/** Module for translation controller */
export default {
    getTranslations,
    getTranslation,
    saveTranslation,
    deleteTranslation
};

/** Controller function of receiving a list of translations
 *  @param req - The request
 *  @param res - The response **/
async function getTranslations(req, res) {
    try {
        let search = req.query.search;
        let sortOrder = req.query.sortOrder;
        let pageNumber = req.query.pageNumber;
        let pageSize = req.query.pageSize;

        let result = await translationRepository.getTranslations();

        return helper.sendData({data: result}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

/** Controller function of getting one translation
 *  @param req - The request
 *  @param res - The response **/
async function getTranslation(req, res) {
    try {
        let id = req.query.id;

        let student = await translationRepository.getById(id);

        return helper.sendData({data: student}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

/** Controller function for creating a new translation or to save an existing one
 *  @param req - The request
 *  @param res - The response **/
async function saveTranslation(req, res) {
    try {
        let data = req.body;

        let schema = {
            code: Joi.string().required(),
            language: Joi.string().required(),
            result: Joi.string().required(),
        };

        let result = null;

        let translation = await helper.loadSchema(data, schema);

        result = await translationRepository.saveTranslation(translation);
        return helper.sendData({data: result}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

/** Controller function for deleting an existing translation
 *  @param req - The request
 *  @param res - The responce **/
async function deleteTranslation(req, res) {
    try {
        let id = req.body.id;

        // await translationRepository.deleteById(id);

        return helper.sendData({}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}