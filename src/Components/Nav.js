import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { connect } from 'react-redux';
import { Input, Menu, Segment, Dropdown } from 'semantic-ui-react'


const Nav = ({username}) => {
  const [activeItem, setActiveItem] = useState('home');

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")){
            dispatch(userActions.getUserFromDB(localStorage.token))
        }
    })

    const handleLogout = () => {
        dispatch(userActions.logoutUser());
    };

    let handleItemClick = (e, { name }) => setActiveItem(name)
  
    let renderIfLoggedIn = () => {
      if(localStorage.token){
        return (
          <Menu.Menu position='right'>
            <Menu.Item>
              <span>Logged in: {username}</span>
            </Menu.Item>
            <Menu.Menu vertical="true" className='simple'>
              <Dropdown item icon='ellipsis vertical' simple>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} name='mylists' to='/mylists'  active={activeItem === 'mylists'} onClick={handleItemClick}>My Lists</Dropdown.Item>
                  <Dropdown.Item as={Link} name='logout' to='/'  active={activeItem === 'home'} onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu.Menu>
      )}
      return <Menu.Menu position='right'>
          <Menu.Item
            as={Link}
            name='signup'
            to='/signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
          >
          Sign up
          </Menu.Item>
  
          <Menu.Item
            as={Link}
            name='login'
            to='/login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
          >
          Login
          </Menu.Item>
        </Menu.Menu>
    }

  return (
    <>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            name='home'
            to='/'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            name='discussion'
            to='/discussion'
            active={activeItem === 'discussion'}
            onClick={handleItemClick}
          />
          {renderIfLoggedIn()}  
        </Menu>
      </Segment>
      <Input className="searchBar" icon='search' placeholder='Search...' />
    </>
  );
};

const mapStateToProps = (state) => ({username: state.username})
export default connect(mapStateToProps, null)(Nav)
