const modalS=document.querySelector(".modal_s");
const modalU=document.querySelector(".modal_u");
const modalA=document.querySelector(".modal_a");

function verifDouble(tlist,in_us_apList){    //vérif entre liste entrées utilisateur et tags
  for (let j=0;j<searchWords.length;j++){
    let indx=tlist.indexOf(searchWords[j]);
    if (indx!=-1){
      console.log('trouvé',searchWords[j],indx);
      in_us_apList.push(searchWords[j]);
      searchWords.splice(j,1);
      tlist.splice(indx,1);
      filterDisplay(newList,'...');
  }}
  return tlist;
}

function createList(sua){                  //création de la liste des keywords des modales      
    let listFunnel=[]
   if(newList.length==0){listFunnel=recipesList}        //initialisation si aucune recherche
    else{listFunnel=newList}
   let myList=[];
   let tempList=[];
   if(sua=='s'){
     for (let i = 0; i < listFunnel.length; i++) {      //concat map pour +liste d'objets.key
       tempList=tempList.concat(listFunnel[i].ingredients.map(x => x.ingredient));}
       tempList= verifDouble(tempList,searchWords);
       tempList= tempList.filter(ingredient => ingredient.toLowerCase().includes(datasearch.value));
    }
    if(sua=='u'){
        for (let i = 0; i < listFunnel.length; i++) {   //concat pour +liste d'items
           tempList=tempList.concat(listFunnel[i].ustensils);}
           tempList= verifDouble(tempList,ustensilsList);
    }
    if(sua=='a'){
        for (let i = 0; i < listFunnel.length; i++) {   //push pour +item unique
           tempList.push(listFunnel[i].appliance);}
           tempList= verifDouble(tempList,applianceList);
    }
    myList=[...new Set(tempList)];                      //suppression des doublons
    return myList.sort();
}

function openModal(sua){                               //ouverture de la modale
    let ListToDisplay=createList(sua);
    let message="";                                    //phrase de titre
    let target="";                                     //élément cible du DOM
    if (sua=='s'){
        target=document.querySelector('#ingredients');
        message="Rechercher :"+datasearch.value;}
    if (sua=='u'){
        target=document.querySelector('#ustensiles');
        message="Ajout Ustensile";}
    if (sua=='a'){
        target=document.querySelector('#appareils');
        message="Ajout Appareil";}
    target.innerHTML="";
    target.style.height="425px";                       //agrandissement du cadre position relatif
    document.querySelector(".card_grid").style.top="-395px";    //déplacement des éléments zindex<
    target.appendChild(createModal(sua,ListToDisplay,message));
    if(sua=='s'){
        let gridCol=document.querySelector(".modalcontent_s");
        if (ListToDisplay.length < 15){                         //ajustement largeur de la modale ingrédients
            gridCol.style.gridTemplateColumns='1fr';            //selon le nb d'ingrédients à afficher
            gridCol.style.width='240px'; 
            gridCol.parentElement.style.height='240px';}
        if (ListToDisplay.length >= 15 && ListToDisplay.length < 30){
            gridCol.style.gridTemplateColumns='1fr 1fr';
            gridCol.style.width='480px'; 
            gridCol.parentElement.style.height='340px';}
        if (ListToDisplay.length >=30) {gridCol.style.gridTemplateColumns='1fr 1fr 1fr'}
    }console.log(ListToDisplay.length);
}

function closeModal(sua){                     //fermeture modale. Retour à l'état initial
    let ListToDisplay=createList(sua);
    let target="";                            //élément du DOM
    let message="";
    let ingred =document.querySelector('#ingredients');
    let ustens =document.querySelector('#ustensiles');
    let appare =document.querySelector('#appareils');
    if (sua=='s'){
        message="Ingredients <a onclick='openModal(`s`)'><i class='fa-solid fa-angle-down'></i></a>";
        target=ingred;
        }
    if (sua=='u'){
        message="Ustensiles <a onclick='openModal(`u`)'><i class='fa-solid fa-angle-down'></i></a>";
        target=ustens;
        }
    if (sua=='a'){
        message="Appareils <a onclick='openModal(`a`)'><i class='fa-solid fa-angle-down'></i><a>";
        target=appare;
        }
    target.style.removeProperty("height");
    console.log(appare.style.height,ustens.style.height,ingred.style.height)
    if (appare.style.height==''&&
        ustens.style.height==''&&
        ingred.style.height==''){    
        document.querySelector(".card_grid").style.removeProperty("top");}                           
    target.innerHTML=message;                                         //retour au titre initial
}

