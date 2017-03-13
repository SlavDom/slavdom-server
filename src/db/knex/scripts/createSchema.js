const db = require('../models');

const lang = new db.Language();
const res = lang.init();

console.log("Language: " + res);

const transl = new db.Translation();
const res2 = transl.init();

console.log("Translation: " + res2);