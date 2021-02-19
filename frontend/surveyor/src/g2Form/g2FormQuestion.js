import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Col, Container, Form, Row, Button} from 'react-bootstrap'
import Auth from '../auth/authenticated';




//
class G2formTFComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      displayComment: false,
      validated:false,
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
    displayComment:  this.props.comment ? true : false
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
    const {displayComment, response, } = this.state;
    const {question, differentQuestion, lastQuestion, firstQuestion, url, validURL, comment} = this.props;
    return(
    <span id="G2formTFComment">
        {differentQuestion === true ? 
          <Form.Row className="text-center" >
            <Col sm={8} style={validURL || typeof validURL === "undefined" ? {color:"#000"}:{color:"#FF0000"}}>{url ? question.name :""}</Col>
            <Col sm={1}>YES</Col>
            <Col sm={1}>NO</Col>
            <Col sm={2}>COMMENTS</Col>
          </Form.Row>
          : null
        }
      <Form.Group  controlId={`form-group-${question.id}`} key={`form-group-${question.id}`}>
      <Form.Row>
          {url ?
            <Col sm={8}>
              <Form.Control 
                type="text"
                name="url" 
                placeholder="Page / Link Name" 
                onChange={this.onChange}
                value={response.url}
                required

              />
            </Col>
            :
            <Form.Label as={Col} sm={8} style={question.valid || typeof question.valid === "undefined"  ? {color:"#000"}:{color:"#FF0000"}}>{question.name}</Form.Label>
          }
      { comment ? null :
        <React.Fragment>
          <Col sm={1} className="align-self-center">
            <Form.Check
              type="radio"
              checked={response.checked  === true ? true : false}
              id={`T-check-${question.id}`}
              className="T-check"
              name={`check-${question.id}`}
              value="true"
              onChange={this.onChange}
              required
            />  
          </Col>
          <Col sm={1} className="align-self-center">
            <Form.Check 
              type="radio"
              checked={response.checked === false ? true : false}
              id={`F-check-${question.id}`}
              className="F-check"
              name={`check-${question.id}`}
              value=''
              onChange={this.onChange}
              required
            />
          </Col>
          <Col sm={2} className="align-self-center">
            <Form.Check
              type="radio"
              className="C-check"
              onClick={this.onCommentStateChange}
              checked={displayComment}
              value={true}
            />
          </Col>
        </React.Fragment>   
      }
      </Form.Row>

          {displayComment === true ? 
            <Form.Row>
              <Col sm={12}> 
                <Form.Control  
                  className="CommentText mt-3"
                  as="textarea" 
                  rows="3" 
                  onChange={this.onChange}
                  value={response.comment} 
                  placeholder="Write Here"
                  name="comment"
                  required={comment ? true : false}
                /> 
                
              </Col>
            </Form.Row>
            : null
          }
          
        
      </Form.Group>
      {lastQuestion === true ?
        <Row>
          {firstQuestion === false? 
            <Button 
            variant="link" 
            onClick={() => this.props.loadMore(false)}>
              Remove
            </Button>
            :null
          }
          <Button 
          variant="link" 
          onClick={() => this.props.loadMore(true)}>
            Add More
          </Button>
        </Row>
         : null}
    </span>  
    );


  }
}

  
export default G2formTFComment
