const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');

const movieRoute = require('./routes/api/movies');
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const app = express();

app.use(express.json());

//Routes
app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true , useNewUrlParser: true }, ()=>{
    console.log("DataBase Connected !");
})

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

//SERVER ADDRESS
app.listen(port, () => console.log(`Server started on Port ${port}`));
//app.listen(5000);