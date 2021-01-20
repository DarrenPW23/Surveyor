import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Form, Row, Col, Button} from 'react-bootstrap'

import Auth from '../auth/authenticated';
import G2FormQuestion from './g2FormQuestion';
import G2FormQDeviceBrowser from './g2FormQDeviceBrowser';

import G2_logo from '../static/img/G2_logo.png';





//
class G2FormSection extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      questionResponses: null
    };
  }


  onChange = (questionResponse,index) =>{
    let questionResponses =this.props.questions;
    questionResponses[index] = questionResponse;
    this.setState({questionResponses:questionResponses});
    this.props.onChange(questionResponses);
  }
  loadMore = () =>{
    let questionResponses =this.props.questions;
    questionResponses.push({
      id: questionResponses[questionResponses.length - 1].id + 1,
      name: questionResponses[questionResponses.length - 1].name,
      questionType:"urlTFComment",
      response:{}
    });
    this.setState({questionResponses:questionResponses});
    this.props.onChange(questionResponses);

  }
  

	render() {
    const { } = this.state;
    const {open, next, title, questions} = this.props;
    if(open){
      
      return (
        <div>
        <h1>{title}</h1>
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
              lastQuestion= {index === questions.length - 1 ? true : false}
              onChange={(questionResponse) => this.onChange(questionResponse,index)} 
              url={true}
              loadMore={this.loadMore}
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
              device={true} 
              onChange={(questionResponse) => this.onChange(questionResponse,index)} 
              />
          );
        }else{
          return (<div>Wrong question type</div>);
        }
    })}
    </div>
    );

    }else if (next){
      return (
        <div>
          <Row>
            <Col xs={4}><Button variant="link" onClick={()=>this.props.handleQuestionChange()}>Next</Button></Col> 
            <Col xs={8}><h3>{title}</h3></Col> 
          </Row>
        </div>
      )
    }else{
      return (
        <div>
          <Row>
            <Col xs={4}></Col> 
            <Col xs={8}><h3>{title}</h3></Col> 
          </Row>
        </div>
      )
    }

	}
}

export default G2FormSection
