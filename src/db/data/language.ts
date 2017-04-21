import * as mongoose from "mongoose";
import {ITranslation} from "./translation";

export interface ILanguage extends mongoose.Document {
  code: string;
  translations: object[];
}
