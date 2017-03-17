import helper from "./controllerHelper";
import TranslationRepository from "../repositories/translationRepository";

/** Module for translation controller */
export default {
    getTranslations,
    getTranslationsFromList,
    getTranslation,
    saveTranslation,
    deleteTranslation
};

/** Controller function of receiving a list of translations
 *  @param req - The request
 *  @param res - The response **/
async function getTranslations(req, res) {
    try {
        // let search = req.query.search;
        // let sortOrder = req.query.sortOrder;
        // let pageNumber = req.query.pageNumber;
        // let pageSize = req.query.pageSize;
        // let translationRepository = new TranslationRepository();
        let lang = req.query.lang;
        let translationRepository = new TranslationRepository();
        let result = await translationRepository.getTranslations(lang);
        return helper.sendData({data: result}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getTranslationsFromList(req, res) {
    try {
        let lang = req.query.lang;
        let codeList = req.query.code;
        let codes = JSON.parse(codeList);
        let translationRepository = new TranslationRepository();
        let result = await translationRepository.getTranslationsFromList(lang, codes);
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
        let id = undefined;
        let lang = undefined;
        let code = undefined;
        let student = undefined;


        if (req.query.id != undefined) {
             id = req.query.id;
        } else {
            code = req.query.code;
            lang = req.query.lang;
            let translationRepository = new TranslationRepository();
            student = await translationRepository.getByLangAndCode(lang, code);
        }

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

        // let schema = {
        //     code: Joi.string().required(),
        //     language: Joi.string().required(),
        //     result: Joi.string().required(),
        // };

        let result = null;

        // let translation = await helper.loadSchema(data, schema);
        let translation = {
            code: req.body.code,
            language: req.body.language,
            result: req.body.result
        };
        let translationRepository = new TranslationRepository();
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