let recipesList=[]
let keywordsList=[{'test':[999]}]

function displayCardDOM(myList){
    const cardGrid= document.getElementById("cardGrid"); 
    if (myList.length==0){console.log('liste vide')}
    else {
    for (let i=0; i<myList.length;i++){
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
          recipesList.push(list[i]);

          for (let j = 0; j < keyWords.length; j++) {
            let newWord=keyWords[j];
            let control=Object.keys(keywordsList).indexOf(newWord)
            if (control!=-1){keywordsList[newWord]+=list[i].id+', '}
            else {keywordsList[newWord]=list[i].id+' ,';}
          }
          
          
          console.log(keywordsList);
            }
        displayCardDOM(recipesList);
        }) 
    })
  
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  })

