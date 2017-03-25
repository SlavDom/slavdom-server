import db from '../db';
import seedData from './seedSchema';

export default function dropAndSeedSchema() {
  db.connection.dropDatabase((err) => {
    if (err) throw err;
    console.log('Database was dropped.');
  }).then(() => {
    console.log('Database is created.');
    seedData().then(() => {
      console.log('Database is seeded with initial data.');
    });
  });
}
