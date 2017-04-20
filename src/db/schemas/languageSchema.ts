import mongoose from "../db";
import translationSchema from "./translationSchema";

const Schema = mongoose.Schema;

const languageSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  translations: [translationSchema],
});

export default languageSchema;
