import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from "react-router-dom";
import { ListGroup, Collapse } from "react-bootstrap";
import { isPayor } from "./TransactionUtils"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faUsers, faMap, faMoneyBill, faList, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default class SidebarContent extends Component {
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

          { isPayor(this.props.usertype) &&
            <><Link to="#" className="list-group-item list-group-item-action"
              onClick={() => this.setState({ payee: !payee })}
              aria-controls="payee"
              aria-expanded={payee}>Payee <FontAwesomeIcon icon={payee ? faChevronUp : faChevronDown} /> </Link>
            <Collapse in={this.state.payee}>
              <ListGroup id="payee" className="nest-list-group-parent">
                <NavLink to={this.props.paths.payee_add} className="list-group-item list-group-item-action">
                  <FontAwesomeIcon icon={faPlus} />
                  Add Payee
                </NavLink>
                <NavLink to={this.props.paths.payee_manage} className="list-group-item list-group-item-action">
                  <FontAwesomeIcon icon={faUsers} />
                  Manage Payee
                </NavLink>
                <NavLink to={this.props.paths.payee_invite} className="list-group-item list-group-item-action">
                  <FontAwesomeIcon icon={faMap} />
                  View Payee
                </NavLink>
              </ListGroup>
            </Collapse></>
          }

          <Link to="#" className="list-group-item list-group-item-action"
            onClick={() => this.setState({ payment: !payment })}
            aria-controls="payment"
            aria-expanded={payment}>Payment <FontAwesomeIcon icon={payment ? faChevronUp : faChevronDown} /> </Link>
          <Collapse in={this.state.payment}>
            <ListGroup id="payment" className="nest-list-group-parent">

              { isPayor(this.props.usertype) &&
                <NavLink to={this.props.paths.payment_send} className="list-group-item list-group-item-action">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  Send Payment
                </NavLink>
              }

              <NavLink to={this.props.paths.payment_manage} className="list-group-item list-group-item-action">
                <FontAwesomeIcon icon={faList} />
                Manage Payment
              </NavLink>
            </ListGroup>
          </Collapse>

          {/* <NavLink to={this.props.paths.preference} className="list-group-item list-group-item-action">Preference</NavLink> */}

        </ListGroup>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  usertype: PropTypes.string
};
