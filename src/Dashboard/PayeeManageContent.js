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
              <th>Satisfaction</th>
              <th>Last Transaction</th>
              <th>Transactions</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>40bd00156</td>
              <td>Bob</td>
              <td>bob@test.com</td>
              <td>Happy</td>
              <td>$1532.51 ACH</td>
              <td>12 times</td>
              <td>04/01/2020</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );  
  }
}
