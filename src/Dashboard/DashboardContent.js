import React from 'react';
import TransactionTable from './TransactionTable';

export default function MainContent(props) {
  return (
    <div className="dashboard">
      <h5>Recent Transactions</h5>
      { props.transactions &&
        <TransactionTable transactions={props.transactions.slice(0, 5)} />
      }
    </div>
  );
}
