import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCourse } from '../actions';
import reactLogo from '../assets/imgs/react-logo.png';
import rubyLogo from '../assets/imgs/ruby-logo.png';
import railsLogo from '../assets/imgs/rails-logo.png';
import jsLogo from '../assets/imgs/js-logo.png';

class Course extends React.Component {
  handleOnClick = () => {
    const { selectCourse, author, detail, duration, id } = this.props;
    const course = { author, detail, duration, id };
    selectCourse(course);
  };

  render() {
    const { id, detail } = this.props;
    const source =
      detail === 'React'
        ? reactLogo
        : detail === 'Rails'
        ? railsLogo
        : detail === 'Ruby'
        ? rubyLogo
        : jsLogo;
    return (
      <div onClick={this.handleOnClick} className="courseArea">
        <img src={source} alt="logo" />
        <div>{this.props.detail}</div>
        <div>{this.props.author}</div>
        <div>{this.props.duration}</div>
        <Link to={`course/${id}`} className="navLink">
          Click To See
        </Link>
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
