function addTag(clas,val){
    const tagButton = document.createElement("button");
    tagButton.setAttribute("onclick",`deleteTag('${clas}','${val}')`);
    tagButton.setAttribute("class",`color_${clas} button_${val}`);
    tagButton.innerHTML=`${val}&nbsp;<i class="fa-solid fa-circle-xmark"></i>`;
return tagButton;
}

function createModal(sua,list,mssge){
    const modal=document.createElement('article');

    const modalTitle=document.createElement('div');
    modalTitle.setAttribute('class',`modal_${sua}`);
    modal.appendChild(modalTitle);

    const TitleMssg=document.createElement('div');
    TitleMssg.innerText=mssge;
    modalTitle.appendChild(TitleMssg);

    const TitleArrow=document.createElement('div');
    TitleArrow.setAttribute('onclick',`closeModal(${sua})`);
    TitleArrow.innerHTML="<i class='fa-solid fa-angle-up'></i>";
    modalTitle.appendChild(TitleArrow);






return modal;    
}