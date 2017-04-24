import * as mongoose from "mongoose";

(mongoose as any).Promise = global.Promise;
mongoose.connect("mongodb://localhost/slavdom");
export default mongoose;
