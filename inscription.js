const nameInsc=$("#nom");

nameInsc.on("input",function(){
  if(nameInsc.val().length<3){
console.log("entrez au moins 3 caractères")
  }
  
})
