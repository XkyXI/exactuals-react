import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "react-sidebar";

import DBSidebar from "./Dashboard/SidebarContent";
import DBNavbar from "./Dashboard/DashboardNavbar";
import DBContent from "./Dashboard/DashboardContent";
import InviteContent from "./Dashboard/InviteContent";
import SendContent from "./Dashboard/SendContent";

// min-width: the window width is greater than X px
const mql = window.matchMedia(`(min-width: 700px)`);

// url paths
const sidebarPaths = {
  home: "/dashboard/home",
  payee_invite: "/dashboard/payee/invite",
  payee_manage: "/dashboard/payee/manage",
  payment_send: "/dashboard/payment/send",
  payment_manage: "/dashboard/payment/manage",
}


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  // called when the component is loaded 
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  // called when the component is removed
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  // when the media query is met, hides the sidebar
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <Sidebar
        sidebar={<DBSidebar paths={sidebarPaths} />} 
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        shadow={false}
        styles={overrideDefaultStyles}

        sidebarId="db-sidebar"
        contentClassName={this.state.sidebarDocked ? "sidebar-docked" : "sidebar-collapsed"}
      >
        <DBNavbar name="User" openSidebar={this.onSetSidebarOpen} />

        {/* Base on different path, router-dom will render different component */}
        <Route path={sidebarPaths.home} exact component={DBContent} />

        <Route path={sidebarPaths.payee_invite} exact component={InviteContent} />
        <Route path={sidebarPaths.payee_manage} exact component={SendContent} />

        <Route path={sidebarPaths.payment_send} exact component={InviteContent} />
        <Route path={sidebarPaths.payment_manage} exact component={SendContent} />
        {/* TODO: consider using map */}
      </Sidebar>
    );
  }
}

export default Dashboard;

// styles for overriding the default styles
const overrideDefaultStyles = {
  sidebar: {
    transition: "transform .2s ease-out", // default is .3s
    WebkitTransition: "-webkit-transform .2s ease-out",
  }
}
