import mongoose from "../db";

const Schema = mongoose.Schema;

const translationSchema = new Schema({
  code: String,
  prefix: String,
  result: String,
});

export default translationSchema;
