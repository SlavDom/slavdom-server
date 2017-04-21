import * as mongoose from "mongoose";
import {ObjectID} from "bson";

export interface Commentary extends mongoose.Document {
  id: ObjectID;
  text: string;
  rating: number;
  leaveDate: string;
  publishedBy: ObjectID;
}
