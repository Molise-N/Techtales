const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "./config.env"})

let postRoutes = express.Router()
//retrieve all
//http://localhost:3000/posts
postRoutes.route("/posts").get(verifyToken,async (request, response)=>{
    let db = database.getDb();
    let data = await db.collection("posts").find({}).toArray();
    if(data.length > 0){
        response.json(data)
    }else{
        throw new Error("data was not found :(");
    }
});
//retrieve a single post
//http://localhost:3000/posts
postRoutes.route("/posts/:id").get(verifyToken, async (request, response)=>{
    let db = database.getDb();
    let data = await db.collection("posts").findOne({_id: new ObjectId(request.params.id)});
    if(Object.keys(data).length > 0){
        response.json(data)
    }else{
        throw new Error("data was not found :(");
    }
});

//Create new post
//http://localhost:3000/posts
postRoutes.route("/posts").post(verifyToken, async (request, response)=>{
    let db = database.getDb();
    let mongoObject ={
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.body.user._id,
        dateCreated: request.body.dateCreated,
        imageId: request.body.imageId
    }
    let data = await db.collection("posts").insertOne(mongoObject);
    //for sake of consistency will just return something after creating post
    response.json(data)
});
//Update
//http://localhost:3000/posts
postRoutes.route("/posts/:id").put(verifyToken, async (request, response)=>{
    let db = database.getDb();
    let mongoObject ={
        $set: {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: request.body.dateCreated,
            imageId: request.body.imageId
        }
    }
    let data = await db.collection("posts").updateOne({_id: new ObjectId(request.params.id)},mongoObject);
    //for sake of consistency will just return something after creating post
    response.json(data);
});
//delete a single post
//http://localhost:3000/posts
postRoutes.route("/posts/:id").delete(verifyToken, async (request, response)=>{
    let db = database.getDb();
    let data = await db.collection("posts").deleteOne({_id: new ObjectId(request.params.id)});    
    response.json(data)
    
});

function verifyToken(request,response, next){
    const authHeaders = request.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if(!token){
        return response.status(401).json({message : "Authentication token is missing"})
    }  
    jwt.verify(token, process.env.SECRETKEY, (error,user)=>{
        if(error){
            return response.status(403).json({message : "Invalid token"})
        }
        request.body.user = user
        next()
    })

}

module.exports = postRoutes