import React from 'react';
import { connect } from 'react-redux';
import { addToFavs } from '../actions';
import { getFavourites } from '../actions';

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
        <button type="button" onClick={this.handleClick}>
          Add to Favourites
        </button>
      );
    }
  };
  render() {
    const { author, detail } = this.props.selectedCourse;
    if (!author) {
      return <div>No Book Chosen </div>;
    } else {
      return (
        <div>
          <div>{author}</div>
          <div>{detail}</div>
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
