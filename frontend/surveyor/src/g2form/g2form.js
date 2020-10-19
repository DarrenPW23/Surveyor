import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Col, Container, Row} from 'react-bootstrap'
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';
import G2formSection from "./g2formSection";





//
class G2form extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      forms: [{
        title: "",
        questions: [{
          name: "",
          questionType:"",
          response:{}
        }]
      }]
    };
  }


  renderFromList(){
    var forms= [{
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
        questionType:"tfComment",
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
      title: "Contact Details",
      questions: [{
        id: 0,
        name: "Do you have contact details",
        questionType:"tfComment",
        response:{}
      }]
    }];
    const formGrouped = forms.map((form,index) => {
      return (
        <Row  key={form.id}>
          <Col xs={2}>{index} of {forms.length}</Col>
          <Col xs={10}><G2formSection open={index===0 ? true : false} questions={form.questions}/></Col>
        </Row>

      );
  })
    return formGrouped
  }


	render() {
		return (
      <div>
          <div className="text-center" style={{backgroundColor: 'black', height:'40vh'}} >
              <img src={G2_logo} width="70%" height="100%" style={{objectFit:"cover"}}/> 
          </div>
          <Link to="/forms">back to our forms</Link>

    <h1>{this.props.formTitle}</h1>
    <Container>
      {this.renderFromList()}
    </Container>


      </div>

		)
	}
}

export default G2form
