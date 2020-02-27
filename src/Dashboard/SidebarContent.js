import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from "react-router-dom";

class SidebarContent extends Component {
  render() {
    return (
      <div id="sidebar-wrapper">

        {/* Heading: user profile and name */}
        <Link to={this.props.paths.home}>
          <div className="sidebar-heading">
            <img alt="user profile" src="https://img.icons8.com/wired/64/000000/cat-profile.png"/>
            <div>{this.props.name}</div>
          </div>
        </Link>

        {/* List of navigation link */}
        <div className="list-group list-group-flush">
          <NavLink to={this.props.paths.home} className="list-group-item list-group-item-action">Home</NavLink>
          <NavLink to={this.props.paths.invite} className="list-group-item list-group-item-action">Invite Payee</NavLink>
          <NavLink to={this.props.paths.send} className="list-group-item list-group-item-action">Send Payment</NavLink>
        </div>

      </div>
    );  
  }
}

SidebarContent.propTypes = {
  name: PropTypes.string
};

export default SidebarContent;
