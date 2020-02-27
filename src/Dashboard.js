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
  invite: "/dashboard/invite",
  send: "/dashboard/send"
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

        <Route path={sidebarPaths.home} exact component={DBContent} />
        <Route path={sidebarPaths.invite} exact component={InviteContent} />
        <Route path={sidebarPaths.send} exact component={SendContent} />
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
