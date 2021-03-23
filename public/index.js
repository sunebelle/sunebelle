const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let i = 0;
let txt = "";

$(function greeting() {
  let date = new Date();

  if (date.getHours() < 12) {
    txt = "Hi, Good Morning!";
    $("h3.question").text("Hope you have a good day!");
  } else if (date.getHours() < 18) {
    txt = "Hi, Good Evening!";
    $("h3.question").text("Taking a walk around is awesome");
  } else {
    txt = "Hi, Good Night!";
    $("h3.question").text("Reading book is a good habit");
  }

  if (i < txt.length) {
    document.getElementById("animation").innerHTML += txt.charAt(i);
    i++;
    setTimeout(greeting, 80);
  }
});

function getTime() {
  let date = new Date();

  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let items = [year, month, day, hours, minutes, seconds];
  let value = document.querySelectorAll("h3.get-time");
  $("p.get-time").text(`${hours}:${minutes}`);

  function format(e) {
    if (e < 10) return `0${e}`;
    return e;
  }
  value.forEach((v, index) => {
    v.innerHTML = format(items[index]);
  });

  setInterval(getTime, 1000);
}

getTime();
