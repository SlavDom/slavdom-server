import mongoose from '../db';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: String,
  patronymic: String,
  email: String,
  phone: String,
  username: String,
  nation: String,
  nativeLang: String,
  city: String,
  nonCussing: Boolean,
  registeredAt: Schema.Types.Date,
  loggedAt: Schema.Types.Date,
});

const UserEntity = mongoose.model('User', userSchema);
export default UserEntity;
