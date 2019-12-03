import React from 'react';
import { connect } from 'react-redux';
import { addToFavs } from '../actions';
import { getFavourites } from '../actions';
import reactLogo from '../assets/imgs/react-logo.png';
import rubyLogo from '../assets/imgs/ruby-logo.png';
import railsLogo from '../assets/imgs/rails-logo.png';
import jsLogo from '../assets/imgs/js-logo.png';

class CourseDetail extends React.Component {
  componentDidMount() {
    const { getFavourites, currentUser, favs } = this.props;
    if (currentUser.status === 'Logged In' && !favs[0]) {
      getFavourites(currentUser.token);
    }
  }

  handleClick = () => {
    const { selectedCourse, addToFavs, currentUser } = this.props;
    if (currentUser.status === 'Logged In') {
      addToFavs(currentUser.token, selectedCourse.id);
    } else {
      alert('Please Login');
    }
  };
  checkCourseInFavs = () => {
    const { favs, selectedCourse } = this.props;
    const doesContainCourse = favs.some(
      c => c.author === selectedCourse.author
    );
    if (doesContainCourse) {
      return <div>This is one of your favourite courses</div>;
    } else {
      return (
        <span className="favButton" onClick={this.handleClick}>
          <i className="fas fa-star"></i>
          <span>Add to Favourites</span>
        </span>
      );
    }
  };
  render() {
    const { author, detail, duration } = this.props.selectedCourse;
    const source =
      detail === 'React'
        ? reactLogo
        : detail === 'Rails'
        ? railsLogo
        : detail === 'Ruby'
        ? rubyLogo
        : jsLogo;
    if (!author) {
      return (
        <div className="noBook">
          <span>No Book Chosen </span>
        </div>
      );
    } else {
      return (
        <div className="courseArea">
          <img src={source} alt="logo" />
          <div>{detail}</div>
          <div>{author}</div>
          <div>{duration}</div>
          {this.checkCourseInFavs()}
        </div>
      );
    }
  }
}

const mapStateToProps = ({ selectedCourse, favs, currentUser }) => ({
  selectedCourse,
  favs,
  currentUser,
});
export default connect(mapStateToProps, { addToFavs, getFavourites })(
  CourseDetail
);
