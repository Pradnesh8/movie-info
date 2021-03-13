const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    movie_id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Movies', MovieSchema);