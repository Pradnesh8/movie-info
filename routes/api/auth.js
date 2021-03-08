const router = require('express').Router();
const User = require('../../models/User');
const {registerValidation, loginValidation} = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// @route POST api/auth/register
// @desc Register new user
// @access Public
//Register
router.post('/register', async(req, res) => {
    //Validation
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    
    //Check if user is already registered
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email alrady exists");
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create new user
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        
        //Create and assign token
        const token = jwt.sign({
            id: user._id}, 
            process.env.TOKEN_SECRET,
            {expiresIn:3600},
            (err, token)=>{
                if(err) throw err;
                res.json({
                    token,
                    user:
                        {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                });
            }
        );
        
    //sends header
    //res.header('auth-token',token).send(token);
    }
    catch(err){
        res.status(400).send(err);
    }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
//Login
router.post('/login', async(req,res) => {
    //Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is registered
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email doesn't exists");

    //Check Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password");

    //Create and assign token
    const token = jwt.sign({
        id: user._id}, 
        process.env.TOKEN_SECRET,
        {expiresIn:3600},
        (err, token)=>{
            if(err) throw err;
            res.json({
                token,
                user:
                    {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
            });
        }
    );
    //sends header
    //res.header('auth-token',token).send(token);
});

// @route POST api/auth/user
// @desc Get user data using token
// @access Private
router.get('/user', auth, async(req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user=> res.json(user));
});

module.exports = router;