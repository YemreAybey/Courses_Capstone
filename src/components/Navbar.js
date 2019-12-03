import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FilterCourses from '../components/FilterCourses';
import { logOut } from '../actions';

class Navbar extends React.Component {
  handleLogOut = () => {
    const { logOut } = this.props;
    logOut();
  };
  render() {
    const { currentUser } = this.props;
    if (currentUser.status === 'No Login') {
      return (
        <div>
          <Link to="/">CapCourses </Link>
          <Link to="/favourites">Favourites</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/">CapCourses </Link>
          <Link to="/favourites">Favourites</Link>
          <span> {currentUser.user}</span>
          <button type="button" onClick={this.handleLogOut}>
            Log Out
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps, { logOut })(Navbar);
