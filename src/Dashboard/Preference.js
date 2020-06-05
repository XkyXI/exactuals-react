import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

const LEFT_LABEL = "Satisfactory";
const RIGHT_LABEL = "Profit";

export default class Preference extends Component {
  render() {
    const { weight, handleChange } = this.props;

    return (
      <div className="dashboard">
        <h5>Preference Weight</h5>
        <Form className="preference-form">
          <Form.Group controlId="weightRange">
            <Form.Group id="preference-label">
              <Form.Label style={{fontSize: `${13.5 + (10 - weight) / 2}px`}}>{LEFT_LABEL + ` (${ (10-weight)*10 }%)`}</Form.Label>
              <Form.Label style={{fontSize: `${13.5 + weight / 2}px`}}>{RIGHT_LABEL + ` (${ weight*10 }%)`}</Form.Label>
            </Form.Group>
            <Form.Control type="range" min="0" max="10" defaultValue={weight} onInput={handleChange("weight")} />
          </Form.Group>
        </Form>
      </div>
    );  
  }
}
