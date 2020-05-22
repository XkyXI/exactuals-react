import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LoadingButton from "../components/LoadingButton";

export default class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      weight: 5
    }

    this.handleSave = this.handleSave.bind(this);
  }
 
  handleSave(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    console.log(e.target.weightRange.value);
    this.setState({ weight: e.target.weightRange.value });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="dashboard">
        <h5>Preference Weight</h5>
        <Form className="preference-form" onSubmit={this.handleSave}>
          <Form.Group controlId="weightRange">
            <Form.Group id="preference-label">
              <Form.Label>Speed (fastest)</Form.Label>
              <Form.Label>Balance</Form.Label>
              <Form.Label>Expense (lowest cost)</Form.Label>
            </Form.Group>
            <Form.Control type="range" min="0" max="10" defaultValue={this.state.weight} onInput={val => this.setState({ weight: val })} />
          </Form.Group>
          <LoadingButton isLoading={isLoading} variant="primary" type="submit">
            Save
          </LoadingButton>
        </Form>
      </div>
    );  
  }
}
