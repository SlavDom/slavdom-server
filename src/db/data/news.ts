import * as mongoose from "mongoose";

export interface INews extends mongoose.Document {
    title: {
        type: string,
        required: true,
    },
    shortText: string,
    fullText: string,
    theme: string,
    createdAt: string,
    updateAt: string,
    commentaries: object,
    createdBy: string,
    languageId: string,
}
