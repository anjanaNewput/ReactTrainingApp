import React, {Component} from "react";
import ls from "localstorage-ttl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import Grid from "react-bootstrap/lib/Grid";

import {Header} from "../components/header.js";
import {Footer} from "../components/footer.js";

import "../public/assets/scss/app.scss";
import "../public/assets/scss/form.scss";
import "../public/assets/scss/courses.scss";


class App extends Component {
    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
      this.getHomePath = this.getHomePath.bind(this);
      this.state = {
        user: ""
      };
    }

    logout() {
      localStorage.removeItem("isUserLoggedIn");
      localStorage.removeItem("LogInUser");
      this.setState({user: ""});
      this.props.history.push("/sign-in");
    }

    componentDidMount() {
      this.setState({user: ls.get("LogInUser")});
    }

    componentWillReceiveProps() {
      this.setState({user: ls.get("LogInUser")});
    }

    getHomePath() {
      this.props.history.push("/home");
    }
    render () {
        return(
          <div className="app">
            <Header logout={this.logout} user={this.state.user} getHomePath={this.getHomePath}/>
            <div className="wrapper">
              <Grid fluid>
                  {this.props.children}
              </Grid>
            </div>
            <Footer/>
          </div>
        );
    };
}

const mapStateToProps = (state) => {
  if(state.user) {
    return {
      user: state.user.user
    };
  } else {
    return {};
  }
};
App = DragDropContext(HTML5Backend)(App);

export default withRouter(connect(mapStateToProps)(App));
