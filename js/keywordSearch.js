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


function listSearch(myList,tempSearch){//fusion de toutes les liste de mots-clés pour recherche globale
tempSearch = [...tempSearch, ...ustensilsList, ...applianceList, ...searchWords]; 
    console.log(tempSearch);
highArray = tempSearch               //******   FILTRE DE LA LISTE DES RECETTES CONTRE LES MOTS-CLÉS   ******//
                                     //la liste filtrée (newlist) des recettes contient l'objet recette de la
newList = myList.filter(recip =>     //liste json initiale(myList) si CHAQUE mot-clé de la liste de recherche 
  tempSearch.every(key =>            //est INCLUS dans UN DES mot des listes ingredients OU name OU description OU ustensils OU appliance
      recip.ingredients.map(x=>x.ingredient).some(ingredient => ingredient.toLowerCase().includes(key)) ||
      recip.name.split(' ').some(rName => rName.toLowerCase().includes(key)) ||
      recip.description.split(' ').some(descr => descr.toLowerCase().includes(key)) ||
      recip.appliance.includes(key) ||
      recip.ustensils.some(keyword => keyword.includes(key))
  ))
}