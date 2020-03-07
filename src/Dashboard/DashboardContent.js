import React from 'react';
import { Badge, Table } from 'react-bootstrap';

const STATUS_BADGE = {
  "Processing": "primary",
  "Ready": "info",
  "Delivered": "success",
  "Cancelled": "warning"
};

export default function MainContent(props) {
  return (
    <div className="dashboard">
      <h5>Recent Transactions</h5>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Disbursement</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        { props.transactions &&
          props.transactions.map((trans) => 
          <tr key={trans.id}>
            <td>{new Date(trans.date).toISOString().substring(0, 10)}</td> { /* TODO: moment.js */}
            <td>{trans.transaction_id}</td>
            <td>{trans.disbursement}</td>
            <td>${trans.amount}</td>
            <td><Badge variant={STATUS_BADGE[trans.status]}>{trans.status}</Badge></td>
          </tr>)
        }
        </tbody>
      </Table>
    </div>
  );
}
