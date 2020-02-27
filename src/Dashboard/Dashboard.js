import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "react-sidebar";

import DBSidebar from "./SidebarContent";
import DBContent from "./DashboardContent";
import InviteContent from "./InviteContent";
import SendContent from "./SendContent";

// min-width: the window width is greater than X px
const mql = window.matchMedia(`(min-width: 700px)`);

// url paths
const paths = {
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
        sidebar={<DBSidebar name="Ilie" paths={paths}/>} 
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        sidebarId="db-sidebar"
        shadow={false}
        styles={overrideDefaultStyles}
      >
        <Route path={paths.home} exact component={DBContent} />
        <Route path={paths.invite} exact component={InviteContent} />
        <Route path={paths.send} exact component={SendContent} />
      </Sidebar>
    );
  }
}

export default Dashboard;

// styles for overriding the default styles
const overrideDefaultStyles = {
  sidebar: {
    transition: "transform .1s ease-out", // default is .3s
    WebkitTransition: "-webkit-transform .1s ease-out",
  }
}
