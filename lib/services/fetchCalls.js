require('dotenv').config();
const fetch = require('node-fetch');

const fetchData = async() => {
  const response = await fetch(`https://trefle.io/api/v1/plants?token=${process.env.API_KEY}`);
  const json = await response.json();
  console.log(json);
  return json; 

};

const fetchData2 = () => {
  return fetch(`https://trefle.io/api/v1/plants?token=${process.env.API_KEY}`)
    .then(res => res.json());
};

module.exports = {
  fetchData,
  fetchData2
};

