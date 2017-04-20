import mongoose from '../db';
import commentarySchema from './commentarySchema';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortText: String,
  fullText: String,
  theme: String,
  createdAt: String,
  updateAt: String,
  commentaries: [commentarySchema],
  createdBy: Schema.Types.ObjectId,
  languageId: Schema.Types.ObjectId,
});

export default newsSchema;
