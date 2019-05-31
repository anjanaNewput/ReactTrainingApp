// routes
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import ls from 'localstorage-ttl';
import { withRouter } from 'react-router-dom';

import { Welcome } from '../components/welcome';
import Faq from '../components/faq';
import { HomePage } from '../components/home-page';
import App from '../containers/App';
import SignInForm from '../containers/sign-in';
import SignUpForm from '../containers/sign-up';
import TrainersList from '../containers/trainers-list';
import TraineesList from '../containers/trainees-list';;
import ManageCourse from '../containers/manage-courses';
import Courses from '../containers/courses';
import AssignCourse from '../containers/assign-courses';
import TraineeDetails from '../containers/trainee-details';
import TraineeData from '../containers/trainee-data';
import RenderTrainees from '../containers/render-trainees';
import Department from '../containers/department';
import AssignedCoursesToTrainee from '../containers/assigned-courses-to-trainee';
import AllEmp from '../containers/all-employees';

import { store } from './store';
import * as paths from './routes-names';

function loggedIn() {
  if(ls.get('isUserLoggedIn')) {
    return true;
  } else {
    return false;
  }
}

const routes = (
  <Provider store={ store }>
    <App>
      <Switch>
        <Redirect exact from="/" to={paths.WELCOME} />
        <Route exact path={paths.WELCOME} render={(props) => (loggedIn() ? (<Redirect to={paths.HOME} />) : (<Welcome history={props.history} />))} />
        <Route exact path={paths.SIGNIN} render={(props) => (loggedIn() ? (<Redirect to={paths.HOME} />) : (<SignInForm history={props.history}/>))} />
        <Route exact path={paths.SIGNUP} render={(props) => (loggedIn() ? (<Redirect to={paths.HOME} />) : (<SignUpForm history={props.history}/>))} />
        <Route exact path={paths.TRAINERS_LIST} render={(props) =>(
          !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
          : (<TrainersList history={props.history}/>)
        )}/>
        <Route exact path={paths.HOME} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<HomePage />)
        )}/>
        <Route exact path={paths.MANAGE_COURSE} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<ManageCourse />)
        )}/>
        <Route exact path={paths.ASSIGN_COURSE} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<AssignCourse history={props.history} />)
        )}/>
        <Route exact path={`${paths.COURSES}`} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<Courses history={props.history}/>)
        )}/>
        <Route exact path={paths.TRAINEES} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<RenderTrainees />)
        )}/>
        <Route exact path={`${paths.TRAINEES}/:trainee`} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<AssignedCoursesToTrainee history={props.history}/>)
        )}/>
        <Route exact path={paths.FAQ} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<Faq history={props.history}/>)
        )}/>
        <Route exact path={paths.ALL_EMP_LIST} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<AllEmp />)
        )}/>
        <Route exact path={paths.DEPARTMENT} render={(props) =>(
            !loggedIn() ? ( <Redirect to={paths.SIGNIN} />)
            : (<Department />)
        )}/>
      </Switch>
    </App>
  </Provider>
);
export default routes;
