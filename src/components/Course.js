import React from 'react';
import PropTypes from 'prop-types';

const Course = props => {
  return (
    <div>
      <div>{props.author}</div>
      <div>{props.detail}</div>
    </div>
  );
};

Course.propTypes = {
  author: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

export default Course;
