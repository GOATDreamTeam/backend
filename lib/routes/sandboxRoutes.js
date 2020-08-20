const { Router } = require('express');
const { fetchData2 } = require('../services/fetchCalls');


module.exports = Router ()
  .get('/', (req, res, next) => {
    fetchData2()
      .then(data => res.send(data))
      .catch(next);
  });
