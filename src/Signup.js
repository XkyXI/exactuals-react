import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Alert } from 'react-bootstrap';

import LoadingButton from './components/LoadingButton';

const USER_API = "http://localhost:8000/user/"
const PAYOR_API = "http://localhost:8000/payor/"
const PAYEE_API = "http://localhost:8000/payee/"

class Login extends Component {
  // TODO: validate input onSubmit

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    let uid = e.target.username.value;
    let email = e.target.email.value;
    let firstname = e.target.firstname.value;
    let lastname = e.target.lastname.value;
    let password = e.target.password.value;
    let userType = e.target.usertype.value;

    let userFormData = new FormData();
    userFormData.append("uid", uid);
    userFormData.append("password", password);
    userFormData.append("first_name", firstname);
    userFormData.append("last_name", lastname);
    userFormData.append("email", email);
    userFormData.append("user_type", userType);

    let payorFormData = new FormData();
    payorFormData.append("send_payment_method", "ACH");
    payorFormData.append("uid", uid);

    let payeeFormData = new FormData();
    payeeFormData.append("preference", "speed");
    payeeFormData.append("receive_payment_method", "ACH");
    payeeFormData.append("uid", uid);

    await this.postUser(userFormData);
    if (userType === "PYR")
      await this.postPayor(payorFormData);
    else 
      await this.postPayee(payeeFormData);

    this.setState({ isLoading: false, message: true });
    this.props.history.push("/");
  }

  async postUser(userData) {
    let requestOptions = {
      method: 'POST',
      body: userData,
    };

    await fetch(USER_API, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async postPayor(formdata) {
    let requestOptions = {
      method: 'POST',
      body: formdata,
    };

    await fetch(PAYOR_API, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async postPayee(formdata) {
    let requestOptions = {
      method: 'POST',
      body: formdata,
    };

    await fetch(PAYEE_API, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
         <Alert variant="success"> Sign up successful! </Alert> }

        {/* Sign up form */}
        <Form id="signup-form" onSubmit={this.handleSubmit}>
          <Form.Group id="formGrid">
            <Form.Control autoFocus required type="text" placeholder="Username" name="username" />
            <Form.Control required type="email" placeholder="Email" name="email" />
            <Form.Row>
              <Col> <Form.Control required placeholder="First name" name="firstname" /> </Col>
              <Col> <Form.Control required placeholder="Last name" name="lastname" /> </Col>
            </Form.Row>
            <Form.Control required type="password" placeholder="Password" name="password" />
            <Form.Group>
              <Form.Check type="radio" label="Payor" value="PYR" name="usertype" id="payorRadio" defaultChecked />
              <Form.Check type="radio" label="Payee" value="PYE" name="usertype" id="payeeRadio" />
            </Form.Group>

          </Form.Group>
          <LoadingButton isLoading={isLoading} variant="primary" type="submit">
            Sign up
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
