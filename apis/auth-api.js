import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { setValidUserInfo, setToken, getToken } from '../utils/data-storage';
import ls from 'localstorage-ttl';

import '../utils/interceptor';

const LOGIN_API = 'login';
const SINGUP_API = 'register';
const EMPLOYEES = 'employees';
const EMP = 'employee';
const ALL_DEPARTMENTS = 'departments';
const DEPARTMENT = 'department';
const ADD_DEPT = 'add-dept';
const ALL_COURSES = 'courses';
const COURSE = 'course';
const ADD_COURSE = 'add-course';
const EDIT_COURSE = 'edit-course';
const DELETE_COURSE = 'remove-course';

export function validateUser (data, instance) {
  return axios.post(LOGIN_API, data).then(function (response) {
    if (response && response.data) {
      setValidUserInfo(response.data);
      return response.data;
    }
  }).catch(function (error) {
    throw new SubmissionError({'_error': 'Invalid email or password'});
  });
}

export function registerUser (data, instance) {
  return axios.post(SINGUP_API, data).then(function (response) {
    if (response && response.data) {
      setValidUserInfo(response.data);
      instance.history.push('/home')
    }
  }).catch(function (error) {
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function getEmployeesListByRole (role) {
  return axios.get(EMPLOYEES, {params: {role}}).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function changeEmpRole (role, empId) {
  return axios.put(EMP, {role}, {params: {id: empId}}).then(function (response) {
    if (response) {
      return response;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function deleteEmpById (empId) {
  return axios.delete(EMP, {params: {id: empId}}).then(function (response) {
    if (response) {
      return response;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function getAllDepts () {
  return axios.get(ALL_DEPARTMENTS).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function deleteDeptById (deptId) {
  return axios.delete(DEPARTMENT, {params: {id: deptId}}).then(function (response) {
    if (response) {
      return response;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function getDeptById (deptId) {
  return axios.get(DEPARTMENT, {params: {id: deptId}}).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function addDeparment(deptData) {
  return axios.post(ADD_DEPT, {name: deptData.name}).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function updateDeparmentById (deptId, deptName) {
  return axios.put(DEPARTMENT, {name: deptName}, {params: {id: deptId}}).then(function (response) {
    if (response) {
      return response;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function getAllCourses () {
  return axios.get(ALL_COURSES).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function deleteCourseById (id) {
  return axios.delete(DELETE_COURSE, {params: {id}}).then(function (response) {
    if (response) {
      return response;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function getCourseById (id) {
  return axios.get(DEPARTMENT, {params: {id}}).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function addCourse (courseData) {
  return axios.post(ADD_COURSE, courseData, {name: courseData.name}).then(function (response) {
    if (response && response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}

export function updateCourseById (id, data) {
  return axios.put(EDIT_COURSE, data, {params: {id}}).then(function (response) {
    if (response) {
      return response;
    }
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response);
    throw new SubmissionError({'_error': 'Something went wrong'});
  });
}
