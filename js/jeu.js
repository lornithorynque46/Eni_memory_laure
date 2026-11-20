//Déclaration d'un tableau d'images
let images = [
  "../ressources/memory-legume/1.svg",
  "../ressources/memory-legume/2.svg",
  "../ressources/memory-legume/3.svg",
  "../ressources/memory-legume/4.svg",
  "../ressources/memory-legume/5.svg",
  "../ressources/memory-legume/6.svg",
];

//On double ce tableau pour avoir deux fois les mêmes images
let imagesDoubles = [
  "../ressources/memory-legume/1.svg",
  "../ressources/memory-legume/2.svg",
  "../ressources/memory-legume/3.svg",
  "../ressources/memory-legume/4.svg",
  "../ressources/memory-legume/5.svg",
  "../ressources/memory-legume/6.svg",
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

let occupe = false;
let pairesTrouvees = 0;
let nbreCoup = 0;
let premiere = null;

//fonction principale du jeu
const cartes = $("td img");
function game() {
  //Si le verrou est activé on ne pourra pas cliquer sur une carte supplémentaire
  if (occupe) return;
  const numero = cartes.index(this);
  //On ne peut pas cliquer sur une carte qui a déjà été retournée
  if ($(this).attr("src") != "../ressources/question.svg") return;
  //Lancement de la fonction retourner pour que le point d'interrogation laisse place à un légume
  retourner(this, imagesShuffled[numero]);
  //La première carte retournée ne vaut rien au début puis elle prend la valeur de la carte cliquée
  if (premiere === null) {
    premiere = this;
    return;
  }
  //On incrémente le nombre de coup chaque fois que deux cartes ont été retournées et on l'affiche
  nbreCoup++;
  $("#nbreDeCoups").text(nbreCoup);
  //On compare deux cartes,si elles sont identiques les images restent en place et une paire est trouvée
  if (imagesShuffled[cartes.index(premiere)] === imagesShuffled[numero]) {
    pairesTrouvees++;
    //Si toutes les paires sont trouvées, la partie est gagnée
    if (pairesTrouvees === images.length) {
      $(".texteFlou").text("Bravo vous avez gagné!");
      //On ajoute une classe au texte pour faire un effet à l'apparition
      $(".texteFlou").addClass("visible");
    }
  } else {
    //On garde en mémoire les deux cartes retournées
    let carte1 = premiere;
    let carte2 = this;
    //On active le verrou quand deux cartes différentes ont été retournées, pour ne pas pouvoir cliquer sur une 3ème carte en attendant qu'elles se retournent
    occupe = true;
    //On laisse un délai d'une seconde avant que les cartes ne se retournent à nouveau
    setTimeout(() => {
      retourner(carte1, "../ressources/question.svg");
      retourner(carte2, "../ressources/question.svg");
      //Quand les deux deux cartes sont à nouveau retournées (face point d'interrogation), on désactive le verrou
      occupe = false;
    }, 1000);
  }
  //Premiere reprend sa valeur de départ
  premiere = null;
}

//lancement de la fonction jeu
cartes.on("click", game);

//fonction permettant de retourner les cartes
function retourner(carte, nouveauSRC) {
  $(carte).addClass("aplatie");
  setTimeout(() => {
    carte.src = nouveauSRC;
    $(carte).removeClass("aplatie");
  }, 300);
}

//Fonction de réinitialisation
//on ajoute un écouteur sur la barre d'espace
document.addEventListener("keydown", (event) => {
  //si l'événement correspond bien à la barre d'espace
  if (event.code === "Space") {
    //On empêche son comportement par défaut (défilement vers le bas)
    event.preventDefault();
    //On réinitialise tous les paramètres
    nbreCoup = 0;
    $("#nbreDeCoups").text(nbreCoup);
    imagesShuffled = shuffleImages(allImages);
    premiere = null;
    pairesTrouvees = 0;
    cartes.each((index, carte) => {
      carte.src = "../ressources/question.svg";
      $(carte).removeClass("aplatie");
    });
  }
});




