const reciveJoke = async()=>{
    try{
        const answer = await fetch("https://icanhazdadjoke.com/", {
            headers: {
              Accept: "application/json",
            },
          });
          const chiste = await answer.json();
          console.log(`Accudit: ${chiste.joke}`);
          document.querySelector("#textJoke").innerHTML=chiste.joke;
                    

    }
    catch(err){
        console.log(err.message);

    }
};