import * as mongoose from "mongoose";
import {ObjectID} from "bson";
import {Input} from "./Input";
import {Dictionary} from "lodash";

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

export interface UserSignupData {
  username: Input;
  email: Input;
  password: Input;
  passwordConfirmation: Input;
  timezone: Input;
}

export interface UserSignupErrors extends Dictionary<string|undefined> {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  timezone?: string;
}

export interface UserSigninData {
  identifier: string;
  password: string;
}

export interface UserSigninErrors {
  identifier?: string;
  password?: string;
}
