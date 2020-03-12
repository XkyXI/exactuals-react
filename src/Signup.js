import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Alert } from 'react-bootstrap';

import LoadingButton from './components/LoadingButton';

class Login extends Component {
  // TODO: validate input onSubmit
  // TODO: POST on submit

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ message: true });
  }

  render() {
    const { isLoading, message } = this.state;

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

        { message &&
         <Alert variant="warning"> Sign up not available! </Alert> }

        {/* Sign up form */}
        <Form id="signup-form" onSubmit={this.handleSubmit}>
          <Form.Group id="formGrid">
            <Form.Control autoFocus required type="email" placeholder="Email" />
            <Form.Row>
              <Col> <Form.Control required placeholder="First name" /> </Col>
              <Col> <Form.Control required placeholder="Last name" /> </Col>
            </Form.Row>
            <Form.Control required type="password" placeholder="Password" />
          </Form.Group>
          <LoadingButton isLoading={isLoading} variant="primary" type="submit">
            Sign in
          </LoadingButton>
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
