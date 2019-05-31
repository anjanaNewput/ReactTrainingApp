import React from "react";
import TraineesList from "./trainees-list.js";
import traineesData from "../database/trainees-list.json";
import ls from "localstorage-ttl";

class AssignCourse extends React.Component {
  constructor(props) {
    super(props)
    this.tileClicked = this.tileClicked.bind(this);
  }

  tileClicked(index, instance) {
    instance.state.selectedTrainees.indexOf(instance.state.allTrainees[index]) == -1 ? instance.state.selectedTrainees.push(instance.state.allTrainees[index]) : instance.state.selectedTrainees.splice(instance.state.selectedTrainees.indexOf(instance.state.allTrainees[index]), 1);
    instance.state.allTrainees[index].isSelected = !instance.state.allTrainees[index].isSelected;
    let allTrainees = instance.state.allTrainees;
    ls.set("allTrainees", allTrainees);
    instance.setState({allTrainees});

  }
  render() {
    return(
      <TraineesList tileClicked={this.tileClicked} history={this.props.history} isNextAllowed={true}/>
    );
  }
}

export default AssignCourse;
