
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
  closeModal(val); openModal(val);
  filterDisplay(recipesList,'tlc');
}

function displayCardDOM(myList){
    
    tagList.innerHTML="";
    //recipNb.innerHTML="";
    tagLoop('s',searchWords);
    tagLoop('a',applianceList);
    tagLoop('u',ustensilsList);
    
    cardGrid.innerHTML="";
    if (myList.length==0){recipNb.innerText="Votre recherche ne permet pas de vous proposer de recette, merci de modifier les critères.";
      cardGrid.appendChild(cardDOM(
          { "id": 33,
            "name" : "Aucune Recette",
            "ingredients": [{"ingredient" : "aucune"},{"ingredient" : "recette"},],
            "time": ":(",
            "description": "Votre saisie ne permet d'afficher aucune fiche recette. Merci de modifier ou compléter votre recherche",
            "keywords":["aucun résultat"]
        }))}
    else {
    for (let i=0; i<myList.length;i++){
      recipNb.innerText=`Nous avons ${myList.length} recette(s) à vous proposer`;
      cardGrid.appendChild(cardDOM(myList[i]));

        }
    }
}


fetch('./data/recipes.json')
  .then(function (recipes) {
    if (recipes.status !== 200) {
      console.log('Problem. Status Code: ' + recipes.status);
      return;
    }

    recipes.json().then(function (list) {  
        recipesList=createKeywordList(list);
        datasearch.addEventListener('input',function() {filterDisplay(recipesList,datasearch.value)})
        
        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

