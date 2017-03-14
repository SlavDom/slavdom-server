import mongoose from '../db';

const Schema = mongoose.Schema;

const translationSchema = new Schema({
    code: String,
    result: String
});

export default translationSchema;
