import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Form, Row, Col, Button} from 'react-bootstrap'

import Auth from '../auth/authenticated';
import G2formTFComment from './g2formTFComment';
import G2_logo from '../static/img/G2_logo.png';





//
class G2formURLTFComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      questionResponse: null,
      questions:[{
        id: null,
        response:{
          url: null,
          checked: null,
          comment: null
        }
      }]
    };
  }


  onChange = (questionResponse) =>{
    this.setState({questionResponse:questionResponse});
    this.props.onChange(questionResponse);
  }
  

	render() {
    const {questions } = this.state;
    const {open, next, question, lastQuestion, prevQuestionType} = this.props;  
    return (
      <div>
        {prevQuestionType === true ? null:
          <Row>
            <Col sm={9}>{question.name}</Col>
            <Col sm={1}>YES</Col>
            <Col sm={1}>NO</Col>
            <Col sm={1}>COMMENTS</Col>
          </Row>
        }

        <G2formTFComment 
          question={question} 
          prevQuestionType={true}
          onChange={(questionResponse) => this.onChange(questionResponse)} 
          url={true}
        />
        {lastQuestion === true ?
         <Button 
         variant="link" 
         onClick={this.props.loadMore}>
           Add More
          </Button>
         : null}
      </div>
    );

	}
}

export default G2formURLTFComment
