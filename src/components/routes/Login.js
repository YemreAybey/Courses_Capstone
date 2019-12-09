import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

class Login extends Component {
  state = { email: '', password: '' };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { login } = this.props;
    const userInfo = { ...this.state };
    this.setState({
      email: '',
      password: '',
    });
    login(userInfo);
    this.props.history.push('/');
  };
  render() {
    const { email, password } = this.state;
    return (
      <section className="formArea">
        <form className="form" onSubmit={this.handleSubmit}>
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
          <button type="submit" className="formButton">
            Login
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps, { login })(Login);
