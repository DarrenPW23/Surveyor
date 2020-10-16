import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import G2_logo from '../static/img/G2_logo.png';





//
class G2form extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: "",
      networkError:""
    };
  }



	render() {
		return (
      <div>
          <div className="text-center" style={{backgroundColor: 'black', height:'40vh'}} >
              <img src={G2_logo} width="70%" height="100%" style={{objectFit:"cover"}}/> 
          </div>
      </div>

		)
	}
}

export default G2form
