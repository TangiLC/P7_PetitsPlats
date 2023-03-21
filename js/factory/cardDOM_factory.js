function cardDOM(elem){
let cardTitle=elem.name;
let cardTime=elem.time;
let cardIngredients=elem.ingredients;
let cardDescription=elem.description;
let keywords=elem.keywords;
let ingredInnerHTML="";

const articleCard = document.createElement("article");
articleCard.setAttribute("class","card_content");

const cardImg = document.createElement("div");
cardImg.setAttribute("class","card_img");
cardImg.textContent=`${keywords}`;
articleCard.appendChild(cardImg);

const innerTitle = document.createElement("div");
innerTitle.setAttribute("class","title_row")
articleCard.appendChild(innerTitle);

const titleName = document.createElement("div");
titleName.setAttribute("class","card_title");
titleName.textContent = cardTitle;
innerTitle.appendChild(titleName);

const titleTime = document.createElement("div");
titleTime.setAttribute("class","card_time");
titleTime.innerHTML ="<i class='fa-regular fa-clock'></i>&nbsp;"+cardTime+" min";
innerTitle.appendChild(titleTime);

const innerContent = document.createElement("div");
innerContent.setAttribute("class","content_row");
articleCard.appendChild(innerContent);

const innerLeft = document.createElement("ul");
for (let j=0; j<cardIngredients.length; j++){
    ingredInnerHTML+="<li><span>"+cardIngredients[j].ingredient+"</span>";
    if (cardIngredients[j].hasOwnProperty('quantity')){ingredInnerHTML+=" : "+cardIngredients[j].quantity}
    if (cardIngredients[j].hasOwnProperty('unit')){ingredInnerHTML+=cardIngredients[j].unit}
    ingredInnerHTML+="</li>";
}
innerLeft.innerHTML=ingredInnerHTML;
innerLeft.setAttribute("class","inner_left");
innerContent.appendChild(innerLeft);


const innerRight = document.createElement("div");
innerRight.textContent = cardDescription.slice(0,175)+"...";
innerRight.setAttribute("class","inner_right");
innerContent.appendChild(innerRight);


return articleCard;
}




