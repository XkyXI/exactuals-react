import React, { Component } from 'react';
import { Badge, Table, ButtonGroup, Button } from 'react-bootstrap';

import { isPayee, updateSatisfaction } from "./TransactionUtils"

const STATUS_BADGE = {
  "New": "primary",
  "Processing": "primary",
  "Ready": "info",
  "Delivered": "success",
  "Cancelled": "warning",
  "Error": "danger",
  "Default": "info"
};

const COLORS = [ "danger", "danger", "warning", "success", "success" ]

function getBadge(status) {
  return STATUS_BADGE[status] !== undefined ? STATUS_BADGE[status] : STATUS_BADGE["Default"];
}

export default class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: {}
    };
  }

  componentDidUpdate(nextProps) {
    const { transactions } = this.props;
    if (transactions && nextProps.transactions !== transactions) {
      let feeds = {};
      transactions.forEach(tran => {
        if (tran.satisfaction !== null)
          feeds[tran.tid] = tran.satisfaction;
      });
      this.setState({ feedbacks: feeds });
    }
   }

  componentDidMount() {
    const { transactions } = this.props;
    if (transactions) {
      let feeds = {};
      transactions.forEach(tran => {
        if (tran.satisfaction !== null)
          feeds[tran.tid] = tran.satisfaction;
      });
      this.setState({ feedbacks: feeds });
    }
  }

  feedback = (ppid, tid, val) => {
    updateSatisfaction(ppid, tid, val);
    this.setState(prevState => ({
      feedbacks: {
          ...prevState.feedbacks,
          [tid]: val
      }
    }));
  };

  render() {
    const { ppinfo, transactions } = this.props;
    const { feedbacks } = this.state;
    let ppid = undefined;
    if (ppinfo) {
      ppid = {};
      ppinfo.forEach(pp => {
        ppid[pp.ppid] = pp.info;
      });  
    }

    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Payee</th>
            <th>Disbursement</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Satisfaction</th>
          </tr>
        </thead>
        <tbody>
        { transactions && ppid &&
          transactions.map((trans) => 
          <tr key={trans.tid}>
            <td>{new Date(trans.date).toISOString().substring(0, 10)}</td>
            <td>{trans.tid}</td>
            <td>{ppid[trans.ppid].first_name + " " + ppid[trans.ppid].last_name}</td>
            <td>{trans.disbursement}</td>
            <td>${trans.amount}</td>
            <td><Badge variant={getBadge(trans.status)}>{trans.status}</Badge></td>
            <td>
              <ButtonGroup>
                { trans.tid in feedbacks 
                  ? <Button variant={COLORS[feedbacks[trans.tid]-1]}>{feedbacks[trans.tid]} / 5</Button>
                  : isPayee(this.props.userType)
                  ? <>
                      <Button variant="danger" onClick={() => this.feedback(trans.ppid, trans.tid, 1)}>1</Button>
                      <Button variant="danger" onClick={() => this.feedback(trans.ppid, trans.tid, 2)}>2</Button>
                      <Button variant="warning" onClick={() => this.feedback(trans.ppid, trans.tid, 3)}>3</Button>
                      <Button variant="success" onClick={() => this.feedback(trans.ppid, trans.tid, 4)}>4</Button>
                      <Button variant="success" onClick={() => this.feedback(trans.ppid, trans.tid, 5)}>5</Button>
                    </>
                  : <Button variant="secondary">? / 5</Button>
                }
              </ButtonGroup>
            </td>
          </tr>)
        }
        </tbody>
      </Table>
    );
  }
}
