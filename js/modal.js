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
    myList=[...new Set(tempList)];
    return myList.sort();
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
    target.style.height="450px";
    document.querySelector(".card_grid").style.top="-390px";
    target.appendChild(createModal(sua,ListToDisplay,message));
    if(sua=='s'){
        let gridCol=document.querySelector(".modalcontent_s");
        if (ListToDisplay.length < 15){
            gridCol.style.gridTemplateColumns='1fr'
            gridCol.style.width='260px';}
        if (ListToDisplay.length >= 15 && ListToDisplay.length < 30){
            gridCol.style.gridTemplateColumns='1fr 1fr'
            gridCol.style.width='540px';}
        if (ListToDisplay.length >=30) {gridCol.style.gridTemplateColumns='1fr 1fr 1fr'}
    }console.log(ListToDisplay.length)
    
}

function closeModal(sua){
    let ListToDisplay=createList(sua);
    let target="";
    let message="";
    if (sua=='s'){
        message="Ingredients <a onclick='openModal(`s`)'><i class='fa-solid fa-angle-down'></i></a>";
        target=document.querySelector('#ingredients');
        }
    if (sua=='u'){
        message="Ustensiles <a onclick='openModal(`u`)'><i class='fa-solid fa-angle-down'></i></a>";
        target=document.querySelector('#ustensiles');
        }
    if (sua=='a'){
        message="Appareils <a onclick='openModal(`a`)'><i class='fa-solid fa-angle-down'></i><a>";
        target=document.querySelector('#appareils');
        }
        
    console.log(ListToDisplay);
    document.querySelector(".card_grid").style.removeProperty("top"); 
    target.style.removeProperty("height");
    target.innerHTML=message;

}

/*


*/
