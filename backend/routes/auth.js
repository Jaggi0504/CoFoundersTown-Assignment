const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const User = require('../models/user');
const requireLogin = require('../middleware/requireLogin');

router.post('/signup',(req,res) =>{
    const {name, email, password, username} =req.body;
    if(!email || !name || !password || !username){
        res.status(422).json({error:"Please fill all the fields"})
    }
    else{
    User.findOne({username:username}) 
        .then((savedUser)=>{
            if(savedUser){
             res.status(422).json({error:'A user with same Username already exists. Please use a different Username'})
            } else {
                bcrypt.hash(password, 12)
                        .then(hashedPassword =>{
                            const user1 = new User({
                                name,
                                email, 
                                username, 
                                password:hashedPassword
                            }) 
                            user1.save()
                                .then(user =>{
                                    res.status(200).json({msg:'User Added successfully'})
                                })
                                .catch((err)=>{
                                    console.log(err);
                                })
                        })
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
})


router.post('/signin',(req,res) =>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(422).json({error:"Please fill the required fields!"})
    }
    User.findOne({username:username})
        .then(savedUser =>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid Username!!"})
            }
            bcrypt.compare(password, savedUser.password) 
                .then(doMatch =>{
                    if(doMatch){
                        const token = jwt.sign({_id:savedUser._id}, JWT_SECRET) 
                        const {_id, email, name, age} = savedUser 
                        return res.json({token,user:{_id, email, name, age}}) 
                    } else {
                        return res.status(422).json({error:"Invalid Username or password"})
                    }
                })
        })
        .catch(err => console.log(err))
})


module.exports = router