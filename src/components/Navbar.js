import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions';
import ls from 'local-storage';

class Navbar extends React.Component {
  handleLogOut = () => {
    const { logOut } = this.props;
    ls.set('currentUser', null);
    logOut();
  };
  render() {
    const { currentUser } = this.props;
    if (currentUser.status === 'No Login') {
      return (
        <>
          <header>
            <Link to="/" className="brand">
              <h1>CapCourses</h1>
            </Link>
          </header>
          <nav className="navbar">
            <Link to="/favourites" className="navLink">
              Favourites
            </Link>
            <section className="rightNav">
              <Link to="/signup" className="navLink">
                Signup
              </Link>
              <Link to="/login" className="navLink">
                Login
              </Link>
            </section>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <header>
            <Link to="/" className="brand">
              <h1>CapCourses</h1>
            </Link>
          </header>
          <nav className="navbar">
            <Link to="/favourites" className="navLink">
              Favourites
            </Link>
            <section className="rightNav">
              <span className="navLink username">
                {currentUser.user.toUpperCase()}
              </span>
              <span onClick={this.handleLogOut} className="navLink logout">
                Log Out
              </span>
            </section>
          </nav>
        </>
      );
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps, { logOut })(Navbar);
