const modalS=document.querySelector(".modal_s");
const modalU=document.querySelector(".modal_u");
const modalA=document.querySelector(".modal_a");

function createList(sua){
    let listFunnel=[]
   if(newList.length==0){
    listFunnel=recipesList}
    else{listFunnel=newList}
   let myList=[];
   let tempList=[];
   if(sua=='s'){
     for (let i = 0; i < listFunnel.length; i++) {
       tempList=tempList.concat(listFunnel[i].ingredients.map(x => x.ingredient));
       }
    }
    if(sua=='u'){
        for (let i = 0; i < listFunnel.length; i++) {
           tempList=tempList.concat(listFunnel[i].ustensils);
          }
    }
    if(sua=='a'){
        for (let i = 0; i < listFunnel.length; i++) {
           tempList.push(listFunnel[i].appliance);
          }
    }
    return myList=[...new Set(tempList)];
}

function openModal(sua){
    let ListToDisplay=createList(sua);
    console.log(ListToDisplay);
}