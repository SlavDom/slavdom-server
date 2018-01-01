import * as mongoose from "mongoose";
import {Commentary} from "./Commentary";
import {ObjectID} from "bson";

export interface News extends mongoose.Document {
  id: ObjectID | null;
  title: {
    type: string,
    required: true,
  };
  shortText: string;
  fullText: string;
  theme: string;
  createdAt: string;
  updateAt: string | null;
  commentaries: Commentary[];
  createdBy: string;
  languageId: ObjectID;
}
