const express= require('express');
const bodyParser = require ("body-parser");
const app = express ();
const mongoose = require ("mongoose");
const ejs = require ("ejs");
//lodash - same font of queries/ redis (search), qs, axios, cheerio, jsdom


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://admin-sunebelle:sunebelle@cluster0.le5y7.mongodb.net/sunebelleDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const postSchema = new mongoose.Schema({
    topic: String,
    topicIntro: String,
    title: String,
    content: String,
    file: String,
    time : { type : Date, default: Date.now }
});
const Post = mongoose.model('post', postSchema);  



app.get("/", (req,res) => {
    Post.find({}, (err, posts) =>{
        if (err) throw err;
        res.render("home", {post: posts});
    })
})

app.get("/about", (req,res) =>{
    res.render("about");
})
app.get("/compose", (req,res) =>{
    res.render("compose");
})
app.post("/compose", (req,res) =>{
    const post = new Post({
    topic: req.body.topic,
    topicIntro: req.body.topicIntro,
    title: req.body.title,
    content: req.body.content,
    file: req.body.imgFiles,
    });
    post.save( (err) =>{
        if (err) throw err;
        res.redirect("/");
        // console.log(post);
        // console.log(post.time.getDate());
        // console.log(post.time.getMonth());
    });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, ()=> console.log("The server is listening on the port 3000"));