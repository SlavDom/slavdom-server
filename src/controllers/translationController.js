import helper from './controllerHelper';
import TranslationRepository from '../repositories/translationRepository';

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
    const lang = req.query.lang;
    const translationRepository = new TranslationRepository();
    const result = await translationRepository.getTranslations(lang);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function getTranslationsFromList(req, res) {
  try {
    const lang = req.query.lang;
    const codeList = req.query.code;
    const codes = JSON.parse(codeList);
    const translationRepository = new TranslationRepository();
    const result = await translationRepository.getTranslationsFromList(lang, codes);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** Controller function of getting one translation
 *  @param req - The request
 *  @param res - The response **/
async function getTranslation(req, res) {
  try {
    let id;
    let lang;
    let code;
    let student;


    if (req.query.id != undefined) {
      id = req.query.id;
    } else {
      code = req.query.code;
      lang = req.query.lang;
      const translationRepository = new TranslationRepository();
      student = await translationRepository.getByLangAndCode(lang, code);
    }

    return helper.sendData({ data: student }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** Controller function for creating a new translation or to save an existing one
 *  @param req - The request
 *  @param res - The response **/
async function saveTranslation(req, res) {
  try {
    const translation = {
      code: req.body.code,
      language: req.body.language,
      result: req.body.result,
    };
    const translationRepository = new TranslationRepository();
    const result = await translationRepository.saveTranslation(translation);
    return helper.sendData({ data: result }, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

/** Controller function for deleting an existing translation
 *  @param req - The request
 *  @param res - The responce **/
async function deleteTranslation(req, res) {
  try {
    const id = req.body.id;

        // await translationRepository.deleteById(id);

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
  saveTranslation,
  deleteTranslation,
};
