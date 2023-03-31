function isAlphanumeric (str) {        //regex des mots valides de keywords
  return /^[a-zÀ-ÿ-()%/ ]+$/.test(str);
}

function isSmallWord (str) {           //liste des mots de+3 lettres à exclure de keywords
  let testArray = ['une','les','que','aux','peu','des','sur','pas','est','vos','pour','tout',
    'faire','avant','avec','ainsi','vous','par','puis','plus','votre','dans','elle','aussi','après']
  return testArray.includes(str.slice(1));
}

function moreThanThree (myList) {    //suppression des mots de moins de 3 lettres
  let returnedList = []
  if (myList.length > 0) {
    for (let i = 0; i < myList.length; i++) {  //pour éviter les items vide, ajout d'une lettre avant
      let tempString = 'z' + myList[i].toLowerCase();
      if (tempString.length > 3) {
        if (!isAlphanumeric(tempString)) {          //supprime le dernier caractère non pris en compte
          tempString = tempString.slice(0, -1)}     //dans la fonction superslice
        if (!isSmallWord(tempString)) {             //création de la liste des keywords
          returnedList.push(tempString.slice(1))}
        }}}
  return returnedList;
}


function superSplit (str) {               //récupère les mots de description en liste sans (".,-')
  let ssplit = str.split('(').join(',').split(')').join(',').split(' ').join(',')
        .split('.').join(',').split("'").join(',').split('-').join(',').split(',');
  return ssplit;
}

function highlight (arr) {                     //ajoute un <span> pour mettre en évidence le mot
  const tagCheck = document.querySelectorAll('.tag_check');
  tagCheck.forEach(function (elem) {
    for (let i = 0; i < arr.length; i++) {
      let tempStr = elem.innerHTML;            //mise en place sur le mot en minuscule
      let Arr = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
      if (arr[i] != 'span'&& arr[i] !='spa' && arr[i]!='...'){  //potentiel problème avec keyword "span" en 2ème ?
        elem.innerHTML = tempStr.replaceAll(
          `${arr[i]}`,`<span class='highlight'>${arr[i]}</span>`);
        tempStr = elem.innerHTML;               //mise en place sur le mot avec Majuscule initiale
        elem.innerHTML = tempStr.replaceAll(
          `${Arr}`,`<span class='highlight'>${Arr}</span>`);
      }}})                              
}

function addTag (clas, val) {                 //création du DOM des tags de recherche depuis l'input
  const tagButton = document.createElement('a');
  tagButton.setAttribute('onclick', `deleteTag('${clas}','${val}')`);
  tagButton.setAttribute('class', `color_${clas} tag_button`);
  tagButton.innerHTML = `<p>${val.slice(0,14)}${val.length>14?'...':''}</p><i class="fa-regular fa-circle-xmark"></i>`;
  return tagButton;
}

function addTagOnclick (sua, mystring) {      //création des tags de recherche depuis les champs avancés
  const tagList = document.getElementById('tagList');
  tagList.appendChild(addTag(sua, mystring));
  if (sua == 's') {
    searchWords.push(mystring.toLowerCase());  //ajout du mot-clé dans la liste des mots recherchés
    searchWords=[...new Set(searchWords)]}     //suppression des doublons
  if (sua == 'u') {
    ustensilsList.push(mystring);
    ustensilsList=[...new Set(ustensilsList)]}
  if (sua == 'a') {
    applianceList.push(mystring);
    applianceList=[...new Set(applianceList)]}
  filterDisplay(recipesList, '...');
  ;['s', 'u', 'a'].forEach(el => closeModal(el));  //closeModal permet la mise à jour de la liste des keywords
  openModal(sua);
}

function noAccent(str){
  let strArray=str.split('');
  let accents=[{'raw':'a','accent':['à','ä','â']},
               {'raw':'e','accent':['é','è','ê','ë']},
               {'raw':'i','accent':['ï','î']},
               {'raw':'o','accent':['ö','ô']},
               {'raw':'u','accent':['ù','ü','û']}]
  for (let i=0;i<strArray.length;i++){
    for (let j=0;j<accents.length;j++){
    if (accents[j].accent.some(letter =>letter.includes(strArray[i]))){
      strArray[i]=accents[j].raw;   
      }
    }
  }
  return strArray.join('');
}