import * as mongoose from "mongoose";

export interface ILanguage extends mongoose.Document {
  code: string;
  translations: object;
}
