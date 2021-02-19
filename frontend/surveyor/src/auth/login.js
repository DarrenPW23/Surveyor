import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import {Modal, InputGroup, Form, FormControl, Button} from 'react-bootstrap'
import Overview from "../overview/overview";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: "",
      password: "", 
      token: "",
      open: true,
      warningOpen: true,
      errors: "",
      networkError:""
    };
  }




  handleCloseWarningModal = () => {
    this.setState({warningOpen: false});
  };
  WarningModal() {
    if (this.state.errors.hasOwnProperty('Error')) {
      return (
        <Modal
          open={this.state.warningOpen}
        >
          <Modal.Title>WARNING</Modal.Title>
          <Modal.Body style={{padding:"10px"}}>
            <b>{this.state.networkError}</b>
            <b>{this.state.errors.Error}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseWarningModal} variant="primary" autoFocus>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }else {
      return null;
    }
  }
handleClose = () => {
    this.setState({ open: false });
  };
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onKeyPress= (e) => {
  if (e.key === 'Enter') {
      // Do code here
      e.preventDefault();
      this.onFetch();
    }
};
handleSubmit = e => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }else{
      this.onFetch();
  }
};


onFetch = e => {

  const userData = {
    email: this.state.email,
    password: this.state.password
  };
  console.log(userData.email);
  Auth.authenticateUser(userData.email)
  this.setState({
    redirectToReferrer: true,
    token: userData.email
  });

  /*fetch("/api/auth/login", {
    method: 'POST',
    body: JSON.stringify(userData),
    headers:{
      "Content-Type": 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        if (res.headers.get("Content-Type") && res.headers.get("Content-Type") === "application/json; charset=utf-8" ) {
          return res.json();
        }else {
          throw new Error(res.statusText);
        }
      }
      return  res.json();
    })
    .then((result) => {
      if(!result.success){
        if (result.hasOwnProperty('message')){
           this.setState({
             warningOpen: true,
             errors: {Error: result.message}
           });
        }else{
          this.setState({
            errors: result
          });
        }
      }else {
        Auth.authenticateUser(result.token)
        this.setState({
          redirectToReferrer: true,
          token: result.token
        });
      }
    },
      (error) => {
        console.log("ERROR on fetch");
        this.setState({
          warningOpen: true,
          networkError: error
        });
      }
    )*/
};

render() {
  const { from } =  this.props.location.state || { from: { pathname: '/' } }
  const {redirectToReferrer, errors} = this.state;
  if (this.state.redirectToReferrer === true || Auth.isUserAuthenticated()) {
    return <Redirect to={from} />
  }


  return (
    <div>
      <Overview/>
      <Modal
        show={this.state.open}
        onHide={() => this.setState({open:false})}
        
        dialogClassName="modal-90w"
      >
        <Form validate onSubmit={this.handleSubmit}>
          <Modal.Header  closeButton>
            <Modal.Title id="form-Modal-title" >
            Login 
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                id="email"
                type="email"
                placeholder="Email"
                aria-label="email"
                aria-describedby="email"
                onChange={this.onChange}
                required
              />
            </InputGroup>

            <InputGroup >

              <FormControl
                id="password"
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="Password"
                onChange={this.onChange}
                required
              />
            </InputGroup>
            <Link to="/forgot-password" className="mb-3 "> Forgot Password?</Link>
          </Modal.Body>
          <Modal.Footer className="pl-5 pr-5">
            <Button
            className="ml-5 mr-5"
              block
              size="lg"
              variant="primary"
              type="submit"
              
              /*onKeyPress={this.onKeyPress}*/
            >
              Login
            </Button>

          </Modal.Footer>

          <Modal.Body className="text-center">
            <span>Don't have an account?</span>
            <Link to="/register" className=""> Sign Up</Link>

          </Modal.Body>
        </Form>
      </Modal>

      {this.WarningModal ()}
    </div>
  );
}
}


export default Login;
