import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signup } from '../../actions';

class Signup extends Component {
  renderInput = ({ input, ph, meta }) => {
    return (
      <div>
        <input {...input} placeholder={ph} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="error-field">{error}</div>;
    }
  };

  handleSubmit = formValues => {
    const { signup } = this.props;
    signup(formValues);
  };
  render() {
    return (
      <section className="formArea signUpArea">
        <form
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
          className="form signupForm"
        >
          <Field name="username" component={this.renderInput} ph="username" />
          <Field
            name="email"
            component={this.renderInput}
            ph="example@gmail.com"
          />
          <Field name="password" component={this.renderInput} ph="password" />
          <Field
            name="password_confirmation"
            component={this.renderInput}
            ph="password_confirmation"
          />
          <button type="submit" className="formButton">
            Signup
          </button>
        </form>
      </section>
    );
  }
}

const validate = ({ username, email, password, password_confirmation }) => {
  const errors = {};

  if (!username) {
    errors.username = 'Please enter username';
  } else if (username.length < 3) {
    errors.username = 'Username is too short';
  }

  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    errors.email = 'You must enter an email';
  } else if (!regex.test(email)) {
    errors.email = 'Please enter a proper email';
  }

  if (!password) {
    errors.password = 'You must enter a password';
  } else if (password.length < 6) {
    errors.password = 'Password is too short';
  }
  if (!password_confirmation) {
    errors.password_confirmation = 'Please confirm your password';
  } else if (password_confirmation !== password) {
    errors.password_confirmation = 'Not equal to password';
  }
  return errors;
};

const Wrapper = reduxForm({
  form: 'SignUp Form',
  validate,
})(Signup);
export default connect(null, { signup })(Wrapper);
