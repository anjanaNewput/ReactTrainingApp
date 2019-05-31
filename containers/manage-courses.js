import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Glyphicon, PanelGroup, Panel, Modal } from 'react-bootstrap';

import FormContainer from './form-container-courses';
import { getAllCourses, deleteCourseById, getAllDepts } from '../apis/auth-api';
import { Spinner } from '../components/loading-indicator';

class ManageCourse extends Component {
  constructor(props) {
    super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.editPanel = this.editPanel.bind(this);
    this.deletePanel = this.deletePanel.bind(this);
    this.allCourses = this.allCourses.bind(this);
    this.fetchAllDepts = this.fetchAllDepts.bind(this);

    this.state = {
      courses: null,
      depts: null,
      show: false,
      isEdit: false,
      selectedCourse : null
    }
  }

  componentDidMount () {
    this.allCourses()
    this.fetchAllDepts()
  }

  editPanel (course) {
    this.handleModalOpen(true, course)
  }

  deletePanel (id) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      return deleteCourseById (id).then(response => {
        this.allCourses();
      })
    }
  }

  handleModalClose (isEdit, selectedCourse) {
    this.setState({ show: false, isEdit, selectedCourse });
  }

  handleModalOpen (isEdit, selectedCourse) {
    this.setState({ show: true, isEdit, selectedCourse });
  }

  allCourses () {
    return getAllCourses().then(response => {
      this.setState({
        courses: response
      })
    }).catch(error => {
      console.log("error");
    });
  }

  fetchAllDepts () {
    return getAllDepts().then(response => {
      this.setState({
        depts: response
      })
    }).catch(error => {
      console.log("error");
    });
  }

  render() {
    const { isLoading } = this.props;
    return(
      !isLoading ? <div className="container">
        <div className="course-list-container">
          <div className="title"><span>Courses</span></div>
          <PanelGroup
            accordion
            id="panel-group"
          >
            {renderPanel(this, this.state)}
          </PanelGroup>
        </div>
        <div className="add-icon" onClick={() => this.handleModalOpen(false, null)}><Glyphicon glyph="plus-sign" /></div>
        <Modal show={this.state.show} onHide={() => this.handleModalClose(false, null)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.isEdit ? 'Edit' : 'Add'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer isEdit={this.state.isEdit} course={this.state.selectedCourse} handleModalClose={() => this.handleModalClose(false, null)} allCourses={this.allCourses} allDepts={this.state.depts}/>
          </Modal.Body>
        </Modal>
      </div> : <Spinner />
    )
  }
}

function renderPanel (_this, _state) {
  let panelElement = '';
  if (_state && _state.courses) {
    if (_state.courses.length) {
      panelElement = _state.courses.map((course, index) => {
        let eKey = `${course.id}`
        return  <Panel key={course.id} eventKey={eKey}>
                  <Panel.Heading>
                    <Panel.Title>
                      <Panel.Toggle>{course.name}</Panel.Toggle>
                      <Glyphicon glyph="trash" className="pull-right" role="button" onClick={() => _this.deletePanel(course.id)} />
                      <Glyphicon glyph="pencil" className="pull-right" role="button" onClick={() => _this.editPanel(course)} />
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    <div><b>Duration:</b> {course.duration}</div>
                    {course.content ? course.content.split(',').map((desc, index) => {
                      return <p key={index}>{desc}</p>
                    }) : ''}
                    <ul>
                      { course.assignment ? course.assignment.split(',').map(data => {
                        return <li key={data}>{data}</li>
                      }) : <li>No assignment available</li>}
                    </ul>
                  </Panel.Body>
                </Panel>
      })
    } else {
      panelElement = <div className="text-center">No Data Found</div>
    }
  } else {
    panelElement = <Spinner />
  }
  return panelElement
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading
  }
}

export default withRouter(connect(mapStateToProps)(ManageCourse));
