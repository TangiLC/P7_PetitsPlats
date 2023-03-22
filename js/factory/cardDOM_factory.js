function cardDOM(elem){
let cardId=elem.id;
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
let bgcol =(((cardId+30)*3).toString(16).padStart(2,'a')).toString();
bgcol ="#"+bgcol+bgcol+'cc';
cardImg.textContent=`${cardId} ${bgcol}:${keywords}`;
cardImg.style.backgroundColor=bgcol;
articleCard.appendChild(cardImg);

const innerTitle = document.createElement("div");
innerTitle.setAttribute("class","title_row")
articleCard.appendChild(innerTitle);

const titleName = document.createElement("div");
titleName.setAttribute("class","card_title tag_check");
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
    ingredInnerHTML+="<li class='tag_check'><span>"+cardIngredients[j].ingredient+"</span>";
    if (cardIngredients[j].hasOwnProperty('quantity')){ingredInnerHTML+=" : "+cardIngredients[j].quantity}
    if (cardIngredients[j].hasOwnProperty('unit')){ingredInnerHTML+=cardIngredients[j].unit}
    ingredInnerHTML+="</li>";
}
innerLeft.innerHTML=ingredInnerHTML;
innerLeft.setAttribute("class","inner_left");
innerContent.appendChild(innerLeft);

const innerRight = document.createElement("div");
innerRight.textContent = cardDescription.slice(0,175)+"...";
innerRight.setAttribute("class","inner_right tag_check");
innerContent.appendChild(innerRight);

return articleCard;
}


function addTag(clas,val){
    const tagButton = document.createElement("button");
    tagButton.setAttribute("onclick",`deleteTag('${clas}','${val}')`);
    tagButton.setAttribute("class",`color_${clas} button_${val}`);
    tagButton.innerHTML=`${val}&nbsp;<i class="fa-solid fa-circle-xmark"></i>`;
return tagButton;
}

