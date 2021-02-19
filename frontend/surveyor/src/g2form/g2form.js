import React, { Component } from "react";
import {Col, Container, Row, Button, Fade, Collapse} from 'react-bootstrap'
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



  onChange = (questionResponses,index) =>{
    let sections =this.props.sections;
    sections[index] = {...sections[index], questions:questionResponses};
    this.props.onChange(sections);
  }

  handleQuestionChange = (index)=>{
    let response = formValidation(this.props.sections, this.state.sectionIndex)
    this.props.onChange(response.sections);
    if(response.valid){
      this.setState({sectionIndex: index});
    }
  }

  onValidation = (submit) => {
    let response = formValidation(this.props.sections)
    this.props.onChange(response.sections);
    if(response.valid && !submit){
      this.props.onTabChange();
    }else if(response.valid){
      this.props.onSubmit();
    }
  }


	render() {
    const{sections, last} = this.props;
    const{sectionIndex, validated} = this.state;
		return (
      <div className="pt-100 timeline">

          {sections.map((section,index) => {
            return (
              <div id="g2Form"  className={/*CANT BE ID IN FOR LOOP STUPID*/index === sectionIndex ? "pt-100-off" : "pt-50-off"}>
              <hr className={section.valid  ? "valid":"invalid"} id= {index === sectionIndex ? "active" : "inactive"}></hr>
              <Container >
                <Row  key={section.id}>
                  <Col  xs={2}>  
                    <div className={index === sectionIndex ? "entry active" : "entry"} >
                      <div className="entry-head">
                          <span className={(sections.length-1) === index ? "v-line last" : "v-line"}> </span>
                          <span className="number-wrapper"> 
                            <span className="number" onClick={() => this.handleQuestionChange(index)}></span>
                          </span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={10}>
                    <Fade appear={true} timeout={1000} in={index === sectionIndex}>
                    <G2FormSection 
                    title={section.title}
                    questions={section.questions} 
                    open={index === sectionIndex ? true : false} 
                    next={index === (sectionIndex + 1) ? true : false} 
                    valid={section.valid}
                    handleQuestionChange={() => this.handleQuestionChange(index)}
                    onChange={(questionResponses) => this.onChange(questionResponses, index)}
                    />
                    </Fade>
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
                  </Col>

                </Row>
                
              </Container>
              </div>
          );})}
      </div>
    )
  }
}
export default G2Form
