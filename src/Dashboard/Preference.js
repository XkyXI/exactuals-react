import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LoadingButton from "../components/LoadingButton";

export default class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    console.log(e.target.speedRange.value);
    console.log(e.target.expenseRange.value);

    setTimeout(function() { // Start the timer
      this.setState({ isLoading: false}) // After 1 second
    }.bind(this), 1000);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="dashboard">
        <h5>Preference</h5>
        <Form className="preference-form" onSubmit={this.handleSave}>
          <Form.Group controlId="speedRange">
            <Form.Label>Speed (Slowest to Fastest) </Form.Label>
            <Form.Control type="range" min="1" max="5" />
          </Form.Group>
          <Form.Group controlId="expenseRange">
            <Form.Label>Expense (Lowest to Highest) </Form.Label>
            <Form.Control type="range" min="1" max="5" />
          </Form.Group>

          <LoadingButton isLoading={isLoading} variant="primary" type="submit">
            Save
          </LoadingButton>
        </Form>
      </div>
    );  
  }
}
