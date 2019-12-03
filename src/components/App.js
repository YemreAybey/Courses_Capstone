import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CourseList from '../containers/CourseList';
import Login from './routes/Login';
import Signup from '../components/routes/Signup';
import Navbar from '../components/Navbar';
import Favourites from '../containers/Favourites';
import CourseDetail from '../containers/CourseDetail';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <Route
              path="/Courses_Capstone"
              exact
              render={props => <CourseList {...props} />}
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

export default App;
