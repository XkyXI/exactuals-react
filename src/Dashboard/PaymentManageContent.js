import React, { Component } from 'react';
import TransactionTable from './TransactionTable';

export default class PaymentManage extends Component {
  render() {
    return (
      <div className="dashboard">
        <h5>Manage Payment</h5>
        { this.props.transactions &&
            <TransactionTable 
              userType={this.props.userType} 
              transactions={this.props.transactions} 
              ppinfo={this.props.ppinfo} 
            />
        }
      </div>
    );
  }
}
