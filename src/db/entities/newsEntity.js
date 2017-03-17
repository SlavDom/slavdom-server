import mongoose from '../db';
import commentarySchema from './commentaryEntity';

const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  short_text: String,
  full_text: String,
  theme: Number,
  commentaries: [commentarySchema],
});

const NewsEntity = mongoose.model('News', schema);
export default NewsEntity;
