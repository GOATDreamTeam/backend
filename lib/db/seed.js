const chance = require('chance').Chance();
const TopSearch = require('../../lib/models/TopSearch');

module.exports = async({ queries = 100 } = {}) => {
  await TopSearch.create([...Array(queries)].map(() => ({
    plantID: chance.integer(),
    common_name: chance.word(),
    scientific_name: chance.word(),
    incrementCounter: chance.integer({ min: 1, max: 100 })
  })));
};
