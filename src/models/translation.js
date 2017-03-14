import mongoose from '../mongoose';

const Schema = mongoose.Schema;

const translationSchema = new Schema({
    code: String,
    result: String
});

export default translationSchema;
