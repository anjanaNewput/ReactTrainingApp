import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import ls from 'localstorage-ttl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spinner } from '../components/loading-indicator';
import { getEmployeesListByRole } from '../apis/auth-api';

let selectedTrainees = [];
class TraineesList extends Component {
  constructor(props) {
    super(props);
    this.renderBox = this.renderBox.bind(this);
    this.chooseTrainee = this.chooseTrainee.bind(this);
    this.state = {
      selectedTrainees : [],
      allTrainees: null
    }
  }

  componentDidMount() {
    return getEmployeesListByRole('Trainee').then(response => {
      this.setState({allTrainees: response})
    })
  }

  chooseTrainee() {
    ls.set('selectedTrainees', this.state.selectedTrainees);
    this.props.history.push('/courses');
  }

  renderBox() {
    let card = ''
    if (this.state && this.state.allTrainees) {
      if (this.state.allTrainees.length) {
        card = this.state.allTrainees.map((each, index) => {return <Col md={3} sm={4} key={index}>
          <div className="card" onClick={() => this.props.tileClicked(index, this)}>
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
    return (
      !isLoading ?
      <div className="card-container">
        <div className="title">Trainees List</div>
        {this.props.isNextAllowed ? <div className="text-right next-btn-wrapper"><button className="btn btn-primary next-btn" onClick={this.chooseTrainee}>Next</button></div> : ""}
        <Row>
          {this.renderBox()}
        </Row>
      </div> : < Spinner />
    );
  }
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading
  }
}

export default withRouter((connect)(mapStateToProps)(TraineesList));
