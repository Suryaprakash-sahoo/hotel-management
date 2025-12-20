const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js')

const router = express.Router();

//User Registration
router.post('/register', async(req , res)=>{
    const{username, email, password, confirmPassword} = req.body;
    try {
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({message: 'Username already exists'});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message: 'Email already registered'});
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: 'Passwords do not match'});
        }

        if(password.length < 8){
            return res.status(400).json({message: 'Password must be at least 8 characters long'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
           
        });
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
})

//UserLogin
router.post('/login', async(req , res)=> {
    const {email, password} = req.body;
    try {

        console.log('Login attempt for email:', email);

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({Message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({Message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({token});
        console.log('User logged in:', user);
        console.log('JWT Token:', token);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
})

//UserLOgout route
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,      // set true if using HTTPS
      sameSite: "lax",    // must match your login cookie
      path: "/"           // VERY IMPORTANT
    });

    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;