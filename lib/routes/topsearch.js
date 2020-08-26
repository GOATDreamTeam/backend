const { Router } = require('express');
const TopSearch = require('../models/TopSearch');


module.exports = Router ()
  .put('/', (req, res, next) => {
    TopSearch
      .findOneAndUpdate({ scientific_name: req.body.scientific_name }, { ...req.body, $inc: { incrementCounter: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true })
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/images', (req, res, next) => {
    TopSearch
      .find()
      .select({
        image_url: true
      })
      .limit(100) // change if needed 
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    TopSearch
      .find({
        $or: [
          { common_name: new RegExp(req.query.search, 'i') },
          { scientific_name: new RegExp(req.query.search, 'i') }
        ]
      })
      .sort({ incrementCounter: 1 })
      .limit(7) // change if needed
      .then(data => res.send(data))
      .catch(next);
  });
