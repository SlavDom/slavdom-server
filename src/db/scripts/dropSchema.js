import db from '../db';

db.connection.dropDatabase((err) => {
    if (err) throw err;
    console.log('Database was dropped.');
    require('./createSchema');
    require('./seedSchema');
});