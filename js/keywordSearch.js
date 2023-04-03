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
  openModal('s'); 
  if (val.length > 2) {     //filtre de la liste lorsque la saisie utilisateur >2
    let tempSearch = [val.toLowerCase()]

    datasearch.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 && datasearch.value.length > 2) {
        addTagInList();
      }
    })
    fusionList(myList,tempSearch);
  }
  displayCardDOM(newList)               //Mise à jour de l'affichage
  highlight(highArray)
}

function intersection(a, b){            //comparaison de liste et return éléments identiques
  var ai=0, bi=0;
  var result = [];
  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }   //avancer de 1 cran dans la liste a
     else if (a[ai] > b[bi] ){ bi++; }   //avancer de 1 cran dans la liste b
     else 
     {
       result.push(a[ai]);              //égalité : ajouter la donnée dans la liste intersection
       ai++;
       bi++;
     }
  }
  return result;
}

function getId(ids,list){                //récupérer les recettes à partir des id sélectionnées
let returnList=[];
for( let i=0;i<list.length;i++){
  for( let j=0;j<ids.length;j++){
  if(list[i].id==ids[j]){returnList.push(list[i])}
}}
return returnList;
}


//Fonction de fusion de toutes les sources de mots (name, description, ingredients) et création
//de la liste filtrée (newList) des résultats selon entrées utilisateur (tempSearch)
function fusionList(myList,tempSearch){    
let  start = new Date().getTime();
tempSearch = [...tempSearch, ...ustensilsList, ...applianceList, ...searchWords];              
console.log(tempSearch);                                                                                               
highArray = tempSearch;                                                                                 
newList =[];                                                                                   
let listWords=[];
let listresults=[];

for (let k=0; k<tempSearch.length;k++){          //boucle dans les mots recherchés (saisie+tags)
  let tempResult=[];
  for (let i=0;i<myList.length;i++){            //boucle dans chaque recette du fichier json
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
    listWords =[... new Set(listWords)];             //création des mots-clés regroupés, sans doublons
    
    
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
}
