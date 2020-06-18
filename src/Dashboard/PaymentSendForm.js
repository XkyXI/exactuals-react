import React, { Component } from 'react';
import { Badge, Form, Row, Col, OverlayTrigger, Popover, Card, ListGroup, Button } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';
import { getScoreColor, getStatusColor } from "./ColorUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

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
    const { ppid, amount, method, memo, source_currency, target_currency } = values;
    
    const n = parseInt(ppid);
    let userinfo = n >= 0 ? ppinfo[n].info : {};
    let addressinfo = n >= 0 ? ppinfo[n].address : {};

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Payee Info</Popover.Title>
        <Popover.Content>
          { !ppid ? "Select a payee to view their information" :
            <Card>
              <Card.Img variant="top" src="/profile.png"/>
              <Card.Body>
                <Card.Title>
                  {userinfo.first_name + " " + userinfo.last_name}
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>Satisfaction: </b>
                    { ppinfo[n].feedback_count === 0
                      ? <Button variant="secondary">? / 5</Button>
                      : <Button variant={getScoreColor(ppinfo[n].satisfaction / ppinfo[n].feedback_count)}>{(ppinfo[n].satisfaction / ppinfo[n].feedback_count).toFixed(1)} / 5</Button>
                    }
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Country:</b> {addressinfo.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Email:</b> <a href={`mailto:${userinfo.email}`}>{userinfo.email}</a>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Transactions:</b> {ppinfo[n].trans.length} times
                  </ListGroup.Item>
                  <ListGroup.Item>
                    { ppinfo[n].trans.length === 0 ? <>No Recent Transactions</> :
                      <>
                        <b>Most Recent Transaction:</b> <br/>
                        <b>Amount:</b> ${ppinfo[n].trans[0].amount} <br/>
                        <b>Date:</b> {new Date(ppinfo[n].trans[0].date).toISOString().substring(0, 10)} <br/>
                        <b>Status:</b> <Badge variant={getStatusColor(ppinfo[n].trans[0].status)}>{ppinfo[n].trans[0].status}</Badge>
                      </>
                    }
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          }
        </Popover.Content>
      </Popover>
    );

    return (
      <div>
        <Form id="send-payment-form" onSubmit={this.next}>
          <Form.Group as={Row} controlId="formPayee">
            <Form.Label column sm={2}>Payee</Form.Label>
            <Col sm={10}>
              <OverlayTrigger trigger="focus" placement="right" delay={{hide: 500}} overlay={popover}>
                <Form.Control ref={this.ref} as="select" name="payee" value={ppid} onChange={handleChange("ppid")}>
                  <option value="" disabled style={{display: "none"}}>-- Select payee --</option>
                  { ppinfo && ppinfo.map((ppif, i) => 
                    <option key={ppif.ppid} value={i}>{ppif.info.first_name + " " + ppif.info.last_name}</option>
                  ) }
                </Form.Control>
              </OverlayTrigger>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAmount">
            <Form.Label column sm={2}>Amount</Form.Label>
            <Col className="currency-symbol-input-group" sm={10}>
              <Form.Control required type="number" pattern="^\d*(\.\d{0,2})?$" placeholder="0.00" name="amount" min="0" step="0.01" value={amount} onChange={handleChange("amount")} />
              <i>$</i>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCurrency">
            <Form.Label column sm={2}>Currency</Form.Label>
            <Col className="currency-input-group" sm={10}>
            <Form.Row>
              <Col xs={2}>
                <Form.Control as="select" name="source-currency" value={source_currency} onChange={handleChange("source_currency")}>
                  <option value="" disabled style={{display: "none"}}>-- Source --</option>
                  <option value="840">$ (USD)</option>
                  <option value="156">¥ (CNY)</option>
                  <option value="978">€ (EUR)</option>
                  <option value="826">£ (GBP)</option>
                  <option value="643">₽ (RUB)</option>
                  <option value="410">₩ (KRW)</option>
                </Form.Control>
              </Col>
              <FontAwesomeIcon icon={faArrowRight} />
              <Col xs={2}>
                <Form.Control as="select" name="target-currency" value={target_currency} onChange={handleChange("target_currency")}>
                  <option value="" disabled style={{display: "none"}}>-- Target --</option>
                  <option value="840">$ (USD)</option>
                  <option value="156">¥ (CNY)</option>
                  <option value="978">€ (EUR)</option>
                  <option value="826">£ (GBP)</option>
                  <option value="643">₽ (RUB)</option>
                  <option value="410">₩ (KRW)</option>
                </Form.Control>
              </Col>
              { source_currency !== "" && target_currency !== "" && source_currency !== target_currency &&
                  <Badge variant="primary">FX</Badge> 
              }
            </Form.Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formMethod">
            <Form.Label column sm={2}>Method</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" name="method" value={method} onChange={handleChange("method")}>
                <option value="" disabled style={{display: "none"}}>-- Select payment method --</option>
                <option>IACH</option>
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
