import React, { Component } from 'react';
import { Form, Alert, Row, Col, Table } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';

const PROCESSOR_NAMES = {
  A: "Currency Sender",
  B: "Capital FX",
  C: "Big Local Bank"
};

export default class PaymentSendProcessor extends Component {
  constructor(props) {
    super(props);
  }

  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  select = e => {
    this.props.changeProcessor( e.currentTarget.getAttribute("value") );
  };

  render() {
    const { values, handleChange, processors } = this.props;
    const { processor } = values;
    console.log(processor);

    return (
      <div>
        <Form id="send-processor-form">
          <Form.Group as={Row} controlId="formProcessor">
            <Col sm={10}>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Processor</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                { processors && processors.map((proc, i) => 
                  <tr key={proc.id} value={i}>
                    <td value={i} onClick={this.select}>
                      <Form.Check
                        type="radio"
                        name="processor-radio"
                        value={i}
                        checked={processor == i}
                        onChange={this.props.handleChange("processor")}
                      />
                    </td>
                    <td value={i} onClick={this.select}>{i === 0 ? PROCESSOR_NAMES[proc.id] + " (recommended)" : PROCESSOR_NAMES[proc.id]}</td>
                    <td value={i} onClick={this.select}>{proc.score.toFixed(5)}</td>
                  </tr>)
                }
                </tbody>
              </Table>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={10}>
              <LoadingButton className="step-btns" isLoading={false} onClick={this.prev} variant="secondary">Prev</LoadingButton>
              <LoadingButton className="step-btns" isLoading={false} onClick={this.next}>Next</LoadingButton>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}