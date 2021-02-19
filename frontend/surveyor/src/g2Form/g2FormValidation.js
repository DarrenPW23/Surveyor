import isEmpty from 'lodash/isEmpty';

export const formValidation = (sections,choiceIndex)=>{
  var allValid=true;
  let tempSections = sections;
  if (typeof choiceIndex !== "undefined"){
    tempSections = [tempSections[choiceIndex]]
  }
  tempSections.map((section,SectionIndex) => {
    var sectionValid=true;
    let questions = section.questions

      questions.map((question,index) => {
      var valid=true;
      if(isEmpty(question.response)){
        valid= false;
      }else if(question.questionType ==="tfComment" && typeof question.response.checked === "undefined"){
        valid= false;
      }else if(question.questionType ==="urlTFComment" && (typeof question.response.checked === "undefined" || (typeof question.response.url === "undefined" || question.response.url === ""))){
        valid= false;
        //add for question only to handle empty comment
      }else if((question.questionType ==="typeBrowser"  || question.questionType ==="typeDevice"  ) &&  question.response.comment === ""){
        valid= false;
        //test that not all selections are false
        const resp = question.response;
        for (const prop in resp) {
          if(resp[prop] === true){
            valid= true;
            break;
          }
        }
      }
      questions[index] ={...question, valid: valid};
      if(!valid){
        sectionValid =false;
      }  
    });
    if (typeof choiceIndex === "undefined"){
      sections[SectionIndex] ={...section, valid: sectionValid, questions:questions};
    }else{
      sections[choiceIndex] ={...sections[choiceIndex], questions:questions, valid: sectionValid}; 
    }
    if(!sectionValid){
      allValid = false;
    } 
  });
  return {sections:sections, valid:allValid}
}