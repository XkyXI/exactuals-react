import React, { Component } from 'react';
import { Form, Row, Col, Table, OverlayTrigger, Popover, ListGroup, Badge } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';

const PROCESSOR_NAMES = {
  A: "Currency Sender",
  B: "Capital FX",
  C: "Big Local Bank"
};

export default class PaymentSendProcessor extends Component {
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

  getComment = (i) => {
    // compute which processor is recommended by the AI and the algorithm
    // then return the corresponding badge
    const { mlProcessors } = this.props;
    if (mlProcessors) {
      let mlStat = -1;
      const allEqual = arr => arr.every( v => v === arr[0] );
      if (!allEqual(Object.values(mlProcessors))) {
        for (let proc in mlProcessors) {
          if (mlStat === -1 || mlProcessors[proc] > mlProcessors[mlStat])
            mlStat = proc;
        }
      }
      mlStat -= 1;
      if (i === 0) {
        if (i === mlStat) {
          return (
            <>
              <Badge variant="info">Recommended</Badge>
              <Badge variant="primary">AI Recommended</Badge>
            </>
          );
        } else {
          return <Badge variant="info">Recommended</Badge>;
        }
      }
      return i === mlStat ? <Badge variant="primary">AI Recommended</Badge> : "";
    }
  };

  renderTooltip = (props, i, id) => {
    const { processors } = this.props;
    const proc = processors[i].info;

    return (
      <Popover id="popover-basic" {...props}>
        <Popover.Title as="h3">{PROCESSOR_NAMES[id]}</Popover.Title>
        <Popover.Content>
        <ListGroup variant="flush">
          <ListGroup.Item><b>Profit: </b>{proc.profit.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>Avg. Rating: </b>{proc.average_rating.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>Profit Score: </b>{proc.profit_score.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>Satisfactory Score: </b>{proc.satisfactory_score.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>FX Margin: </b>{proc.fx_margin.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>Revenue Share: </b>{proc.revenue_share.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>Percent Rate: </b>{proc.percent_rate.toFixed(2)} </ListGroup.Item>
          <ListGroup.Item><b>Flat Rate: </b>{proc.flat_rate.toFixed(2)} </ListGroup.Item>
        </ListGroup>
        </Popover.Content>
      </Popover>
    );
  }

  render() {
    const { values, handleChange, processors, mlProcessors } = this.props;
    const { processor } = values;

    return (
      <div>
        <Form id="send-processor-form">
          <Form.Group as={Row} controlId="formProcessor">
            <Col sm={10}>
              <Table responsive bordered hover striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Processor</th>
                    <th>ML Score</th>
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
                        checked={parseInt(processor) === i}
                        onChange={handleChange("processor")}
                      />
                    </td>
                    <OverlayTrigger
                      placement="left"
                      key={i}
                      overlay={(props) => this.renderTooltip(props, i, proc.id)}>
                    <td value={i} onClick={this.select}>
                      { PROCESSOR_NAMES[proc.id] } 
                      { this.getComment(i) }
                    </td>
                    </OverlayTrigger>
                    <td value={i} onClick={this.select}>{mlProcessors[i+1] && mlProcessors[i+1].toFixed(5)}</td>
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