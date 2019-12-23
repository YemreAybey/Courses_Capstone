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

  createFavIcon = () => {
    const { favs, id } = this.props;
    const isInfav = favs.some(f => f.id === id);
    if (isInfav) {
      return (
        <span className="favIcon">
          <i className="fas fa-heart faved"></i>
        </span>
      );
    } else {
      return (
        <span className="favIcon">
          <i className="fas fa-heart unfaved"></i>
        </span>
      );
    }
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
      <Link to={`course/${id}`} className="navLink area">
        <article onClick={this.handleOnClick} className="courseArea">
          <div className="imgArea">
            <img src={source} alt="logo" />
            {this.createFavIcon()}
          </div>
          <div className="courseInfo">{this.props.detail}</div>
          <div className="courseInfo">{this.props.author}</div>
          <div className="courseInfo">{this.props.duration}</div>
        </article>
      </Link>
    );
  }
}

Course.propTypes = {
  author: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

const mapStateToProps = ({ selectedCourse, favs }) => ({
  selectedCourse,
  favs,
});
export default connect(mapStateToProps, { selectCourse })(Course);
