const mainForm=document.querySelector(".main_form");
const cardGrid= document.getElementById("cardGrid"); 
const tagList= document.getElementById("tagList");
const recipNb= document.getElementById("recipNb");

let recipesList=[];

function tagLoop(sua,list){           //boucle de création de tous les tags
  for(let i=0;i<list.length;i++){
    tagList.appendChild(addTag(sua,list[i]));
  }
}


function deleteTag(val,item){           //suppression du keyword dans la liste
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
  filterDisplay(recipesList,'tlc');            //reset de l'affichage
}

function displayCardDOM(myList){
    tagList.innerHTML="";                      //remise à zéro de l'écran

    tagLoop('s',searchWords);
    tagLoop('a',applianceList);
    tagLoop('u',ustensilsList);
    
    cardGrid.innerHTML="";                     //création de la card Zéro recette
    if (myList.length==0){recipNb.innerText="Aucune recette à proposer.";
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


fetch('./data/recipes.json')                          //récupération asynchrone du json
  .then(function (recipes) {
    if (recipes.status !== 200) {
      console.log('Problem. Status Code: ' + recipes.status);
      return;
    }

    recipes.json().then(function (list) {  
        recipesList=createKeywordList(list);          //lancement de la création des keywords dans le json
        datasearch.addEventListener('input',function() {
          filterDisplay(recipesList,datasearch.value)})     //écoute de la saisie utilisateur

        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

