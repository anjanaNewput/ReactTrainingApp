import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getEmployeesListByRole, changeEmpRole, deleteEmpById } from '../apis/auth-api';
import { Spinner } from '../components/loading-indicator';

import "../public/assets/scss/all-emps.scss";

class AllEmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empList: null,
      empRole: ''
    }
    this.renderEmployess = this.renderEmployess.bind(this);
    this.actionTrigrred = this.actionTrigrred.bind(this);
    this.setEmpRole = this.setEmpRole.bind(this);
    this.employeesListByRole = this.employeesListByRole.bind(this);
  }

  setEmpRole (event, each) {
    var options = this.state.empList;
    var value = event.target.value;
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].id === each.id && options[i].name === each.name && options[i].email === each.email && options[i].team === each.team && options[i].role === each.role) {
          options[i].role = value
      }
    }
    this.setState({empList: options})
    return changeEmpRole(value, each.id).then(response => {
      this.employeesListByRole()
    })
  }

  actionTrigrred (each) {
    return deleteEmpById(each.id).then(response => {
      this.employeesListByRole()
    })
  }

  renderEmployess () {
    let roles = ['Trainee', 'Trainer', 'trainee', 'trainer'];
    let employees = ''
    if (this.state && this.state.empList) {
      if (this.state.empList.length) {
        employees = this.state.empList.map((each, index) => {
         return (
           <tr key={each.name}>
             <td>{index+1}</td>
             <td>{each.name}</td>
             <td>{each.team}</td>
             <td>
               {(each.role === 'admin' || each.role === 'Admin') ? each.role :
                 <form>
                   <select name={index} value={each.role} onChange={(event) => {this.setEmpRole(event, each)}}>
                     {roles.map(role => {
                       return <option key={role}>{role}</option>
                     })}
                   </select>
                 </form>
               }
             </td>
             <td><Button bsStyle="primary" bsSize="xsmall" onClick={() => this.actionTrigrred(each)} disabled={(each.role === 'admin' || each.role === 'Admin')}>Delete</Button></td>
           </tr>);
       })
      } else {
        employees = <tr><td colSpan="5" className="text-center">No Data Found</td></tr>
      }
    } else {
      employees = <tr><td colSpan="5" className="text-center"><Spinner /></td></tr>
    }

    return employees
  }

  componentDidMount () {
    this.employeesListByRole()
  }

  employeesListByRole () {
    return getEmployeesListByRole().then(response => {
      this.setState({empList: response});
    })
  }

  render () {
    const { isLoading } = this.props;
    return (
      !isLoading ?
      <div className="employee-container">
        <div className="title"><span>All Employees List</span></div>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>SNo</th>
              <th>Name</th>
              <th>Team</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderEmployess()}</tbody>
        </Table>
      </div> : <Spinner />
    )
  }
}

function mapStateToProps (state) {
  return {
    isLoading: state.user.isLoading
  }
}

export default withRouter((connect)(mapStateToProps)(AllEmp));
