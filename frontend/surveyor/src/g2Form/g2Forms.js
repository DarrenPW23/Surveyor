import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {Tabs, Tab, Fade, Collapse} from 'react-bootstrap'
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_grey.jpg';
import G2Form from "./g2Form";
import formsJSON from "./forms.json";
import {formValidation} from './g2FormValidation'





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

  onValidation = () => {
    let forms =this.state.forms;
    let allValid = true
    forms = forms.map((form,index) => {
      let response = formValidation(form.sections)
      if(!response.valid){
        allValid=false;
      }
      return {...forms[index], sections:response.sections, valid:response.valid};
    });
    this.setState({forms: forms});
    if(allValid){
      return true;
    }
    return false;
  }

  onSelect = (key) =>{
    //for use if no tab change without validation
    //let index =this.state.activeTab
    //let response = formValidation(this.state.forms[index].sections)
    //this.onChange(response.sections, index);
   // if(response.valid){
   // }
    this.setState({ activeTab:key })
  }

  onSubmit = () =>{
      if(this.onValidation()){
        console.log(this.state.forms);
      }
  }

  onTabChange = (index) =>{
        //for use if no tab change without validation
      this.setState({ activeTab:(index + 1) });
  }

 

	render() {
    const{forms, activeTab,allvalid} = this.state;
    var entries = [
      "number1",
      "number2",
      "number3",
      "number4",
      "number5"
      ];
      var fruits = ["apple", "orange", "cherry"];
		return ( 
      <div id="g2Forms">

          <div className="text-center pb-100" >
              <img src={G2_logo}  width="100%" style={{objectFit:"contain"}}/> 
          </div>
          <div className="container">
            <div className="row">
            <Link className="form-link offset-2 col-10 mb-5" to="/sections">back to our forms</Link>
            <h1 className="form-header offset-2 col-9 mb-4">{this.props.formTitle}</h1>
            <span className=" form-site offset-2 col-10 mb-4">www.example.com</span>
            <span className="form-subhead offset-2 col-10 mb-5">example _ design</span>
            </div>
          </div>


          <Tabs 
            id="g2Forms-sections" 
            className="container form-tabs"  
            activeKey={activeTab} 
            onSelect={(key) => this.onSelect(key)} 
          >
            {forms.map((form,index) => {
              return (
                <Tab className="forms-tab-content" key={index} eventKey={index} title={form.title} >
                <G2Form 
                  sections={form.sections}
                  onChange={(sections) => this.onChange(sections, index)}
                  onTabChange={() => this.onTabChange(index)}
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
