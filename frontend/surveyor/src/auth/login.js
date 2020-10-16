import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../auth/authenticated';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
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
onSubmit = e => {
  e.preventDefault();
  this.onFetch();
};


onFetch = e => {

  const userData = {
    email: this.state.email,
    password: this.state.password
  };
  Auth.authenticateUser("result.token")
  this.setState({
    redirectToReferrer: true,
    token: "result.token"
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
  const { from } = this.props.location.state || { from: { pathname: '/' } }
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
        <Modal.Header closeButton>
          <Modal.Title id="form-Modal-title">
          Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">

            <FormControl
              placeholder="email"
              aria-label="email"
              aria-describedby="email"
            />
          </InputGroup>

          <InputGroup className="mb-3">

            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="Password"
            />
            
          </InputGroup>
       
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={this.onSubmit}
              onKeyPress={this.onKeyPress}
            >
              Login
            </Button>
            </Modal.Footer>
            <Modal.Footer>
          <span>Forgot Password?</span>
          <Button
            variant="primary"
            component={Link} to="/password/forgot"
          >
          Recover
        </Button>
        </Modal.Footer>
            <Modal.Footer>
          <span>Don't have an account?</span>
          <Button
            variant="primary"
            component={Link} to="/register"
          >
          Sign-up
        </Button>
        </Modal.Footer>

      </Modal>

      {this.WarningModal ()}
    </div>
  );
}
}


export default Login;
