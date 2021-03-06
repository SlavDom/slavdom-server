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
      helper.sendData(res, result);
    } catch (err) {
      helper.sendFailureMessage(err, res);
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
      const result = await this.translationRepository.getTranslationsResultsFromList(lang, codes);
      helper.sendData(res, result);
    } catch (err) {
      helper.sendFailureMessage(err, res);
    }
  }

  /** @param {object} req - The request
   *  @param {object} res - The response
   *  @returns {json} one translation **/
  public async getTranslation(req: Request, res: Response): Promise<void> {
    try {
      let lang;
      let code;
      let translation;

      if (req.query.id === undefined) {
        code = req.query.code;
        lang = req.query.lang;
        translation = await this.translationRepository.getByLangAndCode(lang, code);
      }

      helper.sendData(res, translation);
    } catch (err) {
      helper.sendFailureMessage(err, res);
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
      helper.sendData(res, result);
    } catch (err) {
      helper.sendFailureMessage(err, res);
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
//     helper.sendData({ data: result }, res);
//   } catch (err) {
//     helper.sendFailureMessage(err, res);
//   }
// }

  /** Controller function for deleting an existing translation
   *  @param req - The request
   *  @param res - The response **/
  public async deleteTranslation(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      helper.sendData(res);
    } catch (err) {
      helper.sendFailureMessage(err, res);
    }
  }
}
