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