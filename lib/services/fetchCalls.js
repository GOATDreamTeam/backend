require('dotenv').config();
const fetch = require('node-fetch');


const fetchData = () => {
  return fetch(`https://trefle.io/api/v1/plants?token=${process.env.API_KEY}`)
    .then(res => res.json());
};

module.exports = fetchData;

