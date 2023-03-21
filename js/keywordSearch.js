let recipesList=[];
let keywordsList=[];


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