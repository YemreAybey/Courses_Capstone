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
    const { currentUser, jwt } = this.props;
    return (
      <div>
        <div>{`${currentUser.username}'s token =  ${jwt}`}</div>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps, { signup })(Signup);
