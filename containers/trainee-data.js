import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import ls from 'localstorage-ttl';

import { Assignments } from './assignments';
import TraineeInfo from './trainee-info';

import '../public/assets/scss/traineesDetails.scss';

import listOfAllCourses from '../database/course-list.json';

export default class TraineeData extends Component {
  constructor(props){
    super(props);
    this.increase = this.increase.bind(this);
    this.allAssignedCourses = this.allAssignedCourses.bind(this);

    this.state ={
      status: 0.0,
      data : ls.get('assignedCourses')
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

  allAssignedCourses () {
    let trainee_data = ls.get('trainee_data').course_assigned;
    let assigned = ls.get('assignedCourses');
    let allCourses = ls.get('allCourses');
    allCourses.map(data => {
      if(trainee_data.indexOf(data.title) !== -1) {
        assigned.push(data);
        ls.set('assignedCourses', assigned);
      }
    })

    this.setState({data: ls.get('assignedCourses')});
  }

  render() {
    return (
      <div className='container-fluid'>
        <TraineeInfo allAssignedCourses={this.allAssignedCourses} selectedTrainee={ls.get('selectedTrainee')}/>
        <div className='row'>
          <div className='col-sm-12'>
            <ProgressBar now={this.state.status} />
          </div>
        </div>
        <Assignments all_assigned_courses={this.state.data} resetProgressBar={this.increase} />
      </div>
    );
  }
}
