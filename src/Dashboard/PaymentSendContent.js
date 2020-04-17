import React, { Component } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import { generateId } from "./DashboardUtils";

import LoadingButton from '../components/LoadingButton';

const TRANSACTION_API = "http://localhost:8000/transaction/"

export default class PaymentSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });
    let tid = generateId(10);
    let payee = e.target.payee.value;
    let amount = e.target.amount.value;
    let method = e.target.method.value;
    let message = e.target.message.value;
    let date = new Date().toISOString();
    let ppid = "ppid2"; // TODO: get ppid
    let transType = "Individual";
    let timezone = new Date().toTimeString().split(" ")[1];
    let status = "New";

    let formdata = new FormData();
    formdata.append("tid", tid);
    formdata.append("description", message);
    formdata.append("date", date);
    formdata.append("disbursement", method);
    formdata.append("amount", amount);
    formdata.append("trans_type", transType);
    formdata.append("timezone", timezone);
    formdata.append("status", status);
    formdata.append("status_date", date);
    formdata.append("ppid", ppid);

    let requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(TRANSACTION_API, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    this.props.reloadTransactions();
    this.setState({ isLoading: false });
    this.props.history.push("/dashboard/payment/manage");
  }


  render() {
    const { isLoading } = this.state;
    return (
      <div className="dashboard">
        <h5>Send Payment</h5>

        <div>
          <Form id="send-payment-form" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formPayee">
              <Form.Label column sm={2}>Payee</Form.Label>
              <Col sm={10}>
                <Form.Control required autoFocus type="text" placeholder="payee" name="payee" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAmount">
              <Form.Label column sm={2}>Amount</Form.Label>
              <Col sm={10}>
                <Form.Control required type="number" pattern="^\d*(\.\d{0,2})?$" placeholder="$0.00" name="amount" min="0" step="0.01" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formMethod">
              <Form.Label column sm={2}>Method</Form.Label>
              <Col sm={10}>
                <Form.Control as="select" name="method">
                  <option>ACH</option>
                  <option>IAT</option>
                  <option>Wire</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formMessage">
              <Form.Label column sm={2}>Memo (optional)</Form.Label>
              <Col sm={10}>
                <Form.Control as="textarea" rows="3" placeholder="memo" name="message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <LoadingButton type="submit" isLoading={isLoading}>Send</LoadingButton>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}
