import React, { Component } from 'react';
import { generateId } from "./DashboardUtils";
import { Button, Spinner } from 'react-bootstrap';

import Preference from "./Preference";
import PaymentSendForm from "./PaymentSendForm";
import PaymentSendProcessor from "./PaymentSendProcessor";
import PaymentSendConfirm from "./PaymentSendConfirm";

const TRANSACTION_API = "http://localhost:8000/transaction/"
const PROCESSOR_API = "http://localhost:8000/user_data/"


export default class PaymentSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,

      // step 1
      ppid: "",
      amount: "",
      method: "",
      memo: "",

      // step 2
      processor: 1,
      processors: [ 
        { id: 1, score: 0 },
        { id: 2, score: 0 },
        { id: 3, score: 0 }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processorScore = this.processorScore.bind(this);
  }

  processorScore() {
    const { ppid, amount, processors } = this.state;
    const [ pp, payor_id, payee_id ] = ppid.split(",");

    const country = 840;
    const currency = 840; // for USD and USA
    const cost = 10;
    let formData = new FormData();
    formData.append("amount", amount);
    formData.append("original_currency", currency);
    formData.append("target_currency", currency);
    formData.append("transaction_cost", cost);
    formData.append("payor_id", payor_id);
    formData.append("payee_id", payee_id);
    formData.append("payor_payee_id", pp);
    formData.append("country", country);

    let updatedProcessors = [];
    processors.forEach(proc => { 
      formData.set("processor", proc.id);

      let requestOptions = {
        method: "POST", 
        body: formData
      };

      fetch(PROCESSOR_API, requestOptions)
        .then(response => response.json())
        .then(result => { updatedProcessors.unshift({ id: proc.id, score: result.payee_satisfaction }); this.setState({ processors: updatedProcessors }); })
        .catch(error => console.log('error', error));
    });
    
  }

  handleSubmit() {
    const { ppid, amount, method, memo, processor } = this.state;

    this.setState({ isLoading: true });
    let tid = generateId(10);
    let date = new Date().toISOString();
    let transType = "Individual";
    let timezone = new Date().toTimeString().split(" ")[1];
    let status = "New";

    let formdata = new FormData();
    formdata.append("tid", tid);
    formdata.append("description", memo);
    formdata.append("date", date);
    formdata.append("disbursement", method);
    formdata.append("amount", amount);
    formdata.append("trans_type", transType);
    formdata.append("timezone", timezone);
    formdata.append("status", status);
    formdata.append("status_date", date);
    formdata.append("ppid", ppid.split(",")[0]);

    let requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(TRANSACTION_API, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    this.setState({ isLoading: false });
    this.props.history.push("/dashboard/payment/manage");
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    })
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    })
  };

  handleChange = input => evt => {
    this.setState({ [input]: evt.target.value });
  };

  showStep = () => {
    const { step, ppid, amount, method, memo, processor, processors } = this.state;
    const values = { ppid, amount, method, memo, processor };

    switch (step) {
      case 1:
        return (
          <PaymentSendForm 
            ppinfo={this.props.ppinfo}
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            processorScore={this.processorScore}
            values={values}
          />
        );

      case 2:
        return (
          <PaymentSendProcessor
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            processors={processors}
            values={values}
          />
        );
      case 3:
        return (
          <PaymentSendConfirm
            submit={this.handleSubmit}
            prevStep={this.prevStep}
            values={values}
          />
        );
    }
  };

  render() {
    const { step } = this.state;

    return (
      <>
        <Preference />

        <div className="dashboard">
          <h5>Send Payment | Step {step} of 3</h5>
          {this.showStep()}
        </div>
      </>
    );
  }
}
