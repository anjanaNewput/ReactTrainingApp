import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { getValidUserInfo } from '../utils/data-storage';
import * as paths from '../utils/routes-names';

export const HomePage = (() => {
  let user = getValidUserInfo();
  return (
    <div className="form-layout text-center">
      {(user.role === 'admin' || user.role === 'Admin') ?
        <ul className="page-nav-links">
          <li className="page-link"><Link to={paths.MANAGE_COURSE}>Manage Courses</Link></li>
          <li className="page-link"><Link to={paths.ASSIGN_COURSE}>Assign Courses</Link></li>
          <li className="page-link"><Link to={paths.ALL_EMP_LIST}>All Employees</Link></li>
          <li className="page-link"><Link to={paths.TRAINERS_LIST}>Trainers</Link></li>
          <li className="page-link"><Link to={paths.TRAINEES}>Trainee Detail</Link></li>
          <li className="page-link"><Link to={paths.DEPARTMENT}>Department/Team</Link></li>
          <li className="page-link"><Link to={paths.FAQ}>FAQ</Link></li>
        </ul>
        :
        <ul className="page-nav-links">
          <li className="page-link"><Link to={paths.TRAINERS_LIST}>Trainers</Link></li>
          <li className="page-link"><Link to={paths.TRAINEES}>Trainee Detail</Link></li>
          <li className="page-link"><Link to={paths.FAQ}>FAQ</Link></li>
        </ul>}
    </div>
  );
});
