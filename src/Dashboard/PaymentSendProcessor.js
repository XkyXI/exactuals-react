import React, { Component } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';

const PROCESSOR = { 1: "A", 2: "B", 3: "C" };

export default class PaymentSendProcessor extends Component {

  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, processors } = this.props;
    const { processor } = values;

    return (
      <div>
        <Form id="send-payment-form">
          <Form.Group as={Row} controlId="formProcessor">
            <Form.Label column sm={2}>Processor</Form.Label>
            <Col sm={10}>
              {/* <Form.Control as="select" name="processor" value={processor} onChange={handleChange("processor")}> */}
              {
                processors.map(proc => 
                  <Form.Check key={proc.id} type="radio" label={`Processor ${PROCESSOR[proc.id]}, Score: ${proc.score}`} />
                )
              }
              {/* </Form.Control> */}
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoadingButton className="step-btns" isLoading={false} onClick={this.prev} variant="secondary">Prev</LoadingButton>
              <LoadingButton className="step-btns" isLoading={false} onClick={this.next}>Next</LoadingButton>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}