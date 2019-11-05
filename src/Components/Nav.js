import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { connect } from 'react-redux';


const Nav = ({username}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")){
            dispatch(userActions.getUserFromDB(localStorage.token))
        }
    })

    const handleLogout = () => {
        dispatch(userActions.logoutUser());
    };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Link to="/">Home</Link>
      {localStorage.token ? <Link to="/" onClick={handleLogout}>Logout</Link> : null}
      <span>{username ? `Logged in: ${username}` : (<><Link to="/login">Login</Link> / 
      <Link to="/signup"> Signup</Link></>)}</span>
    </nav>
  );
};

const mapStateToProps = (state) => ({username: state.username})
export default connect(mapStateToProps, null)(Nav)
