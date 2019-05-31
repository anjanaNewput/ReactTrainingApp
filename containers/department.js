import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { PanelGroup, Panel, Glyphicon, Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';

import { Spinner } from '../components/loading-indicator';

import { getAllDepts, deleteDeptById, addDeparment, updateDeparmentById } from "../apis/auth-api";
import "../public/assets/scss/dept.scss"

const renderField = ({ input, label, controlId, meta: {touched, error} }) => (
  <FormGroup controlId={ controlId }>
    <Col componentClass={ControlLabel} sm={3}>{ label }</Col>
    <Col sm={8}>
      <FormControl {...input} placeholder={ label } componentClass="input" type="text"></FormControl>
      { touched && error && <div className="text-danger"> { error } </div> }
    </Col>
  </FormGroup>
);

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      allDepts: null,
      dept: null,
      isEdit: false,
      isLoading: false
    };
    this.deletePanel = this.deletePanel.bind(this);
    this.editPanel = this.editPanel.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.allDepartments = this.allDepartments.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount () {
    this.allDepartments();
  }

  onChange (event, dept) {
    if (this.state.isEdit) {
      this.setState({dept: {id: dept.id, name: event.target.value}})
    } else {
      this.setState({dept: {id: '', name: event.target.value}})
    }
  }

  deletePanel (dept) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      return deleteDeptById(dept.id).then(response => {
        this.allDepartments();
      })
    }
  }

  editPanel (dept) {
    this.handleOpenModal(true, dept);
  }

  handleOpenModal (isEdit, dept) {
    this.setState({show: true, isEdit, dept});
  }

  handleCloseModal () {
    this.setState({show: false, isEdit: false, dept: null});
  }

  submit (event) {
    event.preventDefault();
    if (this.state.isEdit) {
      return updateDeparmentById(this.state.dept.id, this.state.dept.name).then(response => {
        this.handleCloseModal()
        this.allDepartments()
      })
    } else {
      return addDeparment(this.state.dept).then(response => {
        this.handleCloseModal()
        this.allDepartments()
      })
    }
  }

  allDepartments () {
    return getAllDepts().then(response => {
      this.setState({allDepts: response});
    }).catch(error => {
      console.log("error");
    })
  }

  render () {
    const {isLoading} = this.props;
    return (
      !isLoading ?
      <div className="dept-container">
        {renderPanel(this, this.state)}
        <div className="add-icon" onClick={()=> this.handleOpenModal(false, null)}><Glyphicon glyph="plus-sign" /></div>
        <Modal show={this.state.show} onHide={() => this.handleCloseModal(false, null)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{this.state.isEdit ? 'Edit' : 'Add'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.submit}>
              <FormGroup htmlFor="name">
                <Col componentClass={ControlLabel} sm={3}>Team</Col>
                <Col sm={8}>
                  <FormControl placeholder="Team" componentClass="input" type="text" name="name" value={this.state.dept ? this.state.dept.name : ''} onChange={(event) => this.onChange(event, this.state.dept)}></FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
      					<Col sm={9} smOffset={3}>
                  <Button bsStyle="primary" type="submit">Submit</Button>
      					</Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </div> : <Spinner />
    )
  }
}

function renderPanel (_this, _state) {
  let panelElement = '';
  if (_state && _state.allDepts) {
    if (_state.allDepts.length) {
      panelElement = _state.allDepts.map((dept) => {
        let eKey = `${dept.id}`
        return <Panel key={dept.id} eventKey={eKey}>
                <Panel.Heading>
                  <Panel.Title>
                    {dept.name}
                    <Glyphicon glyph="trash" className="pull-right" role="button" onClick={() => _this.deletePanel(dept)}/>
                    <Glyphicon glyph="pencil" className="pull-right" role="button" onClick={() => _this.editPanel(dept)}/>
                  </Panel.Title>
                </Panel.Heading>
              </Panel>
      })
    } else {
      panelElement = <div className="text-center">No Data Found</div>
    }
  }
  return panelElement
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading
  }
}
export default connect(mapStateToProps)(Department);
