const { Router } = require('express');
const { fetchListData, fetchById } = require('../services/fetchCalls');


module.exports = Router ()
  .get('/', (req, res, next) => {
    fetchListData(req.query.plant, req.query.page)
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    fetchById(req.params.id)
      .then(data => res.send(data))
      .catch(next);
  });
