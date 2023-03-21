const datasearch=document.querySelector(".main_input");
const mainForm=document.querySelector(".main_form");
const cardGrid= document.getElementById("cardGrid"); 
const tagList= document.getElementById("tagList");
let searchWords =[""]
let recipesList=[];
let keywordsList=[];
let newList=[];


function displayCardDOM(myList){
    tagList.innerHTML="";
    if (searchWords.length>1){
      for(let i=1;i<searchWords.length;i++){
        console.log('searchword :',searchWords);
        tagList.appendChild(addTag(searchWords[i]));
      }
    }
    cardGrid.innerHTML="";
    if (myList.length==0){console.log('liste vide')}
    else {
    for (let i=0; i<myList.length;i++){
        cardGrid.appendChild(cardDOM(myList[i]));
        }
    }
}

function filterDisplay(myList,val){
  
  if (val.length>2){
    let tempSearch=[val];
    datasearch.addEventListener("keydown", function (e) {
       
      if (e.keyCode===13 && datasearch.value.length>2) {
        searchWords.push(datasearch.value);
        datasearch.removeEventListener("keydown", function(){});
        setTimeout(datasearch.value="",500)
        displayCardDOM(newList);}
      })
    
    
    tempSearch=tempSearch.concat(searchWords);
    console.log('temp :',tempSearch);
    //console.log(myList);
    newList =myList.filter(recip =>
      tempSearch.every(key => recip.keywords.some(keyword =>keyword.includes(key))))
  }
  displayCardDOM(newList);
  
}

function createKeywordList(list){

  for (let i = 0; i < list.length; i++) {
    let words=[];
    
    words=words.concat(moreThanThree(list[i].ingredients.map(x => x.ingredient)));
    words=words.concat(moreThanThree(superSplit(list[i].name)));
    words=words.concat(moreThanThree(superSplit(list[i].description)));
    
    words.sort();
    let keyWords=[...new Set(words)];
    //console.log(keyWords);
    list[i]['keywords']=keyWords;
    

    /*for (let j = 0; j < keyWords.length; j++) {
      let newWord=keyWords[j];
      let control=Object.keys(keywordsList).indexOf(newWord)
      if (control!=-1){keywordsList[newWord]+=list[i].id+','}
      else {keywordsList[newWord]=list[i].id+',';}
    }
  }
  for (let i = 0; i < keywordsList.length; i++) {
    keywordsList[i].value=keywordsList[i].value.split(',');
  }*/
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
        let recipesList=createKeywordList(list);
        console.log(recipesList);
        
        datasearch.addEventListener('input',function() {filterDisplay(recipesList,datasearch.value)})
        
        //displayCardDOM(recipesList);
        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

