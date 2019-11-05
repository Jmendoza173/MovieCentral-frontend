import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions.js';

const Signup = props => {
 
  const dispatch = useDispatch();

  
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: ''
  });

  
  const handleChange = e =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('looking into props', props)
    const { history } = props;
    console.log('sign up',signupForm)
    if (!!dispatch(userActions.newUserToDB(signupForm)))
        history.push('/')
  }
 
  const { username, password } = signupForm;

  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup Page</h1>
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

export default Signup;
