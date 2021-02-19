import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Form, Row, Col, Button, Collapse, Fade} from 'react-bootstrap'

import Auth from '../auth/authenticated';
import G2FormQuestion from './g2FormQuestion';
import G2FormQDeviceBrowser from './g2FormQDeviceBrowser';

import G2_logo from '../static/img/G2_logo.png';





//
class G2FormSection extends React.Component {
  constructor(props) {
    super();
    this.myRef = React.createRef();
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      
    };
  }

  componentDidUpdate(){
   /*/ if(this.props.validated && this.myRef.checkValidity() === true){
      console.log("HERE")
    }*/
  }

  onChange = (questionResponse,index) =>{
    let questionResponses =this.props.questions;
    questionResponses[index] = questionResponse;
    this.props.onChange(questionResponses);
  }
  loadMore = (more) =>{
    let questionResponses =this.props.questions;
    if(more){
      questionResponses.push({
        id: questionResponses[questionResponses.length - 1].id + 1,//set unique ID for DB
        name: questionResponses[questionResponses.length - 1].name,
        questionType:"urlTFComment",
        response:{}
      });
    }else {
      questionResponses.pop();
    }
    this.props.onChange(questionResponses);
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  
  };
  


	render() {
    const {open, next, title, questions, validated, valid} = this.props;


    if(open){ 
      return (
 

          <Form id="g2FormSection" className="pb-50" ref={this.myRef} noValidate validated={validated} onSubmit={this.handleSubmit}>
            <h1 style={valid || typeof valid === "undefined" ? {color:"#000"}:{color:"#FF0000"}}>{title}</h1>
          {questions.map((question,index) => {        
            if(question.questionType ==="tfComment"){
              return (
                  <G2FormQuestion 
                    question={question} 
                    differentQuestion={index === 0 ? true : questions[index-1].questionType === question.questionType ? false : true}
                    onChange={(questionResponse) => this.onChange(questionResponse,index)} 
                  />
              );
            }else if(question.questionType ==="urlTFComment"){
              return (
                  <G2FormQuestion 
                  question={question} 
                  differentQuestion={index === 0 ? true : questions[index-1].questionType === question.questionType ? false : true}
                  firstQuestion= {index === 0 ? true : false}
                  lastQuestion= {index === questions.length - 1 ? true : false}
                  onChange={(questionResponse) => this.onChange(questionResponse,index)} 
                  url
                  validURL={valid}
                  loadMore={(more) =>this.loadMore(more)}
                  />
              );
            }else if(question.questionType ==="comment"){
              return (
                  <G2FormQuestion 
                  question={question} 
                  onChange={(questionResponse) => this.onChange(questionResponse,index)} 
                  comment={true}
                  />
              );
            }else if(question.questionType ==="typeDevice"){
              return (
                  <G2FormQDeviceBrowser 
                  question={question} 
                  onChange={(questionResponse) => this.onChange(questionResponse,index)} 
                  />
              );
            }else if(question.questionType ==="typeBrowser"){
              return (
                  <G2FormQDeviceBrowser 
                  question={question}
                  device
                  onChange={(questionResponse) => this.onChange(questionResponse,index)} 
                  />
              );
            }else{
              return (<div>Wrong question type</div>);
            }
        })}
        </Form>
    );

    }else if (next){
      return (
        <div id="g2FormSection">
          <Row>
            <Col className="btn-next-col" xs={2}>
              <span className="btn-next-wrapper">
                <Button variant="link" className="btn-next" onClick={()=>this.props.handleQuestionChange()}>
                  NEXT
                </Button>
              </span>
            </Col> 
            <Col xs={8}>
              <h4 className="text-center" style={valid || typeof valid === "undefined" ? {color:"#000"}:{color:"#FF0000"}}>{title}</h4>
              </Col> 
          </Row>
        </div>
      )
    }else{
      return (
        <div id="g2FormSection">
          <Row>
            <Col xs={2}></Col> 
            <Col xs={8}><h4 className="text-center" style={valid || typeof valid === "undefined" ? {color:"#000"}:{color:"#FF0000"}}>{title}</h4></Col> 
          </Row>
        </div>
      )
    }

	}
}

export default G2FormSection
