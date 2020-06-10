import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { NavDropdown, Nav, Navbar } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

class DashboardNavbar extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.openSidebar(true);
  }

  onSignOut(e) {
    e.preventDefault();
    this.props.setAuthenticated(false);
    this.props.history.push("/");
  }

  render() {
    return (
      <Navbar bg="white" className="db-navbar">

        <button className="navbar-toggler" type="button" onClick={this.onToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown id="basic-nav-dropdown" title={"Welcome " + this.props.name}>
              <Link to="/dashboard/home" className="dropdown-item">Profile</Link>
              <Link to="/dashboard/home" className="dropdown-item">Settings</Link>
            </NavDropdown>
            <Nav.Link onClick={this.onSignOut}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );  
  }
}

export default DashboardNavbar;

// TODO: Check PropTypes