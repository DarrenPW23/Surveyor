import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';





//
class G2formSection extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      open: this.props.open,
      errors: "",
      networkError:""
    };
  }
  function display(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function noDisplay(props) {
    return <h1>The Heading</h1>;
  }

	render() {
		return (
      <div>

      </div>
      
		)
	}
}

export default G2formSection
