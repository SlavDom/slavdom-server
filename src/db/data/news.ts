import * as mongoose from "mongoose";

export interface INews extends mongoose.Document {
  title: string;
  shortText: string;
  fullText: string;
  theme: string;
  createdAt: string;
  updateAt: string;
  commentaries: object;
  createdBy: string;
  languageId: string;
}
