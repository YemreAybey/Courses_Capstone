import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ls from 'local-storage';
import CourseList from '../containers/CourseList';
import Login from './routes/Login';
import Signup from '../components/routes/Signup';
import Navbar from '../components/Navbar';
import Favourites from '../containers/Favourites';
import CourseDetail from '../containers/CourseDetail';
import Footer from './Footer';
import Flash from './Flash';
import FilterCourses from './FilterCourses';
import { createSession } from '../actions';
import { getFavourites } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { createSession, getFavourites } = this.props;
    const user = ls.get('currentUser');
    if (user) {
      createSession(user);
      getFavourites(user.token);
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="main">
            <Navbar />
            <Flash />
            <Route
              path="/courses"
              exact
              render={props => <CourseList {...props} />}
            />
            <Route
              path="/"
              exact
              render={props => <FilterCourses {...props} />}
            />
            <Route
              path="/favourites"
              exact
              render={props => <Favourites {...props} />}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route
              path="/course/:id"
              exact
              render={props => <CourseDetail {...props} />}
            />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { createSession, getFavourites })(App);
