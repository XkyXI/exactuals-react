import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

class SidebarContent extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">

        {/* Heading: logo */}
        <Link to={this.props.paths.home}>
          <div className="sidebar-heading">
            <img alt="logo" src="/logo.png"/>
          </div>
        </Link>

        {/* List of navigation link */}
        <ListGroup variant="flush">
          <NavLink to={this.props.paths.home} className="list-group-item list-group-item-action">Home</NavLink>
          <NavLink to={this.props.paths.invite} className="list-group-item list-group-item-action">Invite Payee</NavLink>
          <NavLink to={this.props.paths.send} className="list-group-item list-group-item-action">Send Payment</NavLink>
        </ListGroup>

      </div>
    );  
  }
}

SidebarContent.propTypes = {
  name: PropTypes.string
};

export default SidebarContent;
