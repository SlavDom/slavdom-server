import mongoose from '../db';
import translationSchema from './translationEntity';

    const Schema = mongoose.Schema;

    const schema = new Schema({
        code: {
            type: String,
                required: true
        },
    translations: [translationSchema]
});

const LanguageEntity = mongoose.model('Language', schema);
export default LanguageEntity;