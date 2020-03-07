import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';

import LoadingButton from './components/LoadingButton';

const USER_API = "http://localhost:8000/user/"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      displayError: false,
      errorMessage: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  signin(username, password) {
    // TODO: validate username and password by making a request
    // TODO: give feedback of loading status
    // TODO: provide more useful error messages
    // TODO: persistent login on refresh

    this.setState({ isLoading: true });
    fetch(USER_API + username)
    .then(response => {
      if (response.ok) return response.json();
      else this.setState({ displayError: true });
    })
    .then(data => { 
      if (data.first_name) {
        this.setState({ isLoading: false });
        this.props.appProps.setAuthenticated(true);
        this.props.appProps.setUsername(data.first_name);
        this.props.history.push("/dashboard/home");
      }
    })
    .catch(err => { 
      console.log("error: " + err);
      this.setState({ displayError: true, isLoading: false, errorMessage: String(err) });
    });
  }

  // To handle user submitting the form
  handleSubmit(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    // let remember = e.target.remember.checked;

    this.signin(username, password);
  }

  render() {
    const { displayError, errorMessage, isLoading } = this.state;

    return (
      <div className="login">
        {/* logo */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo"/>
        </div>

        { /* header */ }
        <div className="form-header-container">
          <h5>Sign in</h5>
        </div>

        {/* Displays an error message when username/password validation failed */}
        { displayError && 
         <Alert variant="danger"> {errorMessage} </Alert> }

        { /* Sign in form */ }
        <Form id="login-form" onSubmit={this.handleSubmit}>
          <Form.Control autoFocus required type="text" placeholder="Username" name="username" />
          <Form.Control required type="password" placeholder="Password" name="password" />
          <Form.Group controlId="formCheckbox">
            <Form.Check type="checkbox" label="Remember me" name="remember" />
          </Form.Group>

          <LoadingButton isLoading={isLoading} variant="primary" type="submit">
            Sign in
          </LoadingButton>
        </Form>

        {/* sign up link in the bottom */}
        <div className="link-container">
          <Link className="text-secondary" to="/signup">Sign up here</Link>
        </div>
      </div>
    );
  }
}

export default Login;
