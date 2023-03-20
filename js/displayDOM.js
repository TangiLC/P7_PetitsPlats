let recipesList=[]
let keywordsList=[]

function displayCardDOM(myList){
    const cardGrid= document.getElementById("cardGrid"); 
    if (myList.length==0){console.log('liste vide')}
    else {
    for (let i=0; i<myList.length;i++){
        cardGrid.appendChild(cardDOM(myList[i]));
        }
    }
}

function isAlphanumeric(str) {
  return /^[a-zÀ-ÿ-()%/ ]+$/.test(str);  
}

function isSmallWord(str) {
  let testArray=["une","les","que","aux","peu","des","sur","pas","est","vos","pour","faire","avant",
      "avec","ainsi","vous","par","puis","plus","votre","dans","elle","aussi","tout","après","c'est"];
  return testArray.includes(str.slice(1));
}


function moreThanThree(myList){
  let returnedList=[];
  if (myList.length>0){
    for (let i=0; i<myList.length;i++){
      let tempString='z'+myList[i].toLowerCase();
      if (tempString.length>3){
        if (isAlphanumeric(tempString)==false){tempString=tempString.slice(0,-1)}
        if (isSmallWord(tempString)==false){returnedList.push(tempString.slice(1)+" ")}
      }
    }
  return returnedList;
  }
}

function superSplit(arr){
  let ssplit=arr.split('(').join(',').split(')').join(',').split(' ').join(',').split("'").join(',').split(',');
  return ssplit;
}


fetch('./data/recipes.json')
  .then(function (recipes) {
    if (recipes.status !== 200) {
      console.log('Problem. Status Code: ' + recipes.status);
      return;
    }

    recipes.json().then(function (list) {  
        for (let i = 0; i < list.length; i++) {
          let words=[];
          
          words=words.concat(moreThanThree(list[i].ingredients.map(x => x.ingredient)));
          //keywords=keywords.concat(moreThanThree(list[i].ingredients.map(a => a.unit)));
          words=words.concat(moreThanThree(superSplit(list[i].name)));
          words=words.concat(moreThanThree(superSplit(list[i].description)));
          
          words.sort();
          let keyWords=[...new Set(words)];
          console.log(keyWords);
          list[i]['keywords']=keyWords;
          //for (let j=0;j<keyWords.length; j++){
          //  keywordsList.push({keyWords[j]:list[i].id})
          //}
          recipesList.push(list[i]);
          console.log(list[i]);
            }
        displayCardDOM(recipesList);
        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

