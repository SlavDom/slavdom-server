import * as mongoose from "mongoose";
import {ObjectID} from "bson";

export interface Translation extends mongoose.Document {
  id: ObjectID;
  code: string;
  prefix: string[];
  result: string;
}
