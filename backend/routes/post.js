const express = require('express')
const router = express.Router();
const Post = require('../models/post')
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');


router.post('/publish',requireLogin,(req,res) =>{
    const {body, pic} = req.body
    if(!body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    req.user.__v = undefined
    const post = new Post({
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save()
    .then(result =>{
        res.json({post:result})
        
    })
    .catch(err=>{
        console.log(err)
    })
})




router.get('/allpost',requireLogin,(req,res) =>{
    Post.find()
        .sort('-createdAt')
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")        
        .then(posts =>{
            res.json({posts})
        })
        .catch(err =>{
            console.log(err)
        })
})

router.post('/mypost',requireLogin,(req,res) =>{
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .then(mypost =>{
            res.json({mypost})
        })
        .catch(err =>{
            console.log(err)
        })
})

router.delete('/deletepost/:postId',requireLogin,(req,res) =>{
    Post.findOne({_id:req.params.postId})
        .populate("postedBy","_id name")
        .exec((err,post) =>{
            if(err || !post){
                return res.status(422).json({error:err})
            }
            if(post.postedBy._id.toString() === req.user._id.toString()){ 
                post.remove()
                .then(result =>{
                    res.json({result})
                })
                .catch(error => console.log(error))
            }
        })
})

router.get('/allpost2',(req,res) =>{
    Post.find().sort('-createdAt')
                .then(posts =>{
                    console.log(posts)
                res.json({posts})
                })
            .catch(err =>{
            console.log(err)
             })
})


module.exports = router