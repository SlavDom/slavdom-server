import * as mongoose from "mongoose";

export interface ITranslation extends mongoose.Document {
  code: string;
  prefix: string[];
  result: string;
}
