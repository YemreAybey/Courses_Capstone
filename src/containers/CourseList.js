import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCourses } from '../actions/index';
import Course from '../components/Course';
import { getFavourites } from '../actions';

class CourseList extends Component {
  componentDidMount() {
    const { fetchCourses, getFavourites, currentUser } = this.props;
    fetchCourses();
    if (currentUser.status === 'Logged In') {
      getFavourites(currentUser.token);
    }
  }

  render() {
    const { courses } = this.props;
    const { filter } = this.props;
    const filterCourses = (courses, filter) =>
      filter ? courses.filter(c => c.detail === filter) : courses;
    const filteredCourses = filterCourses(courses, filter);
    return (
      <section>
        <section className="courseList">
          {filteredCourses.map(c => (
            <Course
              key={c.id}
              id={c.id}
              author={c.author}
              duration={c.duration}
              detail={c.detail}
            />
          ))}
        </section>
      </section>
    );
  }
}
const mapStateToProps = ({ courses, filter, currentUser, favs }) => ({
  courses,
  filter,
  currentUser,
  favs,
});

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  fetchCourses: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  courses: [{}],
};
export default connect(mapStateToProps, { fetchCourses, getFavourites })(
  CourseList
);
