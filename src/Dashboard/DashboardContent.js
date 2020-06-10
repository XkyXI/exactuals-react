import React from 'react';
import TransactionTable from './TransactionTable';

export default function MainContent(props) {
  return (
    <div className="dashboard">
      <h5>Recent Transactions</h5>
      {/* Displays the 5 most recent transactions 
          (transactions fetched from the API is ordered by dates descending) */}
      { props.transactions &&
          <TransactionTable 
            userType={props.userType} 
            transactions={props.transactions.slice(0, 5)} 
            ppinfo={props.ppinfo} 
          />
      }
    </div>
  );
}
