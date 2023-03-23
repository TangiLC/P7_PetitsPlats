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
    let message="";
    let target="";
    if (sua=='s'){
        target=document.querySelector('#ingredients');
        message="Rechercher un ingrédient";}
    if (sua=='u'){
        target=document.querySelector('#ustensiles');
        message="Ajout Ustensile";}
    if (sua=='a'){
        target=document.querySelector('#appareils');
        message="Ajout Appareil";}
    console.log(ListToDisplay);
    target.innerHTML="";
    target.appendChild(createModal(sua,ListToDisplay,message));

}

function closeModal(sua){
    let ListToDisplay=createList(sua);
    if (sua='s'){
        let message="ingredients <a onclick='openModal('s')'><i class='fa-solid fa-angle-down'></i></a>";
        document.querySelector('#ingredients').innerHTML=message;
        }
    if (sua='u'){
        let message="appareils <a onclick='openModal('a')'><i class='fa-solid fa-angle-down'></i></a>";
        document.querySelector('#ustensiles').innerHTML=message;}
    if (sua='s'){
        let message="ustensiles <a onclick='openModal('u')'><i class='fa-solid fa-angle-down'></i><a>";
        document.querySelector('#appareils').innerHTML=message;}
        
    console.log(ListToDisplay);
}

/*


*/
