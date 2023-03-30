const datasearch = document.querySelector('.main_input')

let searchWords = []        //liste globale des mots recherchés antérieurs
let ustensilsList = []      //liste globale des mots recherchés dans ustensils
let applianceList = []      //liste globale des mots recherchés dans appliances
let newList = []            //liste (json) des recettes triées
let highArray = []          //liste des mots-clés à mettre en évidence

function clickInput(){      //simuler la touche entrée lors du click
  if (datasearch.value.length > 2){
    addTagInList();}
  listSearch(recipesList,datasearch.value)
  displayCardDOM(newList)              
  highlight(highArray)
}

function addTagInList(){
  searchWords.push(datasearch.value.toLowerCase());
  searchWords=[...new Set(searchWords)];            //ajout de l'input utilisateur dans la liste  
  //datasearch.removeEventListener('keydown', function () {})  //des mots-clés sans doublon
  datasearch.placeholder = 'affiner la recherche';
  setTimeout((datasearch.value = ''), 500);
  displayCardDOM(newList);
  highlight(highArray);
}

function filterDisplay (myList, val) {
   
  if (val.length > 2) {     //filtre de la liste lorsque la saisie utilisateur >2
    let tempSearch = [val.toLowerCase()]

    datasearch.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 && datasearch.value.length > 2) {
        addTagInList();
      }
    })
    listSearch(myList,tempSearch);
  }
  displayCardDOM(newList)               //Mise à jour de l'affichage
  highlight(highArray)
}


function listSearch(myList,tempSearch){      //CETTE FONCTION POUR L'ALGO 1 #############
  let  start = new Date().getTime();
  tempSearch = [...tempSearch, ...ustensilsList, ...applianceList, ...searchWords];              
  console.log(tempSearch);                                                                                               
  highArray = tempSearch;                                                                                 
  newList =[];                                                                                   
  let listWords=[];
  
  
  
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
      //console.log(myList[i].name,listWords);
      if (tempSearch.every(key =>listWords.includes(key))){newList.push(myList[i])}
    }
    
    newList =[... new Set(newList)];
  }