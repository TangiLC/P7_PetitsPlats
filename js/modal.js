const modalS=document.querySelector(".modal_s");
const modalU=document.querySelector(".modal_u");
const modalA=document.querySelector(".modal_a");

function createList(sua){
   let myList=[];
   let tempList=[];
   if(sua=='s'){
     for (let i = 0; i < recipesList.length; i++) {
       tempList=tempList.concat(recipesList[i].ingredients.map(x => x.ingredient));
       }
    }
    if(sua=='u'){
        for (let i = 0; i < recipesList.length; i++) {
           tempList=tempList.concat(recipesList[i].ustensils);
          }
    }
    if(sua=='a'){
        for (let i = 0; i < recipesList.length; i++) {
           tempList.push(recipesList[i].appliance);
          }
    }
    return myList=[...new Set(tempList)];
}

function openModal(sua){
    let ListToDisplay=createList(sua);
    console.log(ListToDisplay);
}