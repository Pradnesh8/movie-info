const axios = require('axios');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
//Movie Model
const Movie = require('../../models/Movie');
const { response } = require('express');


// @route GET api/movies/:email
// @desc Get all movies added in Watchlist
// @access Private
router.get('/:email', auth, async (req, res) => {
    try {
        //console.log(req.params.email);
        //ADD QUERY TO FIND MOVIES HAVING SAME USER_ID
        const movies = await Movie.find({ email: req.params.email }).sort({ date: -1 });
        res.json(movies);
    }
    catch (err) {
        res.json({ message: err });
    }
});


// @route POST api/movies
// @desc Post movie in Database
// @access Private router.post('/', auth, async(req,res)
router.post('/', auth, async (req, res) => {
    const movie = new Movie({
        email: req.body.email,
        movie_id: req.body.movie_id,
        title: req.body.title,
        poster: req.body.poster
    });
    try {
        const savedMovie = await movie.save();
        res.json(savedMovie);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// @route DELETE api/movies/id
// @desc Delete movie from Database
// Later access Private router.delete('/:id', auth, async(req,res)
// access Public
router.delete('/:id&:email', auth, async (req, res) => {
    Movie.findOne({ "movie_id": req.params.id, "email": req.params.email })
        .then(movie => movie.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(400).json({ success: false }));
});

// @route GET api/movies/details/id&email
// @desc GET movie details from Database
// Later access Private router.get('/:id', auth, async(req,res)
// access Public
router.get('/details/:id&:email', async (req, res) => {
    var details = null;
    //console.log(req.params.email);
    await axios
        .get("https://www.omdbapi.com/?apikey=f91ce485&plot=full&i=" + req.params.id)
        .then(response => {
            details = response.data;
        })
        .catch(err => {
            console.log(err);
        });
    try {
        //const MovieDetails = await Movie.findOne({movie_id: req.params.id});
        const MovieDetails = await Movie.findOne({ "movie_id": req.params.id, "email": req.params.email });
        //res.json(MovieDetails);
        if (MovieDetails) {
            //console.log("Watchlisted");
            details.isAdded = "true";
            res.json(details);
        }
        else {
            //console.log("NOT Watchlisted");
            details.isAdded = "false";
            res.json(details);
        }
    }
    catch (err) {
        res.json({ message: err });
    }
});

// @route GET api/movies/get_recommendations/title
// @desc GET movie recommendations
// access Public
// router.get('/get_recommendations/:title', async(req,res) => {
//     var movie_list = null;
//     //console.log(req.params.email);
//     await axios
//         .get('http://127.0.0.1/api/get_movies?movies='+req.params.title)
//         .then(response =>{
//             movie_list = response.data;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     //console.log(movie_list);
//     try{
//         const MovieDetails=[];
//         //console.log(res.data)
//         if(movie_list.length===0){
//             res.json(MovieDetails);
//         }
//         else{
//             for (let index = 0; index < movie_list.length; index++) {
//                 await axios
//                         .get('https://www.omdbapi.com/?apikey=f91ce485&t='+movie_list[index])
//                         .then(response=> MovieDetails.push(response.data))
//             }
//             res.json(MovieDetails);
//         }
//     }
//     catch(err){
//         res.json({message:err});
//     }    
// });

// @route POST api/movies/get_recommendations
// @desc GET movie recommendations
// access Public
// router.post('/get_recommendations', async (req, res) => {
//     var movie_list = req.body.movie_list;
//     //console.log(movie_list);
//     await axios
//         .get('http://127.0.0.1/api/get_movies?movies=' + movie_list.toString())
//         .then(response => {
//             movie_list = response.data;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     //console.log(movie_list);
//     try {
//         const MovieDetails = [];
//         //console.log(res.data)
//         if (movie_list.length === 0) {
//             res.json(MovieDetails);
//         }
//         else {
//             for (let index = 0; index < movie_list.length; index++) {
//                 await axios
//                     .get('https://www.omdbapi.com/?apikey=f91ce485&t=' + movie_list[index])
//                     .then(response => MovieDetails.push(response.data))
//             }
//             res.json(MovieDetails);
//         }
//     }
//     catch (err) {
//         res.json({ message: err });
//     }
// });

module.exports = router;