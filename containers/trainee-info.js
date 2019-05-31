import React, { Component } from "react";
import ls from "localstorage-ttl";

let trainee_data;

export default class TraineeInfo extends Component {
  constructor(props){
    super(props);
    let coursesAssignedToTrainee ;
    let selectedTrainee = ls.get("selectedTrainee");
    let traineeName = ls.get(this.props.selectedTrainee.name.split(" ").join("_"));
    if(traineeName) {
      coursesAssignedToTrainee = traineeName.courses.map(course => {
        return course.title;
      })
    } else {
      coursesAssignedToTrainee = ["None"]
    }

    trainee_data = {
      name: selectedTrainee.name,
      team: selectedTrainee.team,
      course_assigned: coursesAssignedToTrainee
    };
    ls.set("trainee_data", trainee_data);
    this.state= {
      value:""
    }
  }

  
  render(){
    let trainee = ls.get("trainee_data");
    return (
      <div className="row trainee-data">
        <div className="col-sm-6 data-part">
          <span>Name:</span>&nbsp;&nbsp;
          <span>{trainee.name}</span>
        </div>
        <div className="col-sm-6 data-part">
          <span>Team:</span>&nbsp;&nbsp;
          <span>{trainee.team}</span>
        </div>
        <div className="col-sm-6 data-part">
          <span>Course assigned:</span>&nbsp;&nbsp;
          <span>{trainee.course_assigned.join(", ")}</span>
        </div>
      </div>
    );
  }
}
