import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCourse } from '../actions';

class Course extends React.Component {
  handleOnClick = () => {
    const { selectCourse, author, detail, duration, id } = this.props;
    const course = { author, detail, duration, id };
    selectCourse(course);
  };

  render() {
    const { id } = this.props;
    return (
      <div onClick={this.handleOnClick}>
        <div>{this.props.author}</div>
        <div>{this.props.detail}</div>
        <Link to={`course/${id}`}>Click To See</Link>
      </div>
    );
  }
}

Course.propTypes = {
  author: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

const mapStateToProps = ({ selectedCourse }) => ({ selectedCourse });
export default connect(mapStateToProps, { selectCourse })(Course);
