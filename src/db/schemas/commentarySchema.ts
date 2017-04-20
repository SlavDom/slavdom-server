import mongoose from "../db";

const Schema = mongoose.Schema;

const commentarySchema = new Schema({
  text: String,
  rating: Number,
  timestamp: Schema.Types.Date,
  publishedBy: Schema.Types.ObjectId,
});

export default commentarySchema;
