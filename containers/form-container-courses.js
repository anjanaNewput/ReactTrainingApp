import React, { Component } from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { initializeFormState } from '../actions/user-action';
import { updateCourseById, addCourse, getAllDepts } from '../apis/auth-api';

const renderField = ({input, label, type, controlId, meta: { touched, error, warning }}) => (
  <FormGroup controlId={ controlId }>
    <Col componentClass={ControlLabel} sm={3}>{ label }</Col>
    <Col sm={8}>
      <FormControl {...input} placeholder={ label } type={ type } />
      { touched && error && <div className="text-danger"> { error } </div>  }
    </Col>
  </FormGroup>
);

const renderSelectField = ({ input, label, controlId, meta: { touched, error }, children }) => (
  <FormGroup controlId={ controlId }>
    <Col componentClass={ControlLabel} sm={3}>{ label }</Col>
    <Col sm={8}>
      <FormControl {...input} placeholder={ label } componentClass="select">
        {children}
      </FormControl>
      { touched && error && <div className="text-danger"> { error } </div>  }
    </Col>
  </FormGroup>
);

class FormContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount () {
    if (this.props.isEdit) {
      let data = {
                    name: this.props.course.name,
                    dept_id: this.props.course.dept_id,
                    assignment: this.props.course.assignment,
                    content: this.props.course.content,
                    duration: this.props.course.duration
                  }
    }
    this.props.load(this.props.course)
  }

  submit (values) {
    let data = {
                  name: values.name,
                  dept_id: values.deptId,
                  assignment: values.assignment,
                  content: values.content,
                  duration: values.duration
               }
    if (this.props.isEdit) {
      return updateCourseById(this.props.course.id, data).then(response => {
        this.props.allCourses()
        this.props.handleModalClose(false, null)
      }).catch(error => {
        console.log("error");
      })
    } else {
      return addCourse(data).then(response => {
        this.props.allCourses()
        this.props.handleModalClose(false, null)
      }).catch(error => {
        console.log("error");
      })
    }
  }

  render () {
    const { error, handleSubmit, submitting } = this.props;
    const rendrChild = this.props.allDepts.map(dept => {
      return <option value={dept.id} key={dept.id}>{dept.name}</option>
    })
    return (
      <Form horizontal onSubmit= {handleSubmit(this.submit)}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Course Name"
          controlId="name"
        />
        <Field
          name="content"
          type="text"
          component={renderField}
          label="Course content"
          controlId="content"
        />
        <Field
          name="assignment"
          type="text"
          component={renderField}
          label="Assignment"
          controlId="assignment"
        />
        <Field
          name="duration"
          type="text"
          component={renderField}
          label="Duration"
          controlId="duration"
        />
        <Field
          name="deptId"
          type="text"
          component={renderSelectField}
          label="Department"
          controlId="deptId"
          children={rendrChild}
        />
        <FormGroup>
          <Col sm={9} smOffset={3}>
            <Button type="submit" bsStyle="primary" disabled={submitting}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

FormContainer = reduxForm({
 form: "courseForm", // a unique identifier for this form
 enableReinitialize: true
})(FormContainer);

FormContainer = connect(
  state => ({
    initialValues: state.user.formData // pull initial values from account reducer
  }),
  { load: initializeFormState } // bind account loading action creator
)(FormContainer)

export default FormContainer
