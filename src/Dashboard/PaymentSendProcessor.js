import React, { Component } from 'react';
import { Form, Alert, Row, Col, Table } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';

export default class PaymentSendProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
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
    this.setState({ selected: e.currentTarget.getAttribute("value") });
  };

  render() {
    const { values, handleChange, processors } = this.props;
    const { selected } = this.state;
    console.log(selected);

    return (
      <div>
        <Form id="send-processor-form">
          <Form.Group as={Row} controlId="formProcessor">
            <Col sm={10}>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Processor ID</th>
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
                        checked={selected == i}
                        onChange={e => this.setState({ selected: e.target.value })}
                      />
                    </td>
                    <td value={i} onClick={this.select}>{proc.id}</td>
                    <td value={i} onClick={this.select}>{proc.score}</td>
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