import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  // TODO: validate input onSubmit
  // TODO: GET on submit

  render() {
    return (
      <div className="login">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo"/>
        </div>

        <div className="form-header-container">
          <h5>Sign in</h5>
        </div>

        <Form id="login-form">
          <Form.Control autoFocus required type="username" placeholder="Username" />
          <Form.Control required type="password" placeholder="Password" />
          <Form.Group controlId="formCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>

        <div className="link-container">
          <Link className="text-secondary" to="/signup">Sign up here</Link>
        </div>
      </div>
    );
  }
}

export default Login;
