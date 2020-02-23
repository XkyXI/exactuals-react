import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
  // TODO: validate input onSubmit
  // TODO: POST on submit

  render() {
    return (
      <div className="login">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo"/>
        </div>

        <div className="header-container">
          <h5>Sign up</h5>
        </div>

        <Form className="signup-form">
          <Form.Group id="formGridCheckbox">
            <Form.Control autoFocus required type="email" placeholder="Email" />
            <Form.Control required type="username" placeholder="Username" />
            <Form.Control required type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>

        <div className="link-container">
          <Link className="text-secondary" to="/">Sign in here</Link>
        </div>

      </div>
    );
  }
}

export default Login;
