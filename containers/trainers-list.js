import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import ls from 'localstorage-ttl';
import { connect } from 'react-redux';

import { Spinner } from '../components/loading-indicator';

import trainersData from '../database/trainers-list.json';
import { getEmployeesListByRole } from '../apis/auth-api';
import '../public/assets/scss/card.scss';

class TrainersList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isClicked: false,
      trainersList: null
    };
    this.renderBox = this.renderBox.bind(this);
  }

  componentDidMount () {
    return getEmployeesListByRole("Trainer").then(response => {
      this.setState({trainersList: response})
    })
  }
  renderBox () {
    let card = ''
    if (this.state && this.state.trainersList) {
      if (this.state.trainersList.length) {
        card = this.state.trainersList.map((each, index) => {return <Col md={3} sm={4} key={index}>
                                                                      <div className="card" onClick={() => handleClick(index, this)}>
                                                                        {each.isSelected ? <Glyphicon className="checked" glyph="ok-circle"/> : ""}
                                                                        <div className="trainer-info">
                                                                          <Glyphicon className="icon"  glyph="user" />
                                                                          <span>{each.name}</span>
                                                                          <span>{each.team}</span>
                                                                          <span>{each.role}</span>
                                                                        </div>
                                                                      </div>
                                                                    </Col> })
      } else {
        card = <div className="text-center">No data Found</div>
      }
    }
    return card
  }
  render() {
    const { isLoading } = this.props;
    return(
      !isLoading ?
      <div className="card-container">
        <div className="title">Trainers List</div>
        <Row>
          {this.renderBox()}
        </Row>
      </div> : <Spinner />
    )
  }
}

function handleClick(index, instance) {
  trainersData.data[index].isSelected = !trainersData.data[index].isSelected;
  instance.setState({isClicked: true});
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading
  }
}

export default connect(mapStateToProps)(TrainersList);
