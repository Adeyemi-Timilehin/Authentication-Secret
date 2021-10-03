//jshint esversion:6
require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const app=express();
const mongoose=require('mongoose');
const md5 = require("md5"); 
app.use(express.static("public"))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true}))
app.get("/",(req,res)=>{
    res.render("home")
})
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true})
const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

const User=new mongoose.model('User',userSchema);
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
console.log(md5(4567));
app.post("/register",(req,res)=>{
    const newUser=new User({
        email:req.body.username,
        password:md5(req.body.password)
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else {
            res.render("secrets")
        }
    })
})
app.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=md5(req.body.password);
    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        }
        else {
            if(foundUser){
                if(foundUser.password===password){
                    res.render("secrets");
                }
            }
        }
    })
})
app.listen(3000,function(){
    console.log("Listening on"+3000);
})