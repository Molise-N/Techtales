const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "./config.env"})


let userRoutes = express.Router()
const SALT_ROUNDS = 6
//retrieve all
//http://localhost:3000/users
userRoutes.route("/users").get(async ( request, response)=>{
    let db = database.getDb();
    let data = await db.collection("users").find({}).toArray();
    if(data.length > 0){
        response.json(data) 
    }else{
        throw new Error("data was not found :(");
    }   
});
//retrieve a single post
//http://localhost:3000/users
userRoutes.route("/users/:id").get(async ( request, response)=>{
    let db = database.getDb();
    let data = await db.collection("users").findOne({_id: new ObjectId(request.params.id)});
    if(Object.keys(data).length > 0){
        response.json(data)
    }else{
        throw new Error("data was not found :(");
    }
});

//Create new post
//http://localhost:3000/users
userRoutes.route("/users").post(async ( request, response)=>{
    let db = database.getDb();

    const takenEmail = await db.collection("users").findOne({email: request.body.email})
    console.log(takenEmail)

    if(takenEmail){
        response.json({message: "the email is taken"})
    }else{
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

        let mongoObject ={
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: []
        }
        let data = await db.collection("users").insertOne(mongoObject);
        //for sake of consistency will just return something after creating post
        response.json(data)
    }

});
//Update
//http://localhost:3000/users
userRoutes.route("/users/:id").put(async ( request, response)=>{
    let db = database.getDb();
    let mongoObject ={
        $set: {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            joinDate: request.body.joinDate,
            posts: request.body.posts
        }
    }
    let data = await db.collection("users").updateOne({_id: new ObjectId(request.params.id)},mongoObject);
    //for sake of consistency will just return something after creating post
    response.json(data);
});
//delete a single post
//http://localhost:3000/users
userRoutes.route("/users/:id").delete(async ( request, response)=>{
    let db = database.getDb();
    let data = await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)});    
    response.json(data)
    
});

//login route
//http://localhost:3000/users
userRoutes.route("/users/login").post(async ( request, response)=>{
    let db = database.getDb();

    const user = await db.collection("users").findOne({email: request.body.email})
    
    if(user){
        let confirmation = await bcrypt.compare(request.body.password,user.password)
        if(confirmation){
            const token = jwt.sign(user, process.env.SECRETKEY,{expiresIn: "1h"})
            response.json({success: true, token})
        }else{
            response.json({success: false, message: "Incorrect Password"})
        }

    }else{
        response.json({success: false, message: "user was not found"})
    }


});

module.exports = userRoutes