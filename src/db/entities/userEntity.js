import mongoose from '../db';

const Schema = mongoose.Schema;

const schema = new Schema({
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
  native_lang: String,
  city: String,
  non_cussing: Boolean,
  registered_at: Schema.Types.Date,
  logged_at: Schema.Types.Date,
  is_logged: Boolean,
});

const UserEntity = mongoose.model('User', schema);
export default UserEntity;
