const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);