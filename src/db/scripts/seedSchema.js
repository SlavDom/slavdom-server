import Language from '../models/languageModel';

const languageSeed = require('../seeders/language.json');

languageSeed.forEach(a => {
    const language = new Language();
    language.create(a);
});

console.log('Database is seeded with initial data.');