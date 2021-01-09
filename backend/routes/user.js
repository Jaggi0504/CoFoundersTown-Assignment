const express = require('express')
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/user');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const { route } = require('./post');

router.get('/user/:id',requireLogin,(req,res) =>{
    User.findOne({_id:req.params.id})
        .select("-password")
        .then(user =>{
            Post.find({postedBy:req.params.id}) 
                .populate("postedBy","_id name")
                .exec((err,posts) =>{ 
                    if(err){
                        return res.status(422).json({error:err})
                    }else{
                        return res.status(200).json({user,posts})
                    }
                })
        })
        .catch(err =>{
            return res.status(404).json({error:"User not found"})
        })
})

module.exports = router;