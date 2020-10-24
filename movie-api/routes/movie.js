var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');

//List all movies
router.get('/', (req, res)=>{
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});
//List Top10 Movies
router.get('/top10', (req, res)=>{
  const promise = Movie.find({ }).limit(10).sort({imdb_score: 1});

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
})

//Get a specific movie by id
router.get('/:movie_id', (req, res, next) => {
  const movie_id = req.params.movie_id;
	const promise = Movie.findById(movie_id);

	promise.then((movie) => {
		console.log(movie);
		if (!movie)
			next({ message: 'The movie was not found.', code: 99 });
		res.json(movie);
	}).catch((err) => {
		res.json(err);
	});
});

//Save a new movie
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

//Update a movie
router.put('/:movie_id', (req, res)=>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new: true
    });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

//Movie deletion
router.delete('/:id', (req, res)=>{
  const promise = Movie.findByIdAndRemove(req.params.id);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

//Get Movie Between A and B years
router.get('/between/:start_year/:end_year', (req, res, next)=>{
  const promise = Movie.find(
    {
      year: { "$gte": parseInt(req.params.start_year), "$lte": parseInt(req.params.end_year)}
    }  
  );

  promise.then((data)=>{
    if(!data){
      next({message: "There is no movie in given interval.", code: 11});
    }
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

module.exports = router;
