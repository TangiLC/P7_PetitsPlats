const datasearch=document.querySelector(".main_input");

let searchWords =[];
let ustensilsList=[];
let applianceList=[];
let newList=[];

function filterDisplay(myList,val){
    let highArray=[]; 
     if (val.length>2){
       let tempSearch=[val.toLowerCase()];
   
       datasearch.addEventListener("keydown", function (e) {
          
         if (e.keyCode===13  && datasearch.value.length>2) {
           searchWords.push(datasearch.value.toLowerCase());
           datasearch.removeEventListener("keydown", function(){});
           datasearch.placeholder="affiner la recherche";
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
      let words=['tlc'];
      words=words.concat(moreThanThree(list[i].ingredients.map(x => x.ingredient)));
        for (let j=0;j<list[i].ingredients.length;j++){
            if (list[i].ingredients[j].hasOwnProperty('unit')){words.push(list[i].ingredients[j].unit)}
        }
      words=words.concat(moreThanThree(superSplit(list[i].name)));
      words=words.concat(moreThanThree(superSplit(list[i].description)));
      
      words.sort();
      let keyWords=[...new Set(words)];
      list[i]['keywords']=keyWords;
     
     }
    return list;
  }
