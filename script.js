let form = document.querySelector("form");
let pokemonName = document.querySelector("#Pokemon");
let fillingName = document.querySelector("#pokeName");
let fillingType =  document.querySelector("#type");
const meter = document.querySelectorAll("meter");
let stats = document.querySelectorAll("li");
const pokemonDetails = document.querySelector(".pokedetails");
const imgLoc = document.querySelector(".image");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        let pokemonLink = `https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`;

        let response = await fetch(pokemonLink);

        if (!response.ok) {
            imgLoc.innerHTML = "Pokemon not found ❌";
            return;
        }

        let result = await response.json();

        let imgURL = result.sprites.front_default;
        imgLoc.style.backgroundImage = `url(${imgURL})`;   
        fillingName.innerText = result.name; 
           let noOfType = result.types.length;  
           if(noOfType === 2){
        fillingType.innerText = `${result.types[0].type.name} , ${result.types[1].type.name}`   ; 
           }
           else{
               fillingType.innerText = result.types[0].type.name; 
           }

      for (let i = 0; i < 6; i++) {
    let statValue = result.stats[i].base_stat;
    stats[i].innerText = statValue;


    if (meter[i]) {
        meter[i].value = statValue; 
    }
}

    } catch (error) {
        console.log(error);
   alert("Pokemon not found");
    }
});
