import React from 'react';
import { Checkbox } from 'react-bootstrap';
import ReactStars from 'react-stars';
import ls from 'localstorage-ttl';
import StarsRating from 'react-stars-rating';


export const Assignments = (props) => {
  const ratingChanged = (newRating => {
    console.log(newRating);
  });
  const assignmentsContainer = props.all_assigned_courses.map((each, index) => {
    let id = `#${index}`;
    return (
      <div className='row' key={index}>
        <div className='col-sm-4'>
          <div className='panel-group' id='accordion'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h4 className='panel-title'>
                  <a data-toggle='collapse' data-parent='#accordion' href={id}>{each.title}
                    <span className='glyphicon glyphicon-chevron-down pull-right'></ span>
                  </a>
                </h4>
              </div>
              <div id={index} className='panel-collapse collapse'>
                <div className='panel-body'>
                  <ul>
                    {each.description.map(content => {
                      return (
                      <li key={content}>
                          {content}
                      </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4 rating-star' key={index}>
          <ReactStars
             char={'★'}
             count={5}
             onChange={ratingChanged}
             size={24}
             color1={'#cccccc'}
             color2={'#ffd700'}
          />
        </div>
        <div className='col-sm-2 text-center'>
          <Checkbox onChange={props.resetProgressBar} ></Checkbox>
        </div>
        <div className='col-sm-2 text-center'>
          <a href='#'>Assignment Link</a>
        </div>
      </div>
    );
  });
  return (
    <div className='assignments'>{assignmentsContainer}</div>
  );
};
