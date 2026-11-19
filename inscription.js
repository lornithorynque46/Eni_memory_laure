
//Fonction de l'input nom pour que l'utilisateur entre un nom contenant au moins 3 caractères
const nameInsc=$("#nom");
const warningName=$("#smallName")

nameInsc.on("input",function(){
  if(nameInsc.val().length<3){
warningName.text("Choisissez un pseudo contenant au moins 3 caractères")
  }else if(nameInsc.val().length>=3) {
    warningName.text("");
  }
  
})

//Fonction de l'input mail
const emailInsc=$("#emailFormInsc");
const warningMail=$("#smallMail")
const regexEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

emailInsc.on("input", function () {
  if (!regexEmail.test(emailInsc.val())) {
    warningMail.text("Rentrez un email valide")
  }else {
    warningMail.text("");
  }
});


//Fonction de l'input mot de passe
