import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Col, Container, Row, Button} from 'react-bootstrap'
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';
import G2formSection from "./g2formSection";





//
class G2form extends React.Component {
  constructor() {
    super();
    this.state = {
      formIndex: 0,
      email: "",
      errors: "",
      networkError:"",
      /*forms: [{
        id: null,
        title: "",
        questions: [{
          name: "",
          questionType:"",
          response:{}
        }]
      }]*/
      forms: 
      [{
        id: 0,
        title: "Website Navigation",
        questions: [{
          id: 0,
          name: "does the website have nav elements",
          questionType:"tfComment",
          response:{}
        },
        {
          id: 1,
          name: "does the website have secondary nav elements",
          questionType:"tfComment",
          response:{}
        },
        {
          id: 2,
          name: "does the website have teriary nav elements",
          questionType:"tfComment",
          response:{}
        }]
      },
      {
        id: 1,
        title: "Website Forms",
        questions: [{
          id: 0,
          name: "did you send an email via the form",
          questionType:"TEMPS",
          response:{}
        },
        {
          id: 1,
          name: "did the correct receipient receive the email",
          questionType:"tfComment",
          response:{}
        }]
      },
      {
        id: 2,
        title: "URL working",
        questions: [
          {
          id: 0,
          name: "Do all your pages work",
          questionType:"urlTFComment",
          response:{}
        },
        {
          id: 1,
          name: "Do all your pages work",
          questionType:"urlTFComment",
          response:{}
        },
        {
          id: 2,
          name: "Do all your pages work",
          questionType:"urlTFComment",
          response:{}
        }]
      }]
    };
  }

  handleQuestionChange = (formID)=>{
    this.setState({formIndex: formID});
  }


  onChange = (questionResponses,index) =>{
    let forms =this.state.forms;
    forms[index] = {...forms[index], questions:questionResponses};
    this.setState({forms: forms});
  }
 


	render() {
    const{forms} = this.state;
		return (
      <div>
          <div className="text-center" style={{backgroundColor: 'black', height:'40vh'}} >
              <img src={G2_logo} width="70%" height="100%" style={{objectFit:"cover"}}/> 
          </div>
          <Link to="/forms">back to our forms</Link>

        <h1>{this.props.formTitle}</h1>
        <Container>
          {forms.map((form,index) => {
            return (
              <Row  key={form.id}>
                <Col xs={2}><Button variant="link" onClick={() => this.handleQuestionChange(form.id)}>{index +1 } of {forms.length}</Button></Col>
                <Col xs={10}>
                  <G2formSection 
                  title={form.title}
                  open={form.id === this.state.formIndex ? true : false} 
                  next={form.id === (this.state.formIndex + 1) ? true : false} 
                  handleQuestionChange={() => this.handleQuestionChange(form.id)}
                  onChange={(questionResponses) => this.onChange(questionResponses, index)}
                  questions={form.questions} 
                  />
                  
                </Col>
              </Row>

          );})}
        </Container>
      </div>
    )
  }
}
export default G2form
