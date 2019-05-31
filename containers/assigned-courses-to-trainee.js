import React, { Component } from "react";
import ls from "localstorage-ttl";

import { Assignments } from "../components/assignments";
import TraineeInfo from "./trainee-info";
import listOfAllCourses from "../database/course-list.json";
import "../public/assets/scss/traineesDetails.scss";

export default class AssignedCoursesToTrainee extends Component {
  constructor(props){
    super(props);
    this.increase = this.increase.bind(this);

    let coursesAssignedToTrainee ;
    let selectedTrainee = ls.get("selectedTrainee");
    let traineeName = ls.get(selectedTrainee.name.split(" ").join("_"));
    if(traineeName) {
      coursesAssignedToTrainee = traineeName.courses.map(course => {
        return course;
      })
    } else {
      coursesAssignedToTrainee = [{
        "courseId": "1",
        "title": "HTML5",
        "description": ["This course includes the overview of HTMl5. Detail knowledge of html page including header tags(meta, title, script and link), body tags(covers all the important html tags).", "Learn in detail about html page layout, HTML tag attributes, all the new semantics tags of HTML5, Media tags and HTML5 Api."],
        "duration": "5 Days",
        "rating": "0"
      }]
    }
    this.state ={
      status: 0.0,
      data : coursesAssignedToTrainee
    };
  }

  increase(event) {
    let delta = 100/this.state.data.length;
    if(event.target.checked){
      this.setState({ status: this.state.status + delta });
    } else {
      this.setState({ status: this.state.status - delta });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <TraineeInfo selectedTrainee={ls.get("selectedTrainee")}/>
        <Assignments all_assigned_courses={this.state.data} resetProgressBar={this.increase} selectedTrainee={ls.get("selectedTrainee")} status={this.state.status}/>
      </div>
    );
  }
}
