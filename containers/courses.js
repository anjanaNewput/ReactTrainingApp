import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import AllCoursesDropTarget from "../components/all-courses-drop-target";
import DraggableListItem from "../components/draggable-list-item";
import AssignedCoursesDropTarget from "../components/assigned-courses-drop-target";
import ls from "localstorage-ttl";

let listGroupItems;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.handleAssignedCourses = this.handleAssignedCourses.bind(this);
  }

  handleAssignedCourses() {
    let selectedTrainees = ls.get("selectedTrainees");
    let courses = ls.get("assignedCourses");
    for(let i = 0; i < selectedTrainees.length; i++) {
      let key = selectedTrainees[i].name.split(" ").join("_");
      let traineeData = {courses};
      ls.set(key, traineeData);
    }
    this.props.history.push("/home");
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="data-container">
          <div className="row">
            <div className="next-btn-wrapper text-left col-sm-5"><button className="btn btn-primary next-btn" onClick={() => {this.props.history.push("/assign-course")}}>Previous</button></div>
            <div className="next-btn-wrapper text-right col-sm-6"><button className="btn btn-primary next-btn" onClick={this.handleAssignedCourses}>Save</button></div>
          </div>
          <AllCoursesDropTarget />
          <div className="col-sm-2 text-center navigation-arrow">
            <div className="arrow-btn"><i className="glyphicon glyphicon-chevron-left "></i></div>
            <div className="arrow-btn"><i className="glyphicon glyphicon-chevron-right "></i></div>
          </div>
          <AssignedCoursesDropTarget/>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Courses);
