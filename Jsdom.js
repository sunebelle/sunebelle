// way 1
//const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

//  way 2  : let jsdom = require('jsdom').JSDOM,

// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const { document } = (new JSDOM(`...`)).window;
// const $ = require( "jquery" )( window );
// const $ = require('jquery');/

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );


uri = 'views/home.ejs',
options = {
    runScripts: 'dangerously',
    resources: "usable"
};
JSDOM.fromFile(uri, options).then(  dom => {
    dom.window.document.querySelector("h1").innerHTML="Hello world";
    const txt = dom.window.document.querySelector("h1").textContent;

}).catch (e => console.log(e));



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


// $(document).keypress(function(event){
//     $("h1").text(event.key);
//     console.log(event.key);
// });


// $("button").click(function(){
//     $("h1").css("color","red");
// });

// $(document).ready(function(){
//      document.getElementsByClassName("animation").innerHTML = "Hello world";
//     alert("Hello world");
//     $("h1.animation").hide();
//     $("h1.animation").css("color", "red");
// })


// const dom = new JSDOM(
//     `<h1 class="animation">Hi, Good morning!</h1>`,
//     { includeNodeLocations: true }
//   );
//   console.log(dom.window.document.querySelector("h1").textContent);



 
// the file I will be loading
uri = 'views/home.ejs',
 
// the options that I will be giving to jsdom
options = {
    runScripts: 'dangerously',
    resources: "usable"
};
 
// load from an external file
JSDOM.fromFile(uri, options).then(  dom => {
 
    // let window = dom.window,
    // document = window.document;
 
    // console.log(dom.window.document.querySelectorAll('h1')[0].innerHTML);
    // console.log(document.querySelectorAll('h1')[0].innerHTML);
  console.log(dom.window.document.querySelector("h1").textContent);
  // $("h1").css("color","red");

    // console.log(dom.serialize());
 
}).catch (e => console.log(e));


  
 