import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Col, Container, Form, Row} from 'react-bootstrap'
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';





//
class G2formTFComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      displayComment: false,
      response: {
        checked:null,
        comment:null,
        url:null
      }
    };
  }

componentDidMount(){
  this.setState({
    response:this.props.question.response,
    displayComment: this.props.question.response.comment != null ? true : false
  });
}

onCommentStateChange= ()=>{
  this.setState(prevState => ({ displayComment: !prevState.displayComment }))
}

onChange = (event) =>{
  let response = this.state.response;
  const {type, checked, name, value} = event.target;
  response = {...response, [type === 'radio'  ? "checked" : name]: type === 'radio'  ? !!value : value};
  this.setState({response: response})
  let questionResponse = this.props.question;
  questionResponse = {...questionResponse, response: response};
  this.props.onChange(questionResponse);
}


  render(){
    const {displayComment, response} = this.state;
    const {question, prevQuestionType, url} = this.props;
    return(
    <div>
        {prevQuestionType === true ? null:
          <Row>
            <Col sm={9}></Col>
            <Col sm={1}>YES</Col>
            <Col sm={1}>NO</Col>
            <Col sm={1}>COMMENTS</Col>
          </Row>
        }
      <Form.Group  controlId={question.id} key={question.id}>

        <Form.Row>
          {url ?
            <Col sm={9}>
              <Form.Control 
                type="text"
                name="url" 
                placeholder="Page / Link Name" 
                onChange={this.onChange}
                value={response.url}

              />
            </Col>
            :
            <Form.Label as={Col} sm={9}>{question.name}</Form.Label>
          }
          
          <Col sm={1}>
            <Form.Check 
              type="radio"
              checked={response.checked  === true ? true : false}
              id={`T-check-${question.id}`}
              name={`check-${question.id}`}
              value="true"
              onChange={this.onChange}
            />  
          </Col>
          <Col sm={1}>
            <Form.Check 
              type="radio"
              checked={response.checked === false ? true : false}
              id={`F-check-${question.id}`}
              name={`check-${question.id}`}
              value=''
              onChange={this.onChange}
            />
          </Col>
          <Col sm={1}>
            <Form.Check
              type="checkbox"
              onChange={this.onCommentStateChange}
              checked={displayComment}
              value={displayComment}
            />
          </Col>
          {displayComment === true ? 
            <Col sm={12}> 
              <Form.Control   
                as="textarea" 
                rows="2" 
                onChange={this.onChange}
                value={response.comment} 
                placeholder="Write Here"
                name="comment"
              /> 
               
            </Col>
          : null}
          
        </Form.Row>
      </Form.Group>
    </div>  
    );


  }
}

  
export default G2formTFComment
