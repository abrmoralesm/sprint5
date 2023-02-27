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
    document.querySelector("#textJoke").innerHTML = `" ${chiste} "`;
  } catch (err) {
    console.log(err.message);
  }
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f16094b38276a07cecad67c1e54bf003
    `)
      .then((response) => response.json())
      .then((data) => {
        const weather = data.weather;
        const locate = data.name;
        const weatherDescription = weather[0].description;
        const temperature = Math.round(data.main.temp);
        const celsiusTemperature = (temperature - 273.15).toFixed(0);
        document.getElementById(
          "text-weather"
        ).innerHTML = `Now, at  ${locate}: ${weatherDescription} and ${celsiusTemperature}ºC`;
      });
  });
}
