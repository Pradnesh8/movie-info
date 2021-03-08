const router = require('express').Router();
const { registerValidation } = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', async(req, res) => {
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

module.exports = router;