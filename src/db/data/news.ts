import * as mongoose from "mongoose";
import {Commentary} from "./Commentary";
import {ObjectID} from "bson";

export interface News extends mongoose.Document {
  id: ObjectID;
  title: {
    type: string,
    required: true,
  };
  shortText: string;
  fullText: string;
  theme: string;
  createdAt: string;
  updateAt: string;
  commentaries: Commentary[];
  createdBy: string;
  languageId: ObjectID;
}
