import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        <>
          <div>
            <Link to="/" className="brand">
              CapCourses
            </Link>
          </div>
          <div className="navbar">
            <Link to="/favourites" className="navLink">
              Favourites
            </Link>
            <div className="rightNav">
              <Link to="/signup" className="navLink">
                Signup
              </Link>
              <Link to="/login" className="navLink">
                Login
              </Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <Link to="/" className="brand">
              CapCourses
            </Link>
          </div>
          <div className="navbar">
            <Link to="/favourites" className="navLink">
              Favourites
            </Link>
            <div className="rightNav">
              <span className="navLink username">
                {currentUser.user.toUpperCase()}
              </span>
              <span onClick={this.handleLogOut} className="navLink logout">
                Log Out
              </span>
            </div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps, { logOut })(Navbar);
