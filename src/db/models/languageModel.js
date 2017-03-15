import BaseModel from './baseModel';
import LanguageEntity from '../entities/languageEntity';

export default class LanguageModel extends BaseModel {

    create(language: JSON) {
        const languageObject = new LanguageEntity(language);
        languageObject.save(err => {
            if (err) throw err;
        });
    }

    async read(code: String) {
        return LanguageEntity.find({
            code: code
        }).exec((err, language) => {
            if (err) throw err;
            return language;
        });
    }

    async update(language: JSON) {
        return LanguageEntity.update({ _id: language.id}, { $set: language}, () => {});
    }

    del(id: number) {
        LanguageEntity.remove({
            id: id
        });
    }
}
