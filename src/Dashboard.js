import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "react-sidebar";

import AppliedRoute from "./components/AppliedRoute"
import DBSidebar from "./Dashboard/SidebarContent";
import DBNavbar from "./Dashboard/DashboardNavbar";
import DBContent from "./Dashboard/DashboardContent";

import PayeeAddContent from "./Dashboard/PayeeAddContent";
import PayeeView from "./Dashboard/PayeeViewContent";
import PayeeManageContent from "./Dashboard/PayeeManageContent";

import PaymentSendContent from "./Dashboard/PaymentSendContent";
import PaymentManageContent from "./Dashboard/PaymentManageContent";

import Preference from "./Dashboard/Preference";

import { fetchUserTransactions, fetchPPInfo, fetchUserInfo } from "./Dashboard/TransactionUtils"
import { init } from "./Non-ML/non-ml"


// min-width: the window width is greater than X px
const mql = window.matchMedia(`(min-width: 768px)`);

// url paths
const sidebarPaths = {
  home: "/dashboard/home",
  payee_add: "/dashboard/payee/add",
  payee_view: "/dashboard/payee/view",
  payee_manage: "/dashboard/payee/manage",
  payment_send: "/dashboard/payment/send",
  payment_manage: "/dashboard/payment/manage",
  preference: "/dashboard/preference"
}


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      transactions: null,
      ppinfo: null,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.reloadData = this.reloadData.bind(this);
  }

  // called when the component is loaded
  componentDidMount() {
    console.log(this.props.userInfo.uid, this.props.userInfo.user_type);
    mql.addListener(this.mediaQueryChanged);
    setInterval(this.reloadData, 5000); // fetch user info every X seconds
    this.loadTransactions();
    this.loadPPInfo();
    init();
  }

  async loadPPInfo() {
    if (!this.props.isAuthenticated) return;
    const ppif = await fetchPPInfo(this.props.userInfo.uid, this.props.userInfo.user_type);
    const result = await fetchUserInfo(ppif);
    this.setState({ ppinfo: result });
  }

  async loadTransactions() {
    if (!this.props.isAuthenticated) return;
    const trans = await fetchUserTransactions(this.props.userInfo.uid, this.props.userInfo.user_type);
    this.setState({ transactions: trans });
  }

  // called when the component is removed
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  reloadData() {
    this.loadTransactions();
    this.loadPPInfo();
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
        sidebar={<DBSidebar paths={sidebarPaths} usertype={this.props.userInfo.user_type} />}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        shadow={false}
        styles={overrideDefaultStyles}

        sidebarId="db-sidebar"
        contentClassName={this.state.sidebarDocked ? "sidebar-docked" : "sidebar-collapsed"}
      >
        <DBNavbar name={this.props.userInfo.first_name} openSidebar={this.onSetSidebarOpen} {...this.props} />

        {/* Base on different path, router-dom will render different component */}
        <Switch>  { /* TODO: Look up difference between switch and no switch */ }
          <AppliedRoute path={sidebarPaths.home} exact component={DBContent} appProps={{...this.state, userType: this.props.userInfo.user_type}} />

          <AppliedRoute path={sidebarPaths.payee_add} exact component={PayeeAddContent} appProps={this.props.userInfo} />
          <AppliedRoute path={sidebarPaths.payee_view} exact component={PayeeView} appProps={this.state} />
          <AppliedRoute path={sidebarPaths.payee_manage} exact component={PayeeManageContent} appProps={this.state} />

          <AppliedRoute path={sidebarPaths.payment_send} exact component={PaymentSendContent} appProps={this.state} />
          <AppliedRoute path={sidebarPaths.payment_manage} exact component={PaymentManageContent} appProps={{...this.state, userType: this.props.userInfo.user_type}} />

          <Route path={sidebarPaths.preference} exact component={Preference} />
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
