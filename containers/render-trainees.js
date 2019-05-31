import React, { Component } from "react";
import { Row, Col, Glyphicon } from "react-bootstrap";
import ls from "localstorage-ttl";
import "../public/assets/scss/card.scss";
import { withRouter } from "react-router-dom";

import TraineesList from "./trainees-list.js";
import traineesData from "../database/trainees-list.json";

class RenderTrainees extends Component {
  constructor(props) {
    super(props)
  }

  tileClicked(index, instance) {
    ls.set("selectedTrainee", traineesData.data[index]);
    instance.props.history.push(`/trainees/${traineesData.data[index].name}`);
  }

  render() {
    return(
      <TraineesList tileClicked={this.tileClicked} isNextAllowed={false} />
    );
  }
}
export default withRouter(RenderTrainees);
