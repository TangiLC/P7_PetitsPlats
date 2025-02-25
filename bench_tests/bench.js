//fichier de test contenant tous les scripts

//cardDOM_factory.js  **************************************************************************

function cardDOM(elem){
    let cardId=elem.id;
    let cardTitle=elem.name;
    let cardTime=elem.time;
    let cardIngredients=elem.ingredients;
    let cardDescription=elem.description;
    let keywords=elem.keywords;
    let bgImg =elem.artwork[0]; 
    let bgcoltype = elem.artwork[1]; 
    let mainImg=elem.artwork[2];
    let ingredInnerHTML="";
    
    
    
    const articleCard = document.createElement("article");
    articleCard.setAttribute("class","card_content");
    
    const cardImg = document.createElement("div");
    cardImg.setAttribute("class",`card_img bg${bgcoltype}`);
    cardImg.style.backgroundImage="url('../data/images/"+bgImg+"')";
    cardImg.innerHTML=`<img src='../data/images/${mainImg}' height='200px' width='200px'>`;
    articleCard.appendChild(cardImg);
    
    const innerTitle = document.createElement("div");
    innerTitle.setAttribute("class","title_row")
    articleCard.appendChild(innerTitle);
    
    const titleName = document.createElement("div");
    titleName.setAttribute("class","card_title tag_check");
    titleName.textContent = cardTitle;
    innerTitle.appendChild(titleName);
    
    const titleTime = document.createElement("div");
    titleTime.setAttribute("class","card_time");
    titleTime.innerHTML ="<i class='fa-regular fa-clock'></i>&nbsp;"+cardTime+" min";
    innerTitle.appendChild(titleTime);
    
    const innerContent = document.createElement("div");
    innerContent.setAttribute("class","content_row");
    articleCard.appendChild(innerContent);
    
    const innerLeft = document.createElement("ul");
    for (let j=0; j<cardIngredients.length; j++){
        ingredInnerHTML+="<li class='tag_check'><span>"+cardIngredients[j].ingredient+"</span>";
        if (cardIngredients[j].hasOwnProperty('quantity')){ingredInnerHTML+=" : "+cardIngredients[j].quantity}
        if (cardIngredients[j].hasOwnProperty('unit')){ingredInnerHTML+=cardIngredients[j].unit}
        ingredInnerHTML+="</li>";
    }
    innerLeft.innerHTML=ingredInnerHTML;
    innerLeft.setAttribute("class","inner_left");
    innerContent.appendChild(innerLeft);
    
    const innerRight = document.createElement("div");
    innerRight.textContent = cardDescription.slice(0,175)+"...";
    innerRight.setAttribute("class","inner_right tag_check");
    innerContent.appendChild(innerRight);
    
    return articleCard;
    }
    
//modal_factory.js *****************************************************************************

function createModal(sua,list,mssge){
    
    const modal=document.createElement('article');
    modal.setAttribute('class',`color_${sua}`);

    const modalTitle=document.createElement('div');
    modalTitle.setAttribute('class',`modal_${sua}`);
    modal.appendChild(modalTitle);

    const TitleMssg=document.createElement('div');
    TitleMssg.setAttribute('class','modal_title');
    TitleMssg.innerText=mssge;
    modalTitle.appendChild(TitleMssg);

    const TitleArrow=document.createElement('div');
    TitleArrow.setAttribute('onclick',`closeModal('${sua}')`);
    TitleArrow.innerHTML="<i class='fa-solid fa-angle-up'></i>";
    modalTitle.appendChild(TitleArrow);

    const modalContent=document.createElement('div');
    modalContent.setAttribute('class',`modalcontent_${sua}`);
    modal.appendChild(modalContent);
        
    for (let i=0; i<list.length; i++){
       const baliseA=document.createElement('a');
       baliseA.setAttribute("onclick",`addTagOnclick('${sua}','${list[i]}')`);
       baliseA.innerText=list[i];
       modalContent.appendChild(baliseA);
    }

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
  var result = [];
    while(a.length > 0 && b.length > 0){  
   if      (a[0] < b[0] ){ a.shift(); }
   else if (a[0] > b[0] ){ b.shift(); }
   else {result.push(a.shift());b.shift();}
}
return result;}
//Fonction de fusion de toutes les sources de mots (name, description, ingredients) et création
//de la liste filtrée (newList) des résultats selon entrées utilisateur (tempSearch)
function fusionList(myList,tempSearch){    
let  start = new Date().getTime();
tempSearch = [...tempSearch, ...ustensilsList, ...applianceList, ...searchWords];              
console.log(tempSearch);                                                                                               
highArray = tempSearch;                                                                                 
newList =[];                                                                                   
let listWords=[];


if (radioButton.checked ==true) {      //CETTE FONCTION POUR L'ALGO 1 #############
  for (let i=0;i<myList.length;i++){
    listWords=[];
    listWords[0] = myList[i].appliance;
    let listDescript = superSplit(myList[i].description);
    let listName = superSplit(myList[i].name);
   
    for (let j=0; j<myList[i].ustensils.length;j++){
      listWords.push(myList[i].ustensils[j]);}
   
    for (let j=0; j<myList[i].ingredients.length;j++){
      if (myList[i].ingredients[j].hasOwnProperty('ingredient')) {
        let ingred= superSplit(myList[i].ingredients[j].ingredient);
        if (ingred.length==1){listWords.push(ingred)}
        else if (ingred.length>1){listWords=listWords.concat(ingred)};
      }
    }
    listWords =[...listWords, ...listDescript, ...listName];
    listWords =[... new Set(listWords)];
    let listresults=[];
    for (let k=0; k<tempSearch.length;k++){
      let subList=[];
      for(let j=0;j<listWords.length;j++){
         if(listWords[j].includes(tempSearch[k])){subList.push(myList[i]); console.log(myList[i].name)}
    }
    listresults[k]=subList; console.log(k,listresults[k]);
  }
    if (listresults.length>1){
       for (let k=0; k<listresults.length;k++){listresults[k]=[... new Set(listresults[k])]}
       for (let k=1; k<listresults.length;k++)
      {newList=intersection(listresults[0],listresults[k])}}
    else {newList=listresults[0]}      
  }
  
  newList =[... new Set(newList)];
}
else {                               //CETTE FONCTION POUR L'ALGO 2 ##############
  for (let i=0;i<myList.length;i++){console.log(myList[i].name,myList[i].keywords)};
  newList = myList.filter(recip =>                                                     
    tempSearch.every(key =>           
      recip.keywords.some(keyword => keyword.includes(key)) ||
      recip.appliance.includes(key) ||
      recip.ustensils.some(keyword => keyword.includes(key))
    )
  )
  
}
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



fetch('recipes.json')                          
  .then(function (recipes) {
    if (recipes.status !== 200) {
      console.log('Problem. Status Code: ' + recipes.status);
      return;
    }

    recipes.json().then(function (list) { 
        
        
        if (radioButton.checked ==true) {recipesList = list }   //******* CETTE LIGNE POUR L'ALGO 1 *******/
        else {recipesList=createKeywordList(list) }             //******* CETTE LIGNE POUR L'ALGO 2 *******/
        datasearch.addEventListener('input',function() {

           
          filterDisplay(recipesList,datasearch.value)})     

        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

