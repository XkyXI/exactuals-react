import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class PayeeManage extends Component {
  render() {
    return (
      <div className="dashboard">
        <h5>Manage Payee</h5>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Satisfaction</th> */}
              <th>Last Transaction</th>
              <th>Transactions</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
          { this.props.ppinfo &&
            this.props.ppinfo.map((ppinfo) => 
            <tr key={ppinfo.ppid}>
              <td>{ppinfo.payee_id}</td>
              <td>{ppinfo.info.first_name + " " + ppinfo.info.last_name}</td>
              <td>{ppinfo.info.email}</td>
              <td>{ppinfo.trans.length > 0 ? "$" + ppinfo.trans[0].amount : "None"}</td>
              <td>{ppinfo.trans.length} times</td>
              <td>{new Date(ppinfo.info.created_on).toISOString().substring(0, 10)}</td>
            </tr>)
          }
          </tbody>
        </Table>
      </div>
    );  
  }
}
