import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter } from '../actions';
import reactLogo from '../assets/imgs/react-logo.png';
import rubyLogo from '../assets/imgs/ruby-logo.png';
import railsLogo from '../assets/imgs/rails-logo.png';
import jsLogo from '../assets/imgs/js-logo.png';
import allLogo from '../assets/imgs/all.png';

class FilterCourses extends Component {
  onClick = e => {
    const { changeFilter } = this.props;
    const filter = e.target.id !== 'All' ? e.target.id : '';
    changeFilter(filter);
    this.props.history.push('/courses');
  };
  render() {
    return (
      <section className="filterArea">
        <h1>Which courses would you like to see?</h1>
        <div className="filters">
          <article className="clickableFilter">
            <img src={allLogo} alt="logo" id="All" onClick={this.onClick} />
            <span>All Courses</span>
          </article>
          <article className="clickableFilter">
            <img src={railsLogo} alt="logo" id="Rails" onClick={this.onClick} />
            <span>Rails Courses</span>
          </article>
          <article className="clickableFilter">
            <img src={rubyLogo} alt="logo" id="Ruby" onClick={this.onClick} />
            <span>Ruby Courses</span>
          </article>
          <article className="clickableFilter">
            <img src={reactLogo} alt="logo" id="React" onClick={this.onClick} />
            <span>React Courses</span>
          </article>
          <article className="clickableFilter">
            <img
              src={jsLogo}
              alt="logo"
              id="Javascript"
              onClick={this.onClick}
            />
            <span>JS Courses</span>
          </article>
        </div>
      </section>
    );
  }
}
FilterCourses.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};

export default connect(null, { changeFilter })(FilterCourses);
