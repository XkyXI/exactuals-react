import React, { Component } from 'react';
import { Form, Alert, Row, Col, Overlay, Tooltip } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';
import MapChart from '../components/MapChart';

export default class PaymentSendForm extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { ppinfo, values, handleChange } = this.props;
    const { ppid, amount, method, memo } = values;

    return (
      <div>
        <Form id="send-payment-form" onSubmit={this.next}>
          <Form.Group as={Row} controlId="formPayee">
            <Form.Label column sm={2}>Payee</Form.Label>
            <Col sm={10}>
              <Form.Control ref={this.ref} as="select" name="payee" value={ppid} onChange={handleChange("ppid")}>
                <option value="" disabled style={{display: "none"}}>-- Select payee --</option>
                { ppinfo.map((ppif, i) => 
                  <option key={ppif.ppid} value={[ppif.ppid, ppif.payee_id, ppif.payor_id, ppif.info.first_name+" "+ppif.info.last_name, i]}>{ppif.info.first_name + " " + ppif.info.last_name}</option>
                ) }
              </Form.Control>
              <Overlay target={this.ref.current} show={true} placement={"right"}>
                <Tooltip id="payee-overlay">
                  { this.ref.current && this.ref.current.value.split(",")[3] }
                  <br/>
                  { this.ref.current && "Bank: BOA, Location: USA"  }
                  <br/>
                  { this.ref.current && "Most recent transaction: $123.00 on 05/29/2020"  }
                  <br/>
                </Tooltip>
              </Overlay>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAmount">
            <Form.Label column sm={2}>Amount</Form.Label>
            <Col sm={10}>
              <Form.Control required type="number" pattern="^\d*(\.\d{0,2})?$" placeholder="$0.00" name="amount" min="0" step="0.01" value={amount} onChange={handleChange("amount")} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formMethod">
            <Form.Label column sm={2}>Method</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" name="method" value={method} onChange={handleChange("method")}>
                <option value="" disabled style={{display: "none"}}>-- Select payment method --</option>
                <option>ACH</option>
                <option>IAT</option>
                <option>Wire</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formMessage">
            <Form.Label column sm={2}>Memo (optional)</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows="3" placeholder="memo" name="message" value={memo} onChange={handleChange("memo")} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoadingButton isLoading={false} type="submit">Next</LoadingButton>
            </Col>
          </Form.Group>
        </Form>
      </div>

    );
  }
}