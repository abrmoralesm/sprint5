"use strict";
let chiste;
const receive = [];

const showButtons = () =>
  document
  .querySelectorAll("[buttonScore]")
  .forEach((button) => (button.style.display = "block"));

const receiveJoke = async () => {
  try {
    const answer = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const json = await answer.json();
    chiste = json.joke;
    console.log(`Accudit: ${chiste}`);

  } catch (err) {
    console.log(err.message);
  }
  document.querySelector("#textJoke").innerHTML = `" ${chiste} "`;
  showButtons();
};

const receiveJoke2 = async () => {
  try {
    const answer = await fetch("https://api.chucknorris.io/jokes/random");
    const json = await answer.json();
    chiste = json.value;
    console.log(`Accudit Chuck: ${chiste}`);
  } catch (err) {
    console.log(err.message);
  }
  document.querySelector("#textJoke").innerHTML = `" ${chiste} "`;
  showButtons();
};

const randomJoke = () => {
  const buttonJoke = document.querySelector(".button-joke");
  buttonJoke.innerText = "Another Joke";
  const random = parseInt(Math.random() * 10);
  console.log(`Random: ${random}`);
  if (random < 5) receiveJoke();
  else receiveJoke2();
  blobRandom(random);
}

function score(num) {
  const report = {
    joke: chiste,
    score: num,
    date: new Date().toISOString(),
  };
  receive.push(report);
  console.table(receive);
}
const weatherText = document.getElementById("text-weather");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f16094b38276a07cecad67c1e54bf003`);
          const data = await response.json();
          document.querySelector(".img-weather").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          weatherText.innerHTML = `${(data.main.temp - 273.15).toFixed(0)}`;
        } catch (err) {
          console.log(err.message);
        }
      },
      function (error) {
        console.log(error.message);
      }
  );
}



const setBlobBackgroundImage = (selector, randomNumber) => {
  const number = randomNumber % 10;
  document.querySelector(selector).style.backgroundImage = `url(./img/blob-${number}.svg)`;
};

const blobRandom = (random) => {
  setBlobBackgroundImage(".blob-high", random);
  setBlobBackgroundImage(".blob-small-up", random + 1);
  setBlobBackgroundImage(".blob-small-down", random + 2);
};