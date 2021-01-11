import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Form, Row, Col, Button} from 'react-bootstrap'

import Auth from '../auth/authenticated';
import G2formTFComment from './g2formTFComment';
import G2formURLTFComment from './g2formURLTFComment';
import G2_logo from '../static/img/G2_logo.png';





//
class G2formSection extends React.Component {
  constructor(props) {
    super(props);
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
              <G2formTFComment 
                question={question} 
                prevQuestionType={index === 0 ? "" : questions[index-1].questionType === question.questionType ? true : false}
                onChange={(questionResponse) => this.onChange(questionResponse,index)} 
              />
          );
        }else if(question.questionType ==="urlTFComment"){
          return (
              <G2formURLTFComment 
                question={question} 
                prevQuestionType={index === 0 ? "" : questions[index-1].questionType === question.questionType ? true : false}
                lastQuestion= {index === questions.length - 1 ? true : false}
                onChange={(questionResponse) => this.onChange(questionResponse,index)} 
                loadMore={this.loadMore}
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

export default G2formSection
