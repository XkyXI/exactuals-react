import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "react-sidebar";

import AppliedRoute from "./components/AppliedRoute"
import DBSidebar from "./Dashboard/SidebarContent";
import DBNavbar from "./Dashboard/DashboardNavbar";
import DBContent from "./Dashboard/DashboardContent";
import InviteContent from "./Dashboard/InviteContent";
import SendContent from "./Dashboard/SendContent";

import { fetchTransaction } from "./Dashboard/DashboardUtils"

// min-width: the window width is greater than X px
const mql = window.matchMedia(`(min-width: 768px)`);

// url paths
const sidebarPaths = {
  home: "/dashboard/home",
  payee_invite: "/dashboard/payee/invite",
  payee_manage: "/dashboard/payee/manage",
  payment_send: "/dashboard/payment/send",
  payment_manage: "/dashboard/payment/manage",
}

const TRANSACTION_API = "http://localhost:8000/transaction/"

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      transactions: null
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  // called when the component is loaded 
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this.onLoad();
  }

  async onLoad() {
    // if (!this.props.appProps.isAuthenticated) {
    //   return;
    // }
    const trans = await fetchTransaction(TRANSACTION_API);
    this.setState({ transactions: trans });
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
        <DBNavbar name={this.props.appProps.username} openSidebar={this.onSetSidebarOpen} {...this.props} />

        {/* Base on different path, router-dom will render different component */}
        <Switch>  { /* TODO: Look up difference between switch and no switch */ }
          <AppliedRoute path={sidebarPaths.home} exact component={DBContent} appProps={this.state} />

          <Route path={sidebarPaths.payee_invite} exact component={InviteContent} />
          <Route path={sidebarPaths.payee_manage} exact component={SendContent} />

          <Route path={sidebarPaths.payment_send} exact component={InviteContent} />
          <Route path={sidebarPaths.payment_manage} exact component={SendContent} />
        </Switch>
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
