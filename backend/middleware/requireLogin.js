const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (req,res,next) =>{
    const {authorization} = req.headers; //req.headers works on key-value pair
    if(!authorization){
        return res.status(401).json({error:'You must be logged in'})
    }
    //athorization contains a Bearer_space and a token.
    const token = authorization.replace("Bearer ",""); // in order to access just the token
    jwt.verify(token,JWT_SECRET,(err,payload) =>{ // callback error and payload
        if(err){
            return res.status(401).json({error:'You must be logged in'})
        }else{
            const {_id} = payload // the actual data of the user
            User.findById(_id)
                .then(userdata =>{
                    req.user = userdata, // if we want to access the name, email etc of the user
                    next();
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    })
}