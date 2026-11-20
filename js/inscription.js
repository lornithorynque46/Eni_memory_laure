//Fonction de l'input nom pour que l'utilisateur entre un nom contenant au moins 3 caractères
const nameInsc = $("#nom");
const warningName = $("#smallName");

nameInsc.on("input", function () {
  if (nameInsc.val().length < 3) {
    warningName.text("Choisissez un pseudo contenant au moins 3 caractères");
  } else {
    warningName.text("");
  }
});

//Fonction de l'input mail: le format doit être celui contenu dans le regex
const emailInsc = $("#emailFormInsc");
const warningMail = $("#smallMail");
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

emailInsc.on("input", function () {
  if (!regexEmail.test(emailInsc.val())) {
    warningMail.text("Rentrez un email valide");
  } else {
    warningMail.text("");
  }
});

//Fonction de l'input mot de passe
const red = $("#rouge");
const orange = $("#orange");
const yellow = $("#jaune");
const green = $("#vert");
const invalide = $("#invalide");
const faible = $("#faible");
const moyen = $("#moyen");
const fort = $("#fort");
const mdpInsc = $("#mdpFormInsc");
const regexMdp = /^(?=.*\d)(?=.*[a-z])(?=.*[^\w\s]).{6,}$/;

//Fonction de remise à zero des indicateurs
function resetIndicateurs() {
  red.css("visibility", "hidden");
  invalide.text("");
  orange.css("visibility", "hidden");
  faible.text("");
  yellow.css("visibility", "hidden");
  moyen.text("");
  green.css("visibility", "hidden");
  fort.text("");
}

mdpInsc.on("input", function () {
  //On repart à zero à chaque saisie
  resetIndicateurs();
  if (mdpInsc.val().length === 0) return;
  //la ligne s'affiche rouge (invalide) si les conditions ne sont pas respectées
  if (mdpInsc.val().length < 6 || !regexMdp.test(mdpInsc.val())) {
    red.css("visibility", "visible");
    invalide.text("invalide");
  }
  //la ligne s'affiche orange si les conditions sont respectées mais que le mot de passe est faible(moins de 8 caractères)
  if (mdpInsc.val().length >= 6 && regexMdp.test(mdpInsc.val())) {
    orange.css("visibility", "visible");
    faible.text("faible");
  }
  //la ligne s'affiche jaune si les conditions sont respectées et le mot de passe contient moins de 10 caractères
  if (mdpInsc.val().length >= 8 && regexMdp.test(mdpInsc.val())) {
    yellow.css("visibility", "visible");
    moyen.text("moyen");
  }
  //la ligne s'affiche jaune si les conditions sont respectées et le mot de passe contient plus de 10 caractères
  if (mdpInsc.val().length >= 10 && regexMdp.test(mdpInsc.val())) {
    green.css("visibility", "visible");
    fort.text("fort");
  }
});

//Confirmation du mot de passe
const mdpVerif = $("#mdpVerif");
let mdpOK = false;

mdpVerif.on("input", function () {
  if (mdpVerif.val() === mdpInsc.val()) {
    mdpOK = true;
    console.log("mdp ok");
  }
});

//Mise des données de l'utilisateur dans le local storage
localStorage.setItem("name", nameInsc.val());
localStorage.setItem("email", emailInsc.val());
localStorage.setItem("mdp", mdpInsc.val());
//Récupération de ces données
$(".validate").on("click", function () {
  localStorage.setItem("name", nameInsc.val());
  localStorage.setItem("email", emailInsc.val());
  localStorage.setItem("mdp", mdpInsc.val());
});
