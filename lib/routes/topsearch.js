const { Router } = require('express');
const TopSearch = require('../models/TopSearch');


module.exports = Router ()
  .post('/', (req, res, next) => {
    TopSearch
      .create(req.body)
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    TopSearch
      .find(req.query)
      .then(data => res.send(data))
      .catch(next);
  }
  );
