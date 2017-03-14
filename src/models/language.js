import mongoose from '../mongoose';
import translationSchema from './translation';

const Schema = mongoose.Schema;

const schema = new Schema({
    code: {
        type: Number,
        required: true
    },
    translations: [translationSchema]
});

const Language = mongoose.model('Language', schema);
export default Language;
