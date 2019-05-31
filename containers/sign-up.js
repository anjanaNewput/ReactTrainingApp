import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ls from 'localstorage-ttl';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';

import { registerUser, getAllDepts } from '../apis/auth-api';
import * as paths from '../utils/routes-names';

import '../public/assets/scss/form.scss';

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

class SignUpForm extends React.Component {
	constructor(props) {
	  super(props);
		this.submit = this.submit.bind(this);
  }

  submit(values) {
    let data = {
      'name': values.name,
      'email': values.email,
      'password': values.password,
      'role': values.role,
      'dept_id': values.team
    }
    return registerUser(values, this.props);
	}
  componentDidMount () {
    return getAllDepts().then(response => {
      this.setState({depts: response});
    })
  }
  render () {
    const { error, handleSubmit, submitting } = this.props;
    const renderDepts = this.state && this.state.depts ? this.state.depts.map(dept => {
      return <option value={dept.id} key={dept.name}>{dept.name}</option>
    }) : ''
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3} sm={6} smOffset={3}>
          <div className="form-layout">
            <div className="title-box">
              <span className="title">Sign Up</span>
            </div>
            { error && <p className="text-danger error"> { error } </p> }
            <Form horizontal onSubmit= {handleSubmit(this.submit)} style={{padding: "15px"}}>
              <Field
               name="name"
               type="text"
               component={renderField}
               label="User Name"
               controlId="name"
              />
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
                controlId="email"
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
                controlId="password"
              />
              <Field
                name="team"
                component={renderSelectField}
                label="Team"
                controlId="team"
              >
                <option value="" hidden>Select Team</option>
                {this.state && this.state.depts ? renderDepts : <option value="" hidden>No Dept</option>}
              </Field>
              <Field
               name="role"
               component={renderSelectField}
               label="Role"
               controlId="roel"
              >
               <option value="" hidden>Select Role</option>
               <option value="Trainee">Trainee</option>
               <option value="Trainer">Trainer</option>
               <option value="Admin">Admin</option>
              </Field>
              <div className="form-group">
                <Col sm={9} smOffset={3}>
                 <Button type="submit" bsStyle="primary" disabled={submitting}>Sign Up</Button>
                 <span><Link to={paths.SIGNIN}>Login</Link> if already registered</span>
                </Col>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
};

function validate (values) {
	const errors = {};
	if (!values.name) {
			errors.name = "Enter User Name";
	}
	if (!values.email) {
			errors.email = "Enter Email";
	}
	if (!values.team) {
			errors.team = "Select Team";
	}
	if (values.email && !/^[a-zA-Z0-9._-]+@newput+\.com$/i.test(values.email)) {
			errors.email = "Enter a valid email address"
	}
	if (!values.password) {
			errors.password = "Enter Password";
	}
	return errors;
}

export default reduxForm({
  form: "signup", // a unique identifier for this form
	validate
})(SignUpForm);
