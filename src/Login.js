import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

// only for developmental purposes, must remove when in production
const users = ["admin"];

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fakeValidateUserPass(username, password) {
    // TODO: validate username and password by making a request
    return users.includes(username) && password;
  }

  // To handle user submitting the form
  handleSubmit(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    // let remember = e.target.remember.checked;

    if (this.fakeValidateUserPass(username, password)) {
      this.props.history.push("/dashboard/home");
    }
  }

  render() {
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

        { /* Sign in form */ }
        <Form id="login-form" onSubmit={this.handleSubmit}>
          <Form.Control autoFocus required type="text" placeholder="Username" name="username" />
          <Form.Control required type="password" placeholder="Password" name="password" />
          <Form.Group controlId="formCheckbox">
            <Form.Check type="checkbox" label="Remember me" name="remember" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign in
          </Button>
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
