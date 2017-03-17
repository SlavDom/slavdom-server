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
  theme: String,
  created_at: String,
  update_at: String,
  commentaries: [commentarySchema],
  created_by: Schema.Types.ObjectId,
  language_id: Schema.Types.ObjectId,
});

const NewsEntity = mongoose.model('News', schema);
export default NewsEntity;
