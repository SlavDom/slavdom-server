import {Translation} from "../../typings/app/models";
import LanguageModel from '../db/models/languageModel';

/** Module for translation repository */
export default class TranslationRepository {

    constructor() {
        this.languageModel = new LanguageModel();
    }

    /** Getting a list of translations
     * @returns the list of translations */
    async getTranslations(lang: string): Translation[] {
        let langer = await this.languageModel.read(lang);
        return langer[0].translations;
    }

    // /** Getting a translation by its id
    //  * @returns one translation */
    // getById(id: number): Translation {
    //     return translationModel.findById(id);
    // }

    /** Getting translations with common code
     * @returns the list of translations */
    async getByLangAndCode(lang: string, code: string): Translation {
        let res = null;
        const langer = await this.languageModel.read(lang);
        const translations = langer[0].translations;
        translations.forEach(a => {
            if (a.code === code) {
                res = a;
            }
        });
        return res;
    }

    /** Saving a new translation to repository
     * @returns the created translation */
    async saveTranslation(translation: Translation): boolean {
        const langer = await this.languageModel.read(translation.language);
        console.log(langer[0]);
        let lang = langer[0];
        const translations = langer[0].translations;
        const translationForInsertion = {
            code: translation.code,
            result: translation.result
        };
        translations.push(translationForInsertion);
        lang.translations = translations;
        console.log(lang);
        await this.languageModel.update(lang);
        return true;
    }
}