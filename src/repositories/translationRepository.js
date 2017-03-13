import dbInit from "../db/sequelize/db";
import * as Promise from "bluebird";
import {Translation} from "../../typings/app/models";

/** Module for translation repository */
export default {
    init,
    getTranslations,
    getById,
    getByCode,
    saveTranslation
};


const db = dbInit.init();
let translationModel = db.models.Translation;

/** Initialisation of the model with an existing database */
function init(db) {
    translationModel = db.models.Translation;
}

/** Getting a list of translations
 * @returns the list of translations */
function getTranslations(): Promise<Translation[]> {
    return translationModel.findAll();
}

/** Getting a translation by its id
 * @returns one translation */
function getById(id: number): Promise<Translation> {
    return translationModel.findById(id);
}

/** Getting translations with common code
 * @returns the list of translations */
function getByCode(code:string):Promise<Translation[]> {
    return translationModel.findByCode(code);
}

/** Saving a new translation to repository
 * @returns the created translation */
function saveTranslation(translation: Translation): boolean {
    return translationModel.create(translation);
}