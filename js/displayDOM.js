const datasearch=document.querySelector(".main_input");
const mainForm=document.querySelector(".main_form");
const cardGrid= document.getElementById("cardGrid"); 
let searchWords =[""]



function displayCardDOM(myList){
    
    if (myList.length==0){console.log('liste vide')}
    else {
    for (let i=0; i<myList.length;i++){
        cardGrid.appendChild(cardDOM(myList[i]));
        }
    }
}

function resetDisplay(myList,val){
  cardGrid.innerHTML="";
  let newList=myList;
  console.log(val, searchWords);
  if (val.length>2){
    datasearch.addEventListener("keydown", function (e) {
       
       if (e.keyCode==13) {
        searchWords.push(val);}
    })
    let tempSearch=[val];
    tempSearch=tempSearch.concat(searchWords);
    console.log(tempSearch);
    console.log(myList);
    newList =myList.filter(recip =>
      tempSearch.every(key => recip.keywords.some(keyword =>keyword.includes(key))))
  }
  displayCardDOM(newList);
}


fetch('./data/recipes.json')
  .then(function (recipes) {
    if (recipes.status !== 200) {
      console.log('Problem. Status Code: ' + recipes.status);
      return;
    }

    recipes.json().then(function (list) {  
        let recipesList=createKeywordList(list);
        console.log(recipesList);
        
        datasearch.addEventListener('input',function() {resetDisplay(recipesList,datasearch.value)})
        
        //displayCardDOM(recipesList);
        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

