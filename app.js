const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const { document } = (new JSDOM(`...`)).window;
const $ = require( "jquery" )( window );
// const $ = require('jquery');
const express= require('express');
const bodyParser = require ("body-parser");
const app = express ();
const mongoose = require ("mongoose");
const ejs = require ("ejs");
const date = new Date();
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
//lodash - same font of queries, redis (search), qs, 

const dom = new JSDOM(`<!DOCTYPE html>hello`);
dom.serialize() === "<!DOCTYPE html><html><head></head><body>hello</body></html>";

// $(document).ready( function greeting(){
//     let i = 0;
//     if (date.getHours() < 12){
//         const txt ="Hi, Good Morning" ;
//         if (i < txt.length) {
//             document.getElementsByClassName("animation").innerHTML += txt.charAt(i);
//             i++;
//             setTimeout(greeting, 50);
//           }
//         $("h3.question").text("Hope you have a good day");

//     } else if (date.getHours() < 18){
//         const txt ="Hi, Good Evening" ;
//         if (i < txt.length) {
//             document.getElementsByClassName("animation").innerHTML += txt.charAt(i);
//             i++;
//             setTimeout(greeting, 50);
//           }
//         $("h3.question").text("Hope you enjoyed the day");
//     } else {
//         const txt ="Hi, Good Night" ;
//         if (i < txt.length) {
//             document.getElementsByClassName("animation").innerHTML += txt.charAt(i);
//             i++;
//             setTimeout(greeting, 50);
//           }
//         $("h3.question").text("Reading a book for fun is good");
//     }
// });

$(document).ready(function(){
    //  document.getElementsByClassName("animation").innerHTML = "Hello world";
    // alert("Hello world");
    $("h1.animation").hide();
})


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/sunebelleDB', {useNewUrlParser: true, useUnifiedTopology: true});
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
        const getMonth = month[date.getMonth()]; 
        res.render("home", {post: posts, date:date, month:getMonth });
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
        console.log(post.time.getDate());
        console.log(post.time.getMonth());
    });
});




app.listen(3000, ()=> console.log("The server is listening on the port 3000"));