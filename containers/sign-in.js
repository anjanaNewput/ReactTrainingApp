import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import ls from "localstorage-ttl";
import { Row, Col, Form ,FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";

import { setUser } from "../actions/user-action.js";
import { validateUser } from "../apis/auth-api";
import * as paths from '../utils/routes-names';

const renderField = ({input, label, type, controlId, meta: { touched, error, warning }}) => (
  <FormGroup controlId={ controlId }>
    <Col componentClass={ControlLabel} sm={3}>{ label }</Col>
    <Col sm={8}>
      <FormControl {...input} placeholder={ label } type={ type } />
      { touched && error && <div className="text-danger"> { error } </div>  }
    </Col>
  </FormGroup>
);

class SignInForm extends Component {
	constructor(props) {
	  super(props);
		this.submit = this.submit.bind(this);
  }

  submit(values) {
    return validateUser(values).then(response => {
      this.props.loginUser(response.name);
      this.props.history.push("/home")
    })
  }

  render () {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3} sm={6} smOffset={3}>
          <div className="form-layout">
            <div className="title-box">
              <span className="title">Log In</span>
            </div>
            { error && <p className="text-danger error"> { error } </p> }
            <Form horizontal onSubmit={handleSubmit(this.submit)} style={{padding: "15px"}}>
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
              <div className="form-group">
                <Col sm={9} smOffset={3}>
                  <Button type="submit" bsStyle="primary" disabled={submitting}>LogIn</Button>
                  <span><Link to={paths.SIGNUP}>Register</Link> if not registered</span>
                </Col>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
};

const mapStateToProps = (state) => {
  if(state.user) {
    return {
      user: state.user.user
    };
  } else {
		return {};
	}
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({loginUser: setUser}, dispatch);
}

function validate (values) {
	const errors = {};
	if (!values.email) {
			errors.email = "Enter Email";
	}
  if (values.email && !/^[a-zA-Z0-9._-]+@newput+\.com$/i.test(values.email)) {
      errors.email = "Enter a valid email address"
  }
	if (!values.password) {
			errors.password = "Enter Password";
	}
	return errors;
}

SignInForm = reduxForm({
  form: "signin", // a unique identifier for this form
	validate
})(SignInForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
