import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter } from '../actions';
import CATEGORIES from '../lib/categories';

const FILTERS = ['All', ...CATEGORIES];

class FilterCourses extends Component {
  onChange = e => {
    const { changeFilter } = this.props;
    changeFilter(e.target.value);
  };
  render() {
    return (
      <div className="select-style">
        <select onChange={this.onChange}>
          {FILTERS.map(c => (
            <option key={c} value={c === 'All' ? '' : c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
FilterCourses.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};

export default connect(null, { changeFilter })(FilterCourses);
