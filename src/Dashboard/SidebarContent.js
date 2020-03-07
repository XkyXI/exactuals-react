import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from "react-router-dom";
import { ListGroup, Collapse } from "react-bootstrap";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: false,
      payment: false
    };
  }

  render() {
    const { payee, payment } = this.state;

    return (
      <div id="sidebar-wrapper">

        {/* Heading: logo */}
        <Link to={this.props.paths.home}>
          <div className="sidebar-heading">
            <img alt="logo" src="/logo.png"/>
          </div>
        </Link>

        {/* TODO: Consider whether to use LinkContainer from react-router-boostrap */}
        {/* TODO: Use react-fontawesome components to use icons */}

        {/* List of navigation link */}
        <ListGroup variant="flush">
          <NavLink to={this.props.paths.home} className="list-group-item list-group-item-action">Home</NavLink>

          <Link to="#" className="list-group-item list-group-item-action"
            onClick={() => this.setState({ payee: !payee })}
            aria-controls="payee"
            aria-expanded={payee}>Payee</Link>
          <Collapse in={this.state.payee}>
            <ListGroup id="payee" className="nest-list-group-parent">
              <NavLink to={this.props.paths.payee_invite} className="list-group-item list-group-item-action">Invite Payee</NavLink>
              <NavLink to={this.props.paths.payee_manage} className="list-group-item list-group-item-action">Manage Payee</NavLink>
            </ListGroup>
          </Collapse>

          <Link to="#" className="list-group-item list-group-item-action"
            onClick={() => this.setState({ payment: !payment })}
            aria-controls="payment"
            aria-expanded={payment}>Payment</Link>
          <Collapse in={this.state.payment}>
            <ListGroup id="payment" className="nest-list-group-parent">
              <NavLink to={this.props.paths.payment_send} className="list-group-item list-group-item-action">Send Payment</NavLink>
              <NavLink to={this.props.paths.payment_manage} className="list-group-item list-group-item-action">Manage Payment</NavLink>
            </ListGroup>
          </Collapse>

        </ListGroup>
      </div>
    );  
  }
}

SidebarContent.propTypes = {
  name: PropTypes.string
};

export default SidebarContent;
