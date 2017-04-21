import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
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
  nonCussing: boolean;
  registeredAt: Date;
  loggedAt: Date;
  role: number;
}
