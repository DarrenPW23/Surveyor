import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Col, Container, Row, Button, Tabs, Tab} from 'react-bootstrap'
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';
import G2Form from "./g2Form";
import formsJSON from "./forms.json";





//
class G2Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: "",
      networkError:"",
      forms: formsJSON.forms,
      activeTab: 0
      /*
      forms:{[
        id: null,
        title:"",
        sections: [{
          id: null,
          title: "",
          questions: [{
            name: "",
            questionType:"",
            response:{}
          }]
        }]
      ]}
        */
    };
  }



  onChange = (sections,index) =>{
    let forms =this.state.forms;
    forms[index] = {...forms[index], sections:sections};
    this.setState({forms: forms});
  }
  onSubmit = () =>{
    console.log(this.state.forms)
  }
 
 

	render() {
    const{forms, activeTab} = this.state;
		return ( 
      <div>
          <div className="text-center" style={{backgroundColor: 'black', height:'40vh'}} >
              <img src={G2_logo} width="70%" height="100%" style={{objectFit:"cover"}}/> 
          </div>
          <Link to="/sections">back to our forms</Link>

          <h1>{this.props.formTitle}</h1>
          <Tabs activeKey={activeTab} onSelect={key => this.setState({ activeTab:key })} id="g2Forms-sections">
            {forms.map((form,index) => {
              return (
                <Tab eventKey={index} title={form.title}>
                <G2Form 
                  sections={form.sections}
                  onChange={(sections) => this.onChange(sections, index)}
                  onTabChange={() =>  this.setState({ activeTab:(index + 1) })}
                  onSubmit={() => this.onSubmit()}
                  last={index === (forms.length - 1)}
                />
              </Tab>

            );})}
          </Tabs>
      </div>
    )
  }
}
export default G2Forms
