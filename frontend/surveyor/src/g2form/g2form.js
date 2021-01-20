import React, { Component } from "react";
import {Col, Container, Row, Button} from 'react-bootstrap'
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import G2FormSection from "./g2FormSection";





//
class G2Form extends React.Component {
  constructor() {
    super();
    this.state = {
      sectionIndex: 0,
      email: "",
      errors: "",
      networkError:"",
      /*sections: [{
        id: null,
        title: "",
        questions: [{
          name: "",
          questionType:"",
          response:{}
        }]
      }]*/
    };
  }


  handleQuestionChange = (index)=>{
    this.setState({sectionIndex: index});
  }

/*
  onChange = (questionResponses,index) =>{
    let sections =this.state.sections;
    sections[index] = {...sections[index], questions:questionResponses};
    this.setState({sections: sections});
  }*/
 
  onChange = (questionResponses,index) =>{
    let sections =this.props.sections;
    sections[index] = {...sections[index], questions:questionResponses};
    this.setState({sections:sections});
    this.props.onChange(sections);
  }



	render() {
    const{sections, last, onTabChange, onSubmit} = this.props;
    const{sectionIndex} = this.state;
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
                  open={index === sectionIndex ? true : false} 
                  next={index === (sectionIndex + 1) ? true : false} 
                  handleQuestionChange={() => this.handleQuestionChange(index)}
                  onChange={(questionResponses) => this.onChange(questionResponses, index)}
                  questions={section.questions} 
                  />
                  
                </Col>
                {index === (sections.length - 1) && index === sectionIndex   ? 
                  last ? 
                    <Button  variant="link"  onClick={() => onSubmit()}>
                      SUBMIT
                    </Button>
                  :
                    <Button  variant="link"  onClick={() => onTabChange()}>
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
