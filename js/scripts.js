let chiste;
const receive = [];

const showButtons = () => document.querySelectorAll("[buttonScore]").forEach(button => button.style.display = "block");

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






const infoWeather = async () => {
  let infoMeteo;
  try {
    const resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.3888&lon=2.159&appid=f16094b38276a07cecad67c1e54bf003");
    const dates = await resposta.json();
    infoMeteo = dates.weather[0].description;
  } catch (err) {
    console.log(err.message);
  }
  document.querySelector("#text-weather").innerHTML = infoMeteo;
}
infoWeather();