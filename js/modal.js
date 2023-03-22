const modalS=document.querySelector(".modal_s");
const modalU=document.querySelector(".modal_u");
const modalA=document.querySelector(".modal_a");

function createList(sua){
   if(newList.length==0){newList=recipesList}
   let myList=[];
   let tempList=[];
   if(sua=='s'){
     for (let i = 0; i < newList.length; i++) {
       tempList=tempList.concat(newList[i].ingredients.map(x => x.ingredient));
       }
    }
    if(sua=='u'){
        for (let i = 0; i < newList.length; i++) {
           tempList=tempList.concat(newList[i].ustensils);
          }
    }
    if(sua=='a'){
        for (let i = 0; i < newList.length; i++) {
           tempList.push(newList[i].appliance);
          }
    }
    return myList=[...new Set(tempList)];
}

function openModal(sua){
    let ListToDisplay=createList(sua);
    console.log(ListToDisplay);
}