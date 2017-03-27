import mongoose from '../db';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordDigest: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  name: String,
  surname: String,
  patronymic: String,
  nation: String,
  nativeLang: String,
  city: String,
  timezone: {
    type: String,
    required: true,
  },
  nonCussing: Boolean,
  registeredAt: {
    type: Date,
    default: Date.now(),
  },
  loggedAt: Schema.Types.Date,
});

export default userSchema;
