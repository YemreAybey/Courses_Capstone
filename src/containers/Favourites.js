import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFavourites } from '../actions';
import Course from '../components/Course';

class Favourites extends Component {
  componentDidMount() {
    const { getFavourites, currentUser } = this.props;
    if (currentUser.status === 'Logged In') getFavourites(currentUser.token);
  }

  render() {
    const { favs, currentUser } = this.props;
    if (currentUser.status === 'No Login') {
      return <div>Please Login To See Your Favourite Courses</div>;
    } else if (!favs[0]) {
      return <div>You don't have any Favourite course</div>;
    } else {
      return (
        <div>
          {favs.map(c => (
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
}
const mapStateToProps = ({ favs, currentUser }) => ({ favs, currentUser });

Favourites.propTypes = {
  favs: PropTypes.arrayOf(PropTypes.object),
  getFavourites: PropTypes.func.isRequired,
};

Favourites.defaultProps = {
  favs: [{}],
};
export default connect(mapStateToProps, { getFavourites })(Favourites);
