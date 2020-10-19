import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';





//
class G2formSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      open: this.props.open,
      errors: "",
      networkError:"",
      questions: this.props.questions
    };
  }


	render() {
    const {questions, errors, open} = this.state;
    if(open){
      
      return questions.map((question,index) => {
        console.log(question);
        return (
          <div  key={question.id}>
            <h2>{question.name}</h2>

            
          </div>
        );
      
    });

    return (<h1>EMPTY QUESTIONS</h1>);
    }else{
      return (
        <div>
          <h1>This is the heading closed</h1>
        </div>
      )
    }

	}
}

export default G2formSection
