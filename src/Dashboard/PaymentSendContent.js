import React, { Component } from 'react';
import { generateId } from "./DashboardUtils";

import Preference from "./Preference";
import PaymentSendForm from "./PaymentSendForm";
import PaymentSendProcessor from "./PaymentSendProcessor";
import PaymentSendConfirm from "./PaymentSendConfirm";

import { process_payment, get_profit } from "../Non-ML/non-ml"

const TRANSACTION_API = "http://localhost:8000/transaction/"
const PROCESSOR_API = "http://localhost:8000/user_data/"

const PROCS = { 1: "A", 2: "B", 3: "C" };

const CTR_MAPPING = {
  USA: 840,
  China: 156,
  Europe: 250,
  France: 250,
  Brazil: 76,
  Canada: 840,
  Mexico: 484,
  Germany: 276,
  India: 356,
  Russia: 276
};

export default class PaymentSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      weight: 5,

      // step 1
      ppid: "",
      amount: "",
      method: "",
      memo: "",
      source_currency: "",
      target_currency: "",

      // step 2
      processor: 0,
      processors: [ 
        { id: "A", score: 0, info: undefined },
        { id: "B", score: 0, info: undefined },
        { id: "C", score: 0, info: undefined }
      ],
      mlProcessors: null, 
      mlStatus: -1,

      status: NaN
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeProcessorScore = this.changeProcessorScore.bind(this);
  }

  changeProcessorScore() {
    const { weight, ppid, amount, source_currency, target_currency } = this.state;
    if (ppid === "" || amount === "" || source_currency === "" || target_currency === "") return;

    const info = this.props.ppinfo[ppid];

    const ccode = CTR_MAPPING[info.address.country];
    const w = weight / 10;
    const isFx = source_currency === target_currency;
    const source = parseInt(source_currency);
    const target = parseInt(target_currency);
    let amountF = parseFloat(amount);

    const result = process_payment(ccode, amountF, isFx, 1.0 - w, w);
    let updatedProcessors = [];
    result.sorted_keys.forEach(proc => {
      updatedProcessors.unshift({ id: proc, score: result.processors[proc].final_score, info: result.processors[proc] });
    });

    this.setState({ processors: updatedProcessors });

    const profits = get_profit(ccode, amountF, isFx);
    let formData = new FormData();
    formData.append("amount", amountF);
    formData.append("original_currency", source);
    formData.append("target_currency", target);
    formData.append("payor_id", info.payor_id);
    formData.append("payee_id", info.payee_id);
    formData.append("payor_payee_id", info.ppid);
    formData.append("fx", isFx);
    formData.append("country", ccode);

    let mlProcs = {};
    for (let proc in PROCS) {
      formData.set("processor", proc);
      formData.set("transaction_profit", (profits[PROCS[proc]] * weight).toFixed(2));

      let requestOptions = {
        method: "POST", 
        body: formData
      };

      fetch(PROCESSOR_API, requestOptions)
        .then(response => response.json())
        .then(result => { mlProcs[proc] = result[PROCS[proc]]; })
        .catch(error => console.log('error', error));
    }

    this.setState({ mlProcessors: mlProcs });
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
    formdata.append("ppid", this.props.ppinfo[parseInt(ppid)].ppid);
    formdata.append("processor", parseInt(processor) + 1);

    let requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(TRANSACTION_API, requestOptions)
      .then(response => { this.setState({ status: response.status }); return response.text(); })
      .then(result => { console.log(result); })
      .catch(error => console.log('error', error));

    this.setState({ isLoading: false });
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
    this.setState({ [input]: evt.target.value }, this.changeProcessorScore );
  };

  changeProcessor = value => {
    this.setState({ processor: value});
  };

  showStep = () => {
    const { step, weight, ppid, amount, method, memo, processor, processors, mlProcessors, status, source_currency, target_currency } = this.state;
    let name = "";
    if (ppid)
      name = this.props.ppinfo[parseInt(ppid)].info.first_name + " " + this.props.ppinfo[parseInt(ppid)].info.last_name;
    const values = { name, ppid, amount, method, memo, processor, processors, weight, source_currency, target_currency };

    switch (step) {
      case 1:
        return (
          <PaymentSendForm 
            ppinfo={this.props.ppinfo}
            handleChange={this.handleChange}
            nextStep={this.nextStep}
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
            mlProcessors={mlProcessors}
            changeProcessor={this.changeProcessor}
            values={values}
          />
        );

      case 3:
        return (
          <PaymentSendConfirm
            submit={this.handleSubmit}
            prevStep={this.prevStep}
            values={values}
            status={status}
            history={this.props.history}
          />
        );
      
      default:
        return <></>;
    }
  };

  render() {
    const { step, weight } = this.state;

    return (
      <>
        <Preference weight={weight} handleChange={this.handleChange} />

        <div className="dashboard">
          <h5>Send Payment | Step {step} of 3</h5>
          {this.showStep()}
        </div>
      </>
    );
  }
}
