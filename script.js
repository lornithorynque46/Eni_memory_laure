//Déclaration d'un tableau d'images
let images = [
  "ressources/memory-legume/1.svg",
  "ressources/memory-legume/2.svg",
  "ressources/memory-legume/3.svg",
  "ressources/memory-legume/4.svg",
  "ressources/memory-legume/5.svg",
  "ressources/memory-legume/6.svg",
];

//On double ce tableau pour avoir deux fois les mêmes images
let imagesDoubles = [
  "ressources/memory-legume/1.svg",
  "ressources/memory-legume/2.svg",
  "ressources/memory-legume/3.svg",
  "ressources/memory-legume/4.svg",
  "ressources/memory-legume/5.svg",
  "ressources/memory-legume/6.svg",
];

//On concatène les deux tableaux
let allImages = images.concat(imagesDoubles);
console.log(allImages);

//fonction de mélange des cartes (algorithme Fisher-Yates)
function shuffleImages(allImages) {
  for (let i = allImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
  }
  return allImages;
}

//On lance la fonction mélange
let imagesShuffled = shuffleImages(allImages);
console.log(imagesShuffled);

let joueur = "joueur 1";
let partieFinie = false;
let pairesTrouvees = 0;
let nbreCoup = 0;
let premiere = null;

//fonction principale du jeu
const cartes = $("td img");
function game() {
  const numero = cartes.index(this);

console.log(cartes.index(premiere), numero);
  if ($(this).attr("src") != "ressources/question.svg") return;
  retourner(this,imagesShuffled[numero])
  
  if (premiere === null) {
    premiere = this;
    return;
  //} else if ($(premiere).attr("src") === $(this).attr("src")) {
  } else if (imagesShuffled[cartes.index(premiere)] === imagesShuffled[numero]) {
    console.log("paire trouvée");
    pairesTrouvees++;
    if(pairesTrouvees===images.length){
      $(".texteFlou").text("Bravo vous avez gagné!")
      $(".texteFlou").addClass("visible");
    }
  
  } else {
    let carte1 = premiere;
    let carte2 = this;
    setTimeout(() => {
      retourner(carte1, "ressources/question.svg");
      retourner(carte2, "ressources/question.svg");
    }, 2000);
    
  }
  premiere = null;
}

//lancement de la fonction jeu
cartes.on("click", game);


//fonction permettant de retourner les cartes
function retourner(carte,nouveauSRC){
$(carte).addClass("aplatie")
setTimeout(()=>{
  carte.src = nouveauSRC;
 ($(carte).removeClass("aplatie"))
},300);

}

