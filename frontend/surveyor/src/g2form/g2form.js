import React, { Component } from "react";
import {Col, Container, Row, Button} from 'react-bootstrap'
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import G2FormSection from "./g2FormSection";
import {formValidation} from './g2FormValidation'





//
class G2Form extends React.Component {
  constructor() {
    super();
    this.state = {
      sectionIndex: 0,
      email: "",
      errors: "",
      networkError:"",
      validated: false
    };
  }


  handleQuestionChange = (index)=>{
    let response = formValidation(this.props.sections, this.state.sectionIndex)
    this.props.onChange(response.sections);
    if(response.valid){
      this.setState({sectionIndex: index});
    }
    
  }


 
  onChange = (questionResponses,index) =>{
    let sections =this.props.sections;
    sections[index] = {...sections[index], questions:questionResponses};
    this.props.onChange(sections);
  }



  onValidation = (submit) => {
    let response = formValidation(this.props.sections)
    this.props.onChange(response.sections);
    if(response.valid && !submit){
      this.props.onTabChange();
    }else{
      this.props.onSubmit();
    }
  }


	render() {
    const{sections, last} = this.props;
    const{sectionIndex, validated} = this.state;
		return (
      <div>

        <Container>
          {sections.map((section,index) => {
            return (
              <Row  key={section.id}>
                <Col xs={2}>
                  <Button  variant="link" onClick={() => this.handleQuestionChange(index)}>
                    {index +1 } of {sections.length}
                  </Button>
                </Col>
                <Col xs={10}>
                  <G2FormSection 
                  title={section.title}
                  questions={section.questions} 
                  open={index === sectionIndex ? true : false} 
                  next={index === (sectionIndex + 1) ? true : false} 
                  valid={section.valid}
                  handleQuestionChange={() => this.handleQuestionChange(index)}
                  onChange={(questionResponses) => this.onChange(questionResponses, index)}
                  />
                  
                </Col>
                {index === (sections.length - 1) && index === sectionIndex   ? 
                  last ? 
                    <Button  variant="link"  onClick={() => this.onValidation(true)}>
                      SUBMIT
                    </Button>
                  :
                    <Button  variant="link"  onClick={() => this.onValidation(false)}>
                      NEXT SECTION
                    </Button>
                  
                  :null
                }
              </Row>

          );})}
        </Container>
      </div>
    )
  }
}
export default G2Form
