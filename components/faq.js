import React from 'react';
import ls from 'localstorage-ttl';
import { Modal, Button, Panel, Jumbotron, Badge, Image } from 'react-bootstrap';

import FormComponent from "../containers/form-container-faq"

import '../public/assets/scss/faq.scss';

export default class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.state = {
      showAddModal: false,
      queAnswerList: JSON.parse(ls.get("queAnswerList")) || [],
      ans: '',
      isAnsModal: false,
      ques: null
    }
  }

  openModal(isAnsModal, ques) {
    this.setState({ showAddModal: true, isAnsModal, ques });
  }

  handleModalClose() {
    this.setState({ showAddModal: false, queAnswerList: JSON.parse(ls.get("queAnswerList")) });
  }

  render() {
    return(
      <div>
        <Jumbotron className="text-center">
          <h2>Frequently Asked Questions</h2>
          <p>Here you can ask question related to your course</p>
          <Button bsStyle="warning" onClick={() => {this.openModal(false)}}>Ask Question</Button>
        </Jumbotron>
        <div className="ques-container">
          {this.state.queAnswerList ? this.state.queAnswerList.map((ques, index)=> {
            return <Panel key={index} defaultExpanded>
                    <Panel.Heading>
                      <Panel.Title toggle>
                        Q: {ques.question}
                        <Button onClick={() => {this.openModal(true, ques)}} bsStyle="primary" bsSize="xsmall">Answer <Badge>{ques.ans.length}</Badge></Button>
                      </Panel.Title>
                    </Panel.Heading>
                    {ques.ans ?
                      <Panel.Collapse>
                          {ques.ans.map((ans, index)=> {
                            return <Panel.Body key={index}>
                                      <p >{ans.text}</p>
                                      {ans.img ? <Image src={ans.img} alt="img" responsive thumbnail /> : ''}
                                   </Panel.Body>
                              })
                          }
                      </Panel.Collapse>
                   : ''}
                  </Panel>
          }) : ''}
        </div>
        <Modal show={this.state.showAddModal} onHide={this.handleModalClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{this.state.isAnsModal ? "Give Answer" : "Ask Question"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.isAnsModal ?
              <FormComponent question={this.state.ques} isAnsModal={this.state.isAnsModal} handleModalClose={this.handleModalClose}/>
              :
              <FormComponent isAnsModal={this.state.isAnsModal} handleModalClose={this.handleModalClose}/>
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
