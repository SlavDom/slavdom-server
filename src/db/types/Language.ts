import * as mongoose from "mongoose";
import {Translation} from "./Translation";
import {ObjectID} from "bson";

export interface Language extends mongoose.Document {
  id: ObjectID;
  code: string;
  translations: Translation[];
}
