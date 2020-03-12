import React from 'react';
import { Badge, Table } from 'react-bootstrap';

const STATUS_BADGE = {
  "New": "primary",
  "Processing": "primary",
  "Ready": "info",
  "Delivered": "success",
  "Cancelled": "warning",
  "Default": "info"
};

function getBadge(status) {
  return STATUS_BADGE[status] !== undefined ? STATUS_BADGE[status] : STATUS_BADGE["Default"];
}

export default function TransactionTable(props) {
  return (
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
        <tr key={trans.tid}>
          <td>{new Date(trans.date).toISOString().substring(0, 10)}</td>
          <td>{trans.tid}</td>
          <td>{trans.disbursement}</td>
          <td>${trans.amount}</td>
          <td><Badge variant={getBadge(trans.status)}>{trans.status}</Badge></td>
        </tr>)
      }
      </tbody>
    </Table>
  );
}
