//fichier de test contenant tous les scripts

//cardDOM_factory.js  **************************************************************************

function cardDOM(elem){
    
    
    const articleCard = document.createElement("article");
    articleCard.setAttribute("class","card_content");
    
    
    return articleCard;
    }
    
//modal_factory.js *****************************************************************************

function createModal(sua,list,mssge){
    
    const modal=document.createElement('article');
    modal.setAttribute('class',`color_${sua}`);

return modal;    
}

// utils.js *************************************************************************

function isAlphanumeric (str) {        
    return /^[a-zÀ-ÿ-()%/ ]+$/.test(str);
  }
  
  function isSmallWord (str) {           
    let testArray = ['une','les','que','aux','peu','des','sur','pas','est','vos','pour','tout',
      'faire','avant','avec','ainsi','vous','par','puis','plus','votre','dans','elle','aussi','après']
    return testArray.includes(str.slice(1));
  }
  
  function moreThanThree (myList) {    
    let returnedList = []
    if (myList.length > 0) {
      for (let i = 0; i < myList.length; i++) {  
        let tempString = 'z' + myList[i].toLowerCase();
        if (tempString.length > 3) {
          if (!isAlphanumeric(tempString)) {          
            tempString = tempString.slice(0, -1)}     
          if (!isSmallWord(tempString)) {             
            returnedList.push(tempString.slice(1) + ' ')}
          }}}
    return returnedList;
  }
  
  
  function superSplit (str) {               
    let ssplit = str.toLowerCase().split('(').join(',').split(')').join(',').split(' ').join(',')
          .split('.').join(',').split("'").join(',').split('-').join(',').split(',');
    return ssplit;
  }
  
  function highlight (arr) {                     
    const tagCheck = document.querySelectorAll('.tag_check');
    tagCheck.forEach(function (elem) {
      for (let i = 0; i < arr.length; i++) {
        let tempStr = elem.innerHTML;            
        let Arr = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
        if (arr[i] != 'span'&& arr[i] !='spa'){  
          elem.innerHTML = tempStr.replaceAll(
            `${arr[i]}`,`<span class='highlight'>${arr[i]}</span>`);
          tempStr = elem.innerHTML;               
          elem.innerHTML = tempStr.replaceAll(
            `${Arr}`,`<span class='highlight'>${Arr}</span>`);
        }}})                              
  }
  
  function addTag (clas, val) {                 
    const tagButton = document.createElement('a');
    tagButton.setAttribute('onclick', `deleteTag('${clas}','${val}')`);
    tagButton.setAttribute('class', `color_${clas} tag_button`);
    tagButton.innerHTML = `<p>${val.slice(0,14)}${val.length>14?'...':''}</p><i class="fa-regular fa-circle-xmark"></i>`;
    return tagButton;
  }
  
  function addTagOnclick (sua, mystring) {      
    const tagList = document.getElementById('tagList');
    tagList.appendChild(addTag(sua, mystring));
    if (sua == 's') {
      searchWords.push(mystring.toLowerCase());  
      searchWords=[...new Set(searchWords)]}     
    if (sua == 'u') {
      ustensilsList.push(mystring);
      ustensilsList=[...new Set(ustensilsList)]}
    if (sua == 'a') {
      applianceList.push(mystring);
      applianceList=[...new Set(applianceList)]}
    filterDisplay(recipesList, '...');
    ;['s', 'u', 'a'].forEach(el => closeModal(el));  
    openModal(sua);
  }
  

// modal.js  *********************************************************************************

    
const modalS=document.querySelector(".modal_s");
const modalU=document.querySelector(".modal_u");
const modalA=document.querySelector(".modal_a");

function verifDouble(tlist,in_us_apList){    
  for (let j=0;j<searchWords.length;j++){
    let indx=tlist.indexOf(searchWords[j]);
    if (indx!=-1){
      in_us_apList.push(searchWords[j]);
      searchWords.splice(j,1);
      tlist.splice(indx,1);
      filterDisplay(newList,'...');
  }}
  return tlist;
}

function createList(sua){                        
    let listFunnel=[]
   if(newList.length==0){listFunnel=recipesList}        
    else{listFunnel=newList}
   let myList=[];
   let tempList=[];
   if(sua=='s'){
     for (let i = 0; i < listFunnel.length; i++) {      
       tempList=tempList.concat(listFunnel[i].ingredients.map(x => x.ingredient));}
       tempList= verifDouble(tempList,searchWords);
       tempList= tempList.filter(ingredient => ingredient.toLowerCase().includes(datasearch.value));
    }
    if(sua=='u'){
        for (let i = 0; i < listFunnel.length; i++) {   
           tempList=tempList.concat(listFunnel[i].ustensils);}
           tempList= verifDouble(tempList,ustensilsList);
    }
    if(sua=='a'){
        for (let i = 0; i < listFunnel.length; i++) {   
           tempList.push(listFunnel[i].appliance);}
           tempList= verifDouble(tempList,applianceList);
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
        message="Rechercher :"+datasearch.value;}
    if (sua=='u'){
        target=document.querySelector('#ustensiles');
        message="Ajout Ustensile";}
    if (sua=='a'){
        target=document.querySelector('#appareils');
        message="Ajout Appareil";}
    target.innerHTML="";
    target.style.height="425px";                       
    document.querySelector(".card_grid").style.top="-395px";    
    target.appendChild(createModal(sua,ListToDisplay,message));
    if(sua=='s'){
        let gridCol=document.querySelector(".modalcontent_s");
        if (ListToDisplay.length < 15){                         
            gridCol.style.gridTemplateColumns='1fr';            
            gridCol.style.width='240px';}
        if (ListToDisplay.length >= 15 && ListToDisplay.length < 30){
            gridCol.style.gridTemplateColumns='1fr 1fr';
            gridCol.style.width='480px';}
        if (ListToDisplay.length >=30) {gridCol.style.gridTemplateColumns='1fr 1fr 1fr'}
    }console.log(ListToDisplay.length);
}

function closeModal(sua){                     
    let ListToDisplay=createList(sua);
    let target="";                            
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
    
    if (appare.style.height==''&&
        ustens.style.height==''&&
        ingred.style.height==''){    
        document.querySelector(".card_grid").style.removeProperty("top");}                           
    target.innerHTML=message;                                         
}


// keywordSearch.js  *******************************************************************************************

const datasearch = document.querySelector('.main_input');
const radioButton = document.getElementById('algo1');

let searchWords = []        //liste globale des mots recherchés antérieurs
let ustensilsList = []      //liste globale des mots recherchés dans ustensils
let applianceList = []      //liste globale des mots recherchés dans appliances
let newList = []            //liste (json) des recettes triées
let highArray = []          //liste des mots-clés à mettre en évidence

function clickInput(){      //simuler la touche entrée lors du click
  if (datasearch.value.length > 2){
    addTagInList();}
  fusionList(recipesList,datasearch.value)
  displayCardDOM(newList)              
  highlight(highArray)
}

function addTagInList(){
  searchWords.push(datasearch.value.toLowerCase());
  searchWords=[...new Set(searchWords)];           
  
  datasearch.placeholder = 'affiner la recherche';
  setTimeout((datasearch.value = ''), 500);
  displayCardDOM(newList);
  highlight(highArray);
}

function filterDisplay (myList, val) {
  openModal('s'); 
  if (val.length > 2) {     
    let tempSearch = [val.toLowerCase()]

    datasearch.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 && datasearch.value.length > 2) {
        addTagInList();
        closeModal('s');
      }
    })
    fusionList(myList,tempSearch);
  }

  displayCardDOM(newList);               
  highlight(highArray);
  
}

function createKeywordList (list) {       
  for (let i = 0; i < list.length; i++) { 
    let words = ['...']
    
    for (let j = 0; j < list[i].ingredients.length; j++) {
      if (list[i].ingredients[j].hasOwnProperty('unit')) {
        words.push(list[i].ingredients[j].unit)}
    }
    words = words.concat(moreThanThree(list[i].ingredients.map(x => x.ingredient)));
    words = words.concat(moreThanThree(superSplit(list[i].name)));
    words = words.concat(moreThanThree(superSplit(list[i].description)));

    words.sort();
    let keyWords = [...new Set(words)];
    list[i]['keywords'] = keyWords;
  }
  return list
}


function intersection(a, b){
    var ai=0, bi=0;
    var result = [];
    while( ai < a.length && bi < b.length )
    {
       if      (a[ai] < b[bi] ){ ai++; }
       else if (a[ai] > b[bi] ){ bi++; }
       else /* they're equal */
       {
         result.push(a[ai]);
         ai++;
         bi++;
       }
    }
    return result;
  }

function getId(ids,list){
  let returnList=[];
  for( let i in list){
    for( let j in ids){
    if(list[i].id==ids[j]){returnList.push(list[i])}
  }}
  return returnList;
}


//Fonction de fusion de toutes les sources de mots (name, description, ingredients) et création
//de la liste filtrée (newList) des résultats selon entrées utilisateur (tempSearch)
function fusionList(myList,tempSearch){    
let  start = new Date().getTime();
tempSearch = ['lait','oeuf','sucre','beurre'];              
console.log(tempSearch);                                                                                               
highArray = tempSearch;                                                                                 
newList =[];                                                                                   
let listWords=[];
let listresults=[];

//CETTE FONCTION POUR L'ALGO 1 ###################################################################

  for (let k in tempSearch){          //boucle dans les mots recherchés
    let tempResult=[];
    for (let i in myList){            //boucle dans chaque recette 0 à 49
      listWords=[];
      listWords=(myList[i].keywords);
      listWords.push(myList[i].appliance);
           
      for (let j=0; j<myList[i].ustensils.length;j++){
        listWords.push(myList[i].ustensils[j]);}
  
      listWords =[... new Set(listWords)];
      console.log(listWords);
      
        listresults[k]=[];
        for(let j=0;j<listWords.length;j++){           //boucle dans les mots-clés de la recette i
           if(listWords[j].includes(tempSearch[k])){tempResult.push(myList[i].id);
            }
        }
      
      if (tempResult.length>0){tempResult=[... new Set(tempResult)];
        listresults[k]=tempResult.sort(function(a,b){return a-b})}
      }
    }
      console.log('list',listresults);
      let idList=[];
      if (listresults.length>1){idList=listresults[0];
        for (let k=0; k<listresults.length;k++){listresults[k]=[... new Set(listresults[k])]}
        for (let k=1; k<listresults.length;k++){idList=intersection(idList,listresults[k])}}
     else {idList=listresults[0]}      
    
    newList =getId(idList,recipesList);
    newList =[... new Set(newList)];



let end = new Date().getTime();          
console.log((end - start)*10 + ' ms');    //******* calcul du temps de réponse  *****/
document.querySelector('#results').innerText=`temps de traitement: (${(end-start)}ms)`;          
}


// displayDOM.js  *****************************************************************

const mainForm=document.querySelector(".main_form");
const cardGrid= document.getElementById("cardGrid"); 
const tagList= document.getElementById("tagList");
const recipNb= document.getElementById("recipNb");

let recipesList=[];

function tagLoop(sua,list){           
  for(let i=0;i<list.length;i++){
    tagList.appendChild(addTag(sua,list[i]));
  }
}


function deleteTag(val,item){           
  if(val=='s'){
      let indx=searchWords.indexOf(item);
      searchWords.splice(indx,1);
      }
  if(val=='a'){
      let indx=applianceList.indexOf(item);
      applianceList.splice(indx,1);
      }
  if(val=='u'){
      let indx=ustensilsList.indexOf(item);
      ustensilsList.splice(indx,1);
      }
  ['s','u','a'].forEach((e) => closeModal(e));
  filterDisplay(recipesList,'...');            
}

function displayCardDOM(myList){
    tagList.innerHTML="";                      

    tagLoop('s',searchWords);
    tagLoop('a',applianceList);
    tagLoop('u',ustensilsList);
    
    cardGrid.innerHTML="";                     
    if (myList.length==0){recipNb.innerText="Aucune recette à proposer.";
      datasearch.placeholder="Votre saisie ne permet d'afficher aucune fiche recette !";
      cardGrid.appendChild(cardDOM(
          { "id": 33, "name" : "Aucune Recette",
            "ingredients": [{"ingredient" : "aucune"},{"ingredient" : "recette"},],
            "time": ":(",
            "description": "Votre saisie ne permet d'afficher aucune fiche recette. Vous pouvez chercher ⟪ tarte aux pommes ⟫, ⟪ poisson ⟫, etc",
            "keywords":["aucun résultat"],
            "artwork":["None.png","soup","None.svg"]
        }))}
    else {let a=myList.length;
    for (let i=0; i<a;i++){
      recipNb.innerText=`Nous avons ${a} recette${a==1?'':'s'} à vous proposer`;
      cardGrid.appendChild(cardDOM(myList[i]));

        }
    }
}


recipesList=createKeywordList(myrecipes);         