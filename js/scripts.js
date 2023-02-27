let chiste;
const receive = [];

const showButtons = () =>document.querySelectorAll("[buttonScore]").forEach(button => button.style.display = "block");
   
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
