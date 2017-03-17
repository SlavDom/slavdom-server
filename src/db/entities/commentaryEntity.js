import mongoose from '../db';

const Schema = mongoose.Schema;

const commentarySchema = new Schema({
  text: String,
  rating: Number
});

export default commentarySchema;
