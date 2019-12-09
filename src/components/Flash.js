import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteErrorMessage } from '../actions';

class Flash extends Component {
  handleClick = () => {
    const { deleteErrorMessage } = this.props;
    deleteErrorMessage();
  };
  render() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <section className="flash">
          <span>{errorMessage}</span>
          <span onClick={this.handleClick} className="closeMessage">
            {' '}
            &times;{' '}
          </span>
        </section>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ errorMessage }) => ({ errorMessage });

export default connect(mapStateToProps, { deleteErrorMessage })(Flash);
