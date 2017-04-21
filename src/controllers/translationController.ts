import helper from "./controllerHelper";
import TranslationRepository from "../repositories/translationRepository";
import {Request, Response} from "express";

export default class TranslationController {

  private translationRepository: TranslationRepository;

  constructor() {
    this.translationRepository = new TranslationRepository();
  }

  /** @param {object} req - The request
   *  @param {object} res - The response
   *  @returns {json} Controller function of receiving a list of translations **/
  public async getTranslations(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.query.lang;
      const result = await this.translationRepository.getTranslations(lang);
      return helper.sendData(result, res);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }

  /** @param {object} req - The request
   * @param {object} res - The response
   * @returns {json} a list of translations
   **/
  public async getTranslationsFromList(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.query.lang;
      const codeList = req.query.code;
      const codes = JSON.parse(codeList);
      const result = await this.translationRepository.getTranslationsFromList(lang, codes);
      return helper.sendData(result, res);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }

  /** @param {object} req - The request
   *  @param {object} res - The response
   *  @returns {json} one translation **/
  public async getTranslation(req: Request, res: Response): Promise<void> {
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
        student = await this.translationRepository.getByLangAndCode(lang, code);
      }

      return helper.sendData(student, res);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }

  /** @param {object} req - The request
   *  @param {object} res - The response
   *  @returns {json}  a list of translations **/
  public async getTranslationsByPrefix(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.query.lang;
      const prefix = req.query.prefix;
      const result = await this.translationRepository.getTranslationsByPrefix(lang, prefix);
      return helper.sendData(result, res);
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
  public async deleteTranslation(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      return helper.sendData({}, res);
    } catch (err) {
      return helper.sendFailureMessage(err, res);
    }
  }
}
