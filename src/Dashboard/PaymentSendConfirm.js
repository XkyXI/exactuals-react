import React, { Component } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';

const PROCESSOR_NAMES = {
  A: "Currency Sender",
  B: "Capital FX",
  C: "Big Local Bank"
};

export default class PaymentSendProcessor extends Component {

  next = e => {
    e.preventDefault();
    this.props.submit();
  };

  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  done = e => {
    e.preventDefault();
    this.props.history.push("/dashboard/payment/manage");
  }

  render() {
    const { values, status } = this.props;
    const { name, amount, method, memo, processor, processors } = values;

    return (
      <div>
        { !isNaN(status) && 
          (status === 201
            ? <Alert variant="success">This transaction was processed successfully.</Alert> 
            : <Alert variant="danger">This transaction was failed. </Alert>)
        }

        <Form id="send-payment-form">
          <Form.Group as={Row} controlId="formConfirm">
          <Form.Label column sm={2}>Payee</Form.Label>
            <Col sm={10}>
                <Form.Label column sm={2}>{name}</Form.Label>
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
                <Form.Label column sm={2}>{PROCESSOR_NAMES[processors[processor].id]}</Form.Label>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              { isNaN(status) ?
                <>
                  <LoadingButton className="step-btns" isLoading={false} onClick={this.prev} variant="secondary">Prev</LoadingButton>
                  <LoadingButton className="step-btns" isLoading={false} onClick={this.next}>Send</LoadingButton>
                </>
                : <LoadingButton className="step-btns" isLoading={false} onClick={this.done}>Done</LoadingButton>
              }
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
