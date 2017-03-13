const db = require('../models');

const lang = new db.Language();
const res = lang.drop();

const transl = new db.Translation();
const res2 = transl.drop();

console.log("Tables dropped." );

