import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getScoreColor } from "./ColorUtils";

export default class PayeeManage extends Component {
  render() {
    return (
      <div className="dashboard">
        <h5>Manage Payee</h5>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Avg. Satisfaction</th>
              <th>Last Transaction</th>
              <th>Transactions</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
          { this.props.ppinfo &&
            this.props.ppinfo.map((ppinfo, i) => 
            <tr key={ppinfo.ppid}>
              <td>{i + 1}</td>
              <td>{ppinfo.payee_id}</td>
              <td>{ppinfo.info.first_name + " " + ppinfo.info.last_name}</td>
              <td><a href={`mailto:${ppinfo.info.email}`}>{ppinfo.info.email}</a></td>
              <td>
                { ppinfo.feedback_count === 0
                  ? <Button variant="secondary">? / 5</Button>
                  : <Button variant={getScoreColor(ppinfo.satisfaction / ppinfo.feedback_count)}>{(ppinfo.satisfaction / ppinfo.feedback_count).toFixed(1)} / 5</Button>
                }</td>
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
