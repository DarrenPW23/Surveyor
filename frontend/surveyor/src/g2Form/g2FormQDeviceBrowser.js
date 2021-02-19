import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Col, Container, Form, Row, Button} from 'react-bootstrap'
import Auth from '../auth/authenticated';





//
class G2FormQDeviceBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      displayComment: false,
      response: {
        comment:null,
      }
    };
  }

componentDidMount(){
  this.setState({
    response:this.props.question.response,
    displayComment: this.props.question.response.other != null 
  });
}

onCommentStateChange= ()=>{
  this.setState(prevState => ({ displayComment: !prevState.displayComment }))
}

onChange = (event) =>{
  let response = this.state.response;
  const {type, checked, name, value} = event.target;
  response = {...response, [type === 'checkbox'  ? value : name]: type === 'checkbox'  ? checked : value};
  this.setState({response: response})
  let questionResponse = this.props.question;
  questionResponse = {...questionResponse, response: response};
  this.props.onChange(questionResponse);
}

browserCheckbox = () => {
  const {displayComment, response} = this.state;
  const {question} = this.props;
  return (
    <React.Fragment>
      <Form.Check
        type="checkbox"
        className="mb-2" 
        checked={response.safari  === true ? true : false}
        id={`browser-safari-${question.id}`}
        name={`browser-safari-${question.id}`}
        value="safari"
        label="APPLE SAFARI"
        onChange={this.onChange}
      />  
      <Form.Check 
        type="checkbox"
        className="mb-2" 
        checked={response.chrome  === true ? true : false}
        id={`browser-chrome-${question.id}`}
        name={`browser-chrome-${question.id}`}
        value="chrome"
        label="GOOGLE CHROME"
        onChange={this.onChange}
      />
      <Form.Check
        type="checkbox"
        className="mb-2" 
        checked={response.firefox  === true ? true : false}
        id={`browser-firefox-${question.id}`}
        name={`browser-firefox-${question.id}`}
        value="firefox"
        label="MOZILLA FIREFOX"
        onChange={this.onChange}
      />
      <Form.Check
        type="checkbox"
        className="mb-2" 
        checked={response.edge  === true ? true : false}
        id={`browser-edge-${question.id}`}
        name={`browser-edge-${question.id}`}
        value="edge"
        label="MICROSOFT EDGE"
        onChange={this.onChange}
      />  
      <Form.Check
        type="checkbox"
        className="mb-2 " 
        checked={displayComment}
        id={`browser-other-${question.id}`}
        name={`browser-other-${question.id}`}
        value="other"
        label="OTHER"
        onChange={this.onCommentStateChange}
      />  
    </React.Fragment>

  );
}


deviceCheckbox = () => {
  const {displayComment, response} = this.state;
  const {question} = this.props;
  return (
    <React.Fragment>
      <Form.Check
        type="checkbox"
        className="mb-2" 
        checked={response.windows  === true ? true : false}
        id={`device-windows-${question.id}`}
        name={`device-windows-${question.id}`}
        value="windows"
        label="WINDOWS"
        onChange={this.onChange}
        
      />  
      <Form.Check 
        type="checkbox"
        className="mb-2" 
        checked={response.mac  === true ? true : false}
        id={`device-mac-${question.id}`}
        name={`device-mac-${question.id}`}
        value="mac"
        label="OS X (MAC)"
        onChange={this.onChange}
      />
      <Form.Check
        type="checkbox"
        className="mb-2" 
        checked={response.android  === true ? true : false}
        id={`device-android-${question.id}`}
        name={`device-android-${question.id}`}
        value="android"
        label="ANDROID"
        onChange={this.onChange}
      />
      <Form.Check
        type="checkbox"
        className="mb-2" 
        checked={response.iphone  === true ? true : false}
        id={`device-iphone-${question.id}`}
        name={`device-iphone-${question.id}`}
        value="iphone"
        label="IOS (IPHONE)"
        onChange={this.onChange}
      />  
      <Form.Check
        type="checkbox"
        className="mb-2 " 
        checked={displayComment}
        id={`device-other-${question.id}`}
        name={`device-other-${question.id}`}
        value="other"
        label="OTHER"
        onChange={this.onCommentStateChange}
      />  
    </React.Fragment>

  );
  
}



  render(){
    const {displayComment, response} = this.state;
    const {question, device} = this.props;
    return(
    <div>

      <Form.Group  controlId={`form-group-${question.id}`} key={`form-group-${question.id}`}>
        <Form.Row>
          <Col sm={9}>
            <Form.Label >{question.name}</Form.Label>
            <Form.Control  
              className="mt-1" 
              as="textarea" 
              rows="2" 
              onChange={this.onChange}
              value={response.comment} 
              placeholder="Write Here"
              name="comment"

/> 
            {displayComment === true ? 
              <Form.Control  
                className="mt-2" 
                type="text" 
                onChange={this.onChange}
                value={response.other} 
                placeholder="specify"
                name="other"
              /> 
              : null
            }
          </Col>

          <Col sm={3}>
            { device ? this.deviceCheckbox() : this.browserCheckbox()}
          </Col>

        </Form.Row>
      </Form.Group>
    </div>  
    );
  }
}

  
export default G2FormQDeviceBrowser
