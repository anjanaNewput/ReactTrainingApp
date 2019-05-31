import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Col, Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from "react-bootstrap";
import withRouter from "react-router-dom/withRouter";
import ls from 'localstorage-ttl';

import '../public/assets/scss/faqForm.scss';

const renderField = ({input, label, type, controlId, placeholder, componentClass, meta: { touched, error, warning }}) => (
  <FormGroup controlId={ controlId }>
    <Col componentClass={ControlLabel} md={3}>
      { label }
    </Col>
    <Col md={9}>
      <FormControl {...input} placeholder={ placeholder } type={ type } componentClass={componentClass}/>
      {touched && error && <div className="text-danger"> { error } </div>}
    </Col>
  </FormGroup>
);
const renderFile = ({ input: {value: omitValue, ...inputProps }, type, controlId, onChange, componentClass, meta: { touched, error, warning }, ...props}) => (
  <FormGroup controlId={ controlId }>
    <Col md={9} mdOffset={3}>
      <div className="upload-btn-wrapper">
        <Button className="upload-btn"> <Glyphicon glyph="paperclip"/></Button>
        <FormControl {...inputProps} {...props}  type={ type } componentClass={componentClass}/>
        {touched && error && <div className="text-danger"> { error } </div>}
      </div>
    </Col>
  </FormGroup>
);

class FAQForm extends Component {
	constructor(props) {
	  super(props);

    this.state = {
      queNo: 0,
      allFaqs: JSON.parse(ls.get("queAnswerList")) || []
    }
		this.submit = this.submit.bind(this);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  onFileChange (e) {
    this.setState({fileName: e.target.files[0].name})
  }
  submit(values) {
    let allFaqs = this.state.allFaqs;
    let faqObj = {};
    if (!this.props.isAnsModal) {
      faqObj = {
        qid: allFaqs && allFaqs.length ? allFaqs.length + 1 : 1,
        question: values.ques,
        ans: []
      }
      allFaqs.unshift(faqObj)
    } else {
      for (let i = 0; i < allFaqs.length; i++) {
        let ans = allFaqs[i].ans;
        if (this.props.question.qid === allFaqs[i].qid) {
          if (allFaqs[i].ans && allFaqs[i].ans.length) {
            ans.unshift({text: values.ans, img: values.url || ''})
          } else {
            ans.push({text: values.ans, img: values.url || '', attachment: values.attachment || ''})
          }
          faqObj = {
            qid: this.props.question.qid,
            question: values.ques,
            ans
          }
          allFaqs.splice(i, 1, faqObj);
        }
      }
    }
    ls.set("queAnswerList", JSON.stringify(allFaqs))
    this.props.handleModalClose()
	}
  componentDidMount () {
    if (this.props.isAnsModal) {
      this.handleInitialize();
    }
  }
  handleInitialize() {
    const initData = {
      "ques": this.props.question.question
    };
    this.props.initialize(initData);
  }

  render () {
    const { error, handleSubmit, submitting, pristine, isAnsModal } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit(this.submit)} style={{padding: "15px", marginTop: "15px"}}>
        <Field
					name="ques"
          controlId="ques"
					type="text"
					component={renderField}
					label="Question"
          placeholder="Question"
          componentClass="input"
			 />
     	{ this.props.isAnsModal ?
        <Field
          name="ans"
          controlId="ans"
          type="text"
          component={renderField}
          label="Answer"
          placeholder="Answer"
          componentClass="textarea"
        /> : ''}
        { this.props.isAnsModal ?
        <Field
          name="url"
          controlId="url"
          type="text"
          placeholder="https://example.com"
          component={renderField}
          label="Image"
          componentClass="input"
        /> : ''}
        { this.props.isAnsModal ?
          <Field
            name="attachment"
            controlId="attachment"
            type="file"
            component={renderFile}
            componentClass="input"
            onChange={this.onFileChange}
          />: ''}
          {this.state && this.state.fileName ? <p>{this.state.fileName}</p> : ''}
        <FormGroup>
					<Col sm={9} smOffset={3}>
             <Button bsStyle="primary" type="submit" disabled={pristine || submitting}>Submit</Button>
					</Col>
        </FormGroup>
      </Form>
    );
  }
};

function validate (values) {
	const errors = {};
	if (!values.ques) {
			errors.ques = "Enter Question";
	}
	if (!values.ans) {
			errors.ans = "Enter Answer";
	}
  if (values.url) {
    if(!/^https?:\/\/.*\.(?:png|jpg)/i.test(values.url)) {
      errors.url = "Enter a valid URL";
    }
  }
	return errors;
}

FAQForm = reduxForm({
  form: "FaqForm",
  validate
})(FAQForm);

export default withRouter(FAQForm);
