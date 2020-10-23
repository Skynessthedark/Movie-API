const express = require('express');
const router = express.Router();

//Model
const Director = require('../models/Director');

//list all directors
router.get('/', (req, res)=>{
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind:{
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

//new director
router.post('/', (req, res)=>{
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

//get a specific director
router.get('/:id', (req, res)=>{
    const promise = Director.findById(req.params.id);
    promise.then((data)=>{
        res.json(data);
    }).then((err)=>{
        res.json(err);
    });
});


module.exports = router;