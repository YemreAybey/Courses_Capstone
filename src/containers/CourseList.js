import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCourses } from '../actions/index';
import FilterCourses from '../components/FilterCourses';
import Course from '../components/Course';

class CourseList extends Component {
  componentDidMount() {
    const { fetchCourses } = this.props;
    fetchCourses();
  }

  render() {
    const { courses } = this.props;
    const { filter } = this.props;
    const filterCourses = (courses, filter) =>
      filter ? courses.filter(c => c.detail === filter) : courses;
    const filteredCourses = filterCourses(courses, filter);
    return (
      <div>
        <FilterCourses />
        {filteredCourses.map(c => (
          <Course
            key={c.id}
            author={c.author}
            duration={c.duration}
            detail={c.detail}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = ({ courses, filter }) => ({ courses, filter });

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  fetchCourses: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  courses: [{}],
};
export default connect(mapStateToProps, { fetchCourses })(CourseList);
