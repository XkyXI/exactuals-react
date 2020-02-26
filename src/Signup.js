import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';

class Login extends Component {
  // TODO: validate input onSubmit
  // TODO: POST on submit

  render() {
    return (
      <div className="login">
        {/* logo */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo"/>
        </div>

        { /* header */ }
        <div className="form-header-container">
          <h5>Sign up</h5>
        </div>

        {/* Sign up form */}
        <Form id="signup-form">
          <Form.Group id="formGrid">
            <Form.Control autoFocus required type="email" placeholder="Email" />
            <Form.Row>
              <Col> <Form.Control required placeholder="First name" /> </Col>
              <Col> <Form.Control required placeholder="Last name" /> </Col>
            </Form.Row>
            <Form.Control required type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>

        {/* Sign in link in the bottom */}
        <div className="link-container">
          <Link className="text-secondary" to="/">Sign in here</Link>
        </div>

      </div>
    );
  }
}

export default Login;
