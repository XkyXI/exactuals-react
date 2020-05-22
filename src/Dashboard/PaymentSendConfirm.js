import React, { Component } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';

export default class PaymentSendProcessor extends Component {

  next = e => {
    e.preventDefault();
    this.props.submit();
  };

  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    const { ppid, amount, method, memo, processor } = values;

    return (
      <div>
        <Form id="send-payment-form">
          <Form.Group as={Row} controlId="formConfirm">
          <Form.Label column sm={2}>Payee</Form.Label>
            <Col sm={10}>
                <Form.Label column sm={2}>{ppid.split(",")[0]}</Form.Label>
            </Col>
            <Form.Label column sm={2}>Amount</Form.Label>
            <Col sm={10}>
                <Form.Label column sm={2}>${amount}</Form.Label>
            </Col>
            <Form.Label column sm={2}>Method</Form.Label>
            <Col sm={10}>
                <Form.Label column sm={2}>{method}</Form.Label>
            </Col>
            <Form.Label column sm={2}>Memo</Form.Label>
            <Col sm={10}>
                <Form.Label column sm={2}>{memo}</Form.Label>
            </Col>
            <Form.Label column sm={2}>Processor</Form.Label>
            <Col sm={10}>
                <Form.Label column sm={2}>{processor}</Form.Label>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoadingButton className="step-btns" isLoading={false} onClick={this.prev} variant="secondary">Prev</LoadingButton>
              <LoadingButton className="step-btns" isLoading={false} onClick={this.next}>Send</LoadingButton>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}