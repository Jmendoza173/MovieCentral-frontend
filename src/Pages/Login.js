import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';

const LoginPage = props => {
  
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = e => {
      e.preventDefault();
      // console.log("info being send",loginForm)
    dispatch(userActions.loginUserToDB(loginForm));
    props.history.push('/');
  };

  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const { username, password } = loginForm;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input type="submit" />
    </form>
  );
};

export default LoginPage;