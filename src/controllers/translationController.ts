import helper from "./controllerHelper";
import * as translationRepository from "../repositories/translationRepository";

/** @param {object} req - The request
 *  @param {object} res - The response
 *  @returns {json} Controller function of receiving a list of translations **/
async function getTranslations(req, res) {
  try {
    const lang = req.query.lang;
    const result = await translationRepository.getTranslations(lang);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** @param {object} req - The request
 * @param {object} res - The response
 * @returns {json} a list of translations
 **/
async function getTranslationsFromList(req, res) {
  try {
    const lang = req.query.lang;
    const codeList = req.query.code;
    const codes = JSON.parse(codeList);
    const result = await translationRepository.getTranslationsFromList(lang, codes);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** @param {object} req - The request
 *  @param {object} res - The response
 *  @returns {json} one translation **/
async function getTranslation(req, res) {
  try {
    let id;
    let lang;
    let code;
    let student;

    if (req.query.id !== undefined) {
      id = req.query.id;
    } else {
      code = req.query.code;
      lang = req.query.lang;
      student = await translationRepository.getByLangAndCode(lang, code);
    }

    return helper.sendData({ data: student }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** @param {object} req - The request
 *  @param {object} res - The response
 *  @returns {json}  a list of translations **/
async function getTranslationsByPrefix(req, res) {
  try {
    const lang = req.query.lang;
    const prefix = req.query.prefix;
    const result = await translationRepository.getTranslationsByPrefix(lang, prefix);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

// /** @param {object} req - The request
//  *  @param {object} res - The response
//  *  @returns {json}
//  *  Controller saves received translation **/
// async function saveTranslation(req, res) {
//   try {
//     const translation = {
//       code: req.body.code,
//       language: req.body.language,
//       result: req.body.result,
//     };
//     const result = await translationRepository.saveTranslation(translation);
//     return helper.sendData({ data: result }, res);
//   } catch (err) {
//     return helper.sendFailureMessage(err, res);
//   }
// }

/** Controller function for deleting an existing translation
 *  @param req - The request
 *  @param res - The responce **/
async function deleteTranslation(req, res) {
  try {
    const id = req.body.id;
    return helper.sendData({}, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** Module for translation controller */
export default {
  getTranslations,
  getTranslationsFromList,
  getTranslation,
  getTranslationsByPrefix,
  // saveTranslation,
  deleteTranslation,
};
