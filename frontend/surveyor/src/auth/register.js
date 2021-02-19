import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import {Modal, InputGroup, Form, FormControl, Button} from 'react-bootstrap'
import Overview from "../overview/overview";

class Register extends Component {
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
      validated:false,
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
      this.handleSubmit(e);
    }
};
passwordMatch = () =>{
  console.log("password match");
  if (this.state.password === this.state.repeatPassword && this.state.password.length > 0){
    console.log("apswords do mathc");
    return true 
  }else{
    console.log("passwords dont match");
    this.setState({errors: {...this.state.errors, password:"Passwords must match"} });
    return false;
  }
}

handleSubmit = (e) => {
    const form = e.currentTarget;
    if ( this.passwordMatch() === false) {
      this.setState({validated:true});
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
  const {redirectToReferrer, errors, validated} = this.state;
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
        <Form validate validated={validated} onSubmit={this.handleSubmit}>
          <Modal.Header  closeButton>
            <Modal.Title id="form-Modal-title" >
            Register 
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                id="name"
                type="text"
                placeholder="Name"
                aria-label="name"
                aria-describedby="name"
                onChange={this.onChange}
                required
              />
                <FormControl
                id="surname"
                type="text"
                placeholder="Surname"
                aria-label="surname"
                aria-describedby="surname"
                onChange={this.onChange}
                required
              />
            </InputGroup>

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
              <FormControl
                id="Company"
                type="text"
                placeholder="Company"
                aria-label="Company"
                aria-describedby="Company"
                onChange={this.onChange}
                required
              />
            </InputGroup>
            <InputGroup className="s">
              <FormControl
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="Password"
                  onChange={this.onChange}
                  required
                  isInvalid={!!errors.password}
                />
              <FormControl
                id="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                aria-label="Repeat Password"
                aria-describedby="Repeat Password"
                onChange={this.onChange}
                required
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback className="text-center" type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer className="pl-5 pr-5">
            <Button
            className="ml-5 mr-5"
              block
              size="lg"
              variant="primary"
              type="submit"
              
            >
              Register
            </Button>

          </Modal.Footer>

          <Modal.Body className="text-center">
            <span>Have an account?</span>
            <Link to="/login" className=""> Login</Link>

          </Modal.Body>
        </Form>
      </Modal>

      {this.WarningModal ()}
    </div>
  );
}
}


export default Register;
