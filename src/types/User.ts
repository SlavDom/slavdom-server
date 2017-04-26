import * as mongoose from "mongoose";
import {ObjectID} from "bson";

export interface User extends mongoose.Document {
  id: ObjectID;
  username: string;
  passwordDigest: string;
  email: string;
  phone: string;
  name: string;
  surname: string;
  patronymic: string;
  nation: string;
  nativeLang: string;
  city: string;
  timezone: string;
  registeredAt: Date;
  loggedAt: Date;
  role: number;
}

export interface UserData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  timezone: string;
}

export interface UserError {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  timezone?: string;
}
