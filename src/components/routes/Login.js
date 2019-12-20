import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../actions';

class Login extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="error-field">{error}</div>;
    }
  };
  renderInput = ({ input, ph, meta }) => {
    return (
      <div>
        <input {...input} placeholder={ph} />
        {this.renderError(meta)}
      </div>
    );
  };
  handleSubmit = formValues => {
    const { login } = this.props;
    login(formValues);
  };
  render() {
    return (
      <section className="formArea">
        <form
          className="form"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          <Field
            name="email"
            component={this.renderInput}
            ph="example@gmail.com"
          />
          <Field name="password" component={this.renderInput} ph="password" />
          <button type="submit" className="formButton">
            Login
          </button>
        </form>
      </section>
    );
  }
}
const validate = ({ email, password }) => {
  const errors = {};
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
  return errors;
};
const Wrapper = reduxForm({
  form: 'login',
  validate,
})(Login);

export default connect(null, { login })(Wrapper);
