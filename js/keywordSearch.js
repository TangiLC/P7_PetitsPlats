const datasearch = document.querySelector('.main_input')

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
  searchWords=[...new Set(searchWords)];            //ajout de l'input utilisateur dans la liste  
  //datasearch.removeEventListener('keydown', function () {})  //des mots-clés sans doublon
  datasearch.placeholder = 'affiner la recherche';
  setTimeout((datasearch.value = ''), 500);
  displayCardDOM(newList);
  highlight(highArray);
}

function filterDisplay (myList, val) {
  openModal('s'); 
  if (val.length > 2) {     //filtre de la liste lorsque la saisie utilisateur >2
    let tempSearch = [val.toLowerCase()]

    datasearch.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 && datasearch.value.length > 2) {
        addTagInList();
        closeModal('s');
      }
    })
    fusionList(myList,tempSearch);
  }
  displayCardDOM(newList)               //Mise à jour de l'affichage
  highlight(highArray)
}

function createKeywordList (list) {         //Création de la liste des keywords par recette
  for(let i=0;i<list.length;i++){           // ajout dans le fichier json list.json
    let words = ['...'];                    
    
    list[i].ingredients.forEach(ingred => function(){
      if (ingred.hasOwnProperty('unit')) {
        words.push(ingred.unit);}
      })
    words = words.concat(moreThanThree(list[i].ingredients.map(x => x.ingredient)));
    words = words.concat(moreThanThree(superSplit(list[i].name)));
    words = words.concat(moreThanThree(superSplit(list[i].description)));

    words.sort();
    let keyWords = [...new Set(words)];
    list[i]['keywords'] = keyWords; console.log(keyWords);
  }
  return list
}

function fusionList(myList,tempSearch){//fusion de toutes les liste de mots-clés pour recherche globale
tempSearch = [...tempSearch, ...ustensilsList, ...applianceList, ...searchWords]; 
    
highArray = tempSearch               //******   FILTRE DE LA LISTE DES RECETTES CONTRE LES MOTS-CLÉS   ******//
                                     //la liste filtrée (newlist) des recettes contient l'objet recette de la
newList = myList.filter(recip =>     //liste json initiale(myList) si CHAQUE mot-clé de la liste de recherche 
  tempSearch.every(key =>            //est INCLUS dans UN DES mot de la liste keywords OU liste ustensils OU appliance
      recip.keywords.some(keyword => keyword.includes(key)) ||
      recip.appliance.includes(key) ||
      recip.ustensils.some(keyword => keyword.includes(key))
  ))
}