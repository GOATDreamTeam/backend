const { Router } = require('express');
const fetchData = require('../services/fetchCalls');


module.exports = Router ()
  .get('/', (req, res, next) => {
    fetchData()
      .find({
        $or: [
          { common_name: new RegExp(req.query.search, 'i') },
          { scientific_name: new RegExp(req.query.search, 'i') }
        ]
      })
      .then(data => res.send(data))
      .catch(next);
  });
