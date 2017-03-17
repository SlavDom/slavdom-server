import mongoose from '../db';
import translationSchema from './translationEntity';

const Schema = mongoose.Schema;

const schema = new Schema({
  language_id: {
    type: Schema.Types.ObjectId,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  translations: [translationSchema],
}, {
  autoIndex: false,
});


const LanguageEntity = mongoose.model('Language', schema);

export default LanguageEntity;
