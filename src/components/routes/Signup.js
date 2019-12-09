import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions';

class Signup extends Component {
  state = { username: '', email: '', password: '', password_confirmation: '' };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signup } = this.props;
    const userInfo = { ...this.state };
    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
    signup(userInfo);
    this.props.history.push('/');
  };
  render() {
    const { username, email, password, password_confirmation } = this.state;
    return (
      <section className="formArea signUpArea">
        <form onSubmit={this.handleSubmit} className="form signupForm">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={this.handleInputChange}
          />

          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />

          <input
            type="text"
            placeholder="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="password_confirmation"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleInputChange}
          />
          <button type="submit" className="formButton">
            Signup
          </button>
        </form>
      </section>
    );
  }
}
const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps, { signup })(Signup);
