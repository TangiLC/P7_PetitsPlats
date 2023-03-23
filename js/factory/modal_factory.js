function addTag(clas,val){
    const tagButton = document.createElement("button");
    tagButton.setAttribute("onclick",`deleteTag('${clas}','${val}')`);
    tagButton.setAttribute("class",`color_${clas} button_${val}`);
    tagButton.innerHTML=`${val}&nbsp;<i class="fa-solid fa-circle-xmark"></i>`;
return tagButton;
}

function addTagOnclick(sua,mystring){
    const tagList= document.getElementById("tagList");
    tagList.appendChild(addTag(sua,mystring));
    if(sua=='s'){
        searchWords.push(mystring.toLowerCase())};
    if(sua=='u'){
        ustensilsList.push(mystring)};
    if(sua=='a'){
        applianceList.push(mystring)};
    filterDisplay(recipesList,'tlc');
    closeModal(sua);
    openModal(sua);
}


function createModal(sua,list,mssge){
    
    const modal=document.createElement('article');
    modal.setAttribute('class',`color_${sua}`);

    const modalTitle=document.createElement('div');
    modalTitle.setAttribute('class',`modal_${sua}`);
    modal.appendChild(modalTitle);

    const TitleMssg=document.createElement('div');
    TitleMssg.setAttribute('class','modal_title');
    TitleMssg.innerText=mssge;
    modalTitle.appendChild(TitleMssg);

    const TitleArrow=document.createElement('div');
    TitleArrow.setAttribute('onclick',`closeModal('${sua}')`);
    TitleArrow.innerHTML="<i class='fa-solid fa-angle-up'></i>";
    modalTitle.appendChild(TitleArrow);

    const modalContent=document.createElement('div');
    modalContent.setAttribute('class',`modalcontent_${sua}`);
    modal.appendChild(modalContent);
        
    for (let i=0; i<list.length; i++){
       const baliseA=document.createElement('a');
       baliseA.setAttribute("onclick",`addTagOnclick('${sua}','${list[i]}')`);
       baliseA.innerText=list[i];
       modalContent.appendChild(baliseA);
    }

return modal;    
}