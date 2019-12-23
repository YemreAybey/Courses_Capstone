import React from 'react';
import { connect } from 'react-redux';
import { addToFavs, remFromFavs } from '../actions';
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

  removeFromFavs = () => {
    const { currentUser, selectedCourse, remFromFavs } = this.props;
    if (currentUser.status === 'Logged In') {
      remFromFavs(currentUser.token, selectedCourse);
    }
  };

  createFavIcon = () => {
    const { favs, selectedCourse } = this.props;
    const isInfav = favs.some(f => f.id === selectedCourse.id);
    if (isInfav) {
      return (
        <span className="favIcon" onClick={this.removeFromFavs}>
          <i className="fas fa-heart faved"></i>
        </span>
      );
    } else {
      return (
        <span className="favIcon" onClick={this.handleClick}>
          <i className="fas fa-heart unfaved"></i>
        </span>
      );
    }
  };

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
    const doesContainCourse = favs.some(c => c.id === selectedCourse.id);
    if (doesContainCourse) {
      return <span>Your Favourite</span>;
    } else {
      return (
        <span className="favButton">
          <span>Add to Favs by clicking the heart</span>
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
        <section className="noBook">
          <span>No Book Chosen </span>
        </section>
      );
    } else {
      return (
        <section className="detailSection">
          <article className="courseArea detailedCourse">
            <div className="imgArea">
              <img src={source} alt="logo" />
              {this.createFavIcon()}
            </div>
            <div className="courseInfo">{detail}</div>
            <div className="courseInfo">{author}</div>
            <div className="courseInfo">{duration}</div>
            {this.checkCourseInFavs()}
          </article>
        </section>
      );
    }
  }
}

const mapStateToProps = ({ selectedCourse, favs, currentUser }) => ({
  selectedCourse,
  favs,
  currentUser,
});
export default connect(mapStateToProps, {
  addToFavs,
  getFavourites,
  remFromFavs,
})(CourseDetail);
