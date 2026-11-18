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

  if ($(this).attr("src") != "ressources/question.svg") return;
  this.src = imagesShuffled[numero];
  if (premiere === null) {
    premiere = this;
    return;
  } else if ($(premiere).attr("src") === $(this).attr("src")) {
    console.log("paire trouvée");
    pairesTrouvees++;
    if(pairesTrouvees===6){
      console.log("gagné")
    }
    console.log(pairesTrouvees)
  } else {
    let carte1 = premiere;
    let carte2 = this;
    setTimeout(() => {
      ((carte1.src = "ressources/question.svg"),
        (carte2.src = "ressources/question.svg"));
    }, 1000);
    console.log("images différentes");
  }
  premiere = null;
}

//lancement de la fonction jeu

cartes.on("click", game);
