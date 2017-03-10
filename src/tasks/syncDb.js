import dbInit from '../db/sequelize/db';
const db = dbInit.init();

db.sequelize.sync({force: true});