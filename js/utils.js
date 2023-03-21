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
  