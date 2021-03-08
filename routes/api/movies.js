const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
//Movie Model
const Movie = require('../../models/Movie');


// @route GET api/movies
// @desc Get all movies
// @access Public
router.get('/', async(req,res) => {
    
    try{
        const movies = await Movie.find().sort({ date: -1 });
        res.json(movies); 
    }
    catch(err){
        res.json({message: err});
    }
});

// @route POST api/movies
// @desc Post movie in Database
// @access Private
router.post('/', auth, async(req,res) => {
    const movie = new Movie({
        title : req.body.title,
        description : req.body.description,
        genre : req.body.genre
    });
    try{
        const savedMovie = await movie.save();
        res.json(savedMovie);
    }
    catch(err){
        res.json({message: err});
    }
});

// @route DELETE api/movies/id
// @desc Delete movie from Database
// @access Private
router.delete('/:id', auth, async(req,res) => {
    Movie.findById(req.params.id)
    .then(movie => movie.remove().then(()=> res.json({success: true})))
    .catch(err => res.status(400).json({success: false}));
});

module.exports = router;