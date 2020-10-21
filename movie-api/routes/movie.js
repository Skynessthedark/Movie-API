var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');

//Save movie
router.post('/', (req, res, next) => {
  //const {title, category, country, year, imdb_score} = req.body;
  
  const movie = new Movie(req.body);

  const promise = movie.save();

  promise.then((data)=>{
    res.json({status: 1});
  }).catch((err) =>{
    res.json(err);
  });
});

module.exports = router;
