"use strict";
let chiste;
const receive = [];

const showButtons = () =>
  document
    .querySelectorAll("[buttonScore]")
    .forEach((button) => (button.style.display = "block"));

const randomJoke = () => {
  const random = Math.random();
  console.log(`Ramdom Joke: ${random}`);
  if (random < 0.5) receiveJoke();
  else receiveJoke2();
};

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
    document.querySelector("#textJoke").innerHTML = `" ${chiste} "`;
  } catch (err) {
    console.log(err.message);
  }
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
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f16094b38276a07cecad67c1e54bf003`
        );
        const data = await response.json();
        const weather = data.weather;
        const locate = data.name;
        const weatherDescription = weather[0].description;
        const temperature = Math.round(data.main.temp);
        const celsiusTemperature = (temperature - 273.15).toFixed(0);
        weatherText.innerHTML = `Now, at  ${locate}: ${weatherDescription} and ${celsiusTemperature}ºC`;
      } catch (err) {
        console.log(err.message);
      }
    },
    function (error) {
      console.log(error.message);
    }
  );
}
