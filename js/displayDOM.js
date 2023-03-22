const datasearch=document.querySelector(".main_input");
const mainForm=document.querySelector(".main_form");
const cardGrid= document.getElementById("cardGrid"); 
const tagList= document.getElementById("tagList");
const recipNb= document.getElementById("recipNb");

let searchWords =[];
let recipesList=[];
let ustensilsList=[];
let applianceList=[];
let newList=[];

function tagLoop(val,list){
  for(let i=0;i<list.length;i++){
    tagList.appendChild(addTag(val,list[i]));
  }
}

function deleteTag(val,item){
  if(val=='s'){let indx=searchWords.indexOf(item);
      searchWords.splice(indx,1);}
  if(val=='a'){let indx=applianceList.indexOf(item);
      applianceList.splice(indx,1);}
  if(val=='u'){let indx=ustensilsList.indexOf(item);
      ustensilsList.splice(indx,1);}
  filterDisplay(recipesList,'recette');
}

function displayCardDOM(myList){
    tagList.innerHTML="";
    recipNb.innerHTML="";
    tagLoop('s',searchWords);
    tagLoop('a',applianceList);
    tagLoop('u',ustensilsList);
    
    cardGrid.innerHTML="";
    if (myList.length==0){cardGrid.appendChild(cardDOM(
          { "id": 0,
            "name" : "Aucune Recette",
            "ingredients": [{"ingredient" : "aucune"},{"ingredient" : "recette"},],
            "time": ":(",
            "description": "Votre saisie ne permet d'afficher aucune fiche recette. Merci de modifier ou compléter votre recherche",
            "keywords":["aucun résultat"]
        }))}
    else {recipNb.innerText=`Nous avons trouvé ${myList.length} recettes`;
    for (let i=0; i<myList.length;i++){
        cardGrid.appendChild(cardDOM(myList[i]));

        }
    }
}

function filterDisplay(myList,val){
 let highArray=[]; 
  if (val.length>2){
    let tempSearch=[val.toLowerCase()];

    datasearch.addEventListener("keydown", function (e) {
       
      if ((e.keyCode===13 ||e.keyCode===32) && datasearch.value.length>2) {
        searchWords.push(datasearch.value.toLowerCase());
        datasearch.removeEventListener("keydown", function(){});
        setTimeout(datasearch.value="",500)
        displayCardDOM(newList);
        highlight(highArray); }
      })
    if (ustensilsList.length>0){tempSearch=tempSearch.concat(ustensilsList)}
    if (applianceList.length>0){tempSearch=tempSearch.concat(applianceList)}
    if (searchWords.length>0){tempSearch=tempSearch.concat(searchWords);}
    highArray=tempSearch
    console.log('temp :',tempSearch);
    //console.log(myList);
    newList =myList.filter(recip =>
      tempSearch.every(key => 
          recip.keywords.some(keyword =>keyword.includes(key)) ||
          recip.appliance.includes(key) ||
          recip.ustensils.some(keyword => keyword.includes(key))))
    
  }
  displayCardDOM(newList);
  console.log('highlight',searchWords);
  highlight(highArray); 
  
}

function createKeywordList(list){

  for (let i = 0; i < list.length; i++) {
    let words=['recette'];
    
    words=words.concat(moreThanThree(list[i].ingredients.map(x => x.ingredient)));
    words=words.concat(moreThanThree(superSplit(list[i].name)));
    words=words.concat(moreThanThree(superSplit(list[i].description)));
    
    words.sort();
    let keyWords=[...new Set(words)];
    //console.log(keyWords);
    list[i]['keywords']=keyWords;
    

   
   }
  return list;
}


fetch('./data/recipes.json')
  .then(function (recipes) {
    if (recipes.status !== 200) {
      console.log('Problem. Status Code: ' + recipes.status);
      return;
    }

    recipes.json().then(function (list) {  
        recipesList=createKeywordList(list);
        console.log(recipesList);
        
        datasearch.addEventListener('input',function() {filterDisplay(recipesList,datasearch.value)})
        
        //displayCardDOM(recipesList);
        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

