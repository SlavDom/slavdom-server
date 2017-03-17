import mongoose from '../db';

const Schema = mongoose.Schema;

const commentarySchema = new Schema({
  text: String,
  rating: Number,
  timestamp: Schema.Types.Date,
  published_by: Schema.Types.ObjectId,
  published_on: Schema.Types.ObjectId,
});

export default commentarySchema;
