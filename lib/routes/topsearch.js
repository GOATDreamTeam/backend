const { Router } = require('express');
const TopSearch = require('../models/TopSearch');


module.exports = Router ()
  .post('/', (req, res, next) => {
    TopSearch
      .create(req.body)
      .then(data => res.send(data))
      .catch(next);
  })

// still working on this 
  .get('/images', (req, res, next) => {
    TopSearch
      .select({
        image_url: true
      })
      .then(data => res.send(data))
      .catch(next);
  })
  
// this is the route for autocomplete feature in the front end 

  .get('/', (req, res, next) => {
    TopSearch()
      .find({
        $or: [
          { common_name: new RegExp(req.query.search, 'i') },
          { scientific_name: new RegExp(req.query.search, 'i') }
        ]
      })
      .then(data => res.send(data))
      .catch(next);
  });
