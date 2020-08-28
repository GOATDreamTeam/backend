require('dotenv').config();
const fetch = require('node-fetch');

const fetchListData = (plant, page) => {
  return fetch(`https://trefle.io/api/v1/species/search?token=${process.env.API_KEY}&q=${plant}&page=${page}`)
    .then(res => res.json())
    .then(({ data, meta }) => ({
      totalPages: Math.ceil(meta.total / 20),
      data: data.map(item => ({
        id: item.id,
        image_url: item.image_url,
        common_name: item.common_name,
        scientific_name: item.scientific_name
      }))
    }));
};

const fetchById = (id) => {
  return fetch(`https://trefle.io/api/v1/species/${id}?token=${process.env.API_KEY}`)
    .then(res => res.json())
    .then(({ data }) => ({
      image_url: data.image_url,
      common_name: data.common_name,
      scientific_name: data.scientific_name,
      genus: data.genus,
      family: data.family,
      edible: data.edible,
      vegetable: data.vegetable,
      flower_images: data.images.flower,
      leaf_images: data.images.leaf,
      habit_images: data.images.habit,
      fruit_images: data.images.fruit,
      bark_images: data.images.bark,
      intro_distributions: data.distributions.introduced,
      native_distributions: data.distributions.native 
    })); 
};

// fetchById(114644).then(console.log);
//into_distributions and native_distributions are an array of objects.  Need to map through those to return just the values of name and species-count (better on front-end?).  Will send name to locationIQ to return the lat/lon so that I can use those values to render a map of the world, using one color for native and another for introduced.  Super stretch to visualize the species_count.  In the case of the above fetchById(114644), intro_distributions is undefined, not null.  Check in about this.

module.exports = {
  fetchListData,
  fetchById
};
