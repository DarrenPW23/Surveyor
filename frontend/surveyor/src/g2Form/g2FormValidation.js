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
      }else if(question.questionType ==="urlTFComment" && (typeof question.response.checked === "undefined" || question.response.url === "undefined")){
        valid= false;
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