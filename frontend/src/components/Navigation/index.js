import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink exact to='/'>Home</NavLink>
        </li>
        <li>
          <ProfileButton user={ sessionUser } />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink exact to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Log In</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <ul className='navbar'>
      { isLoaded && sessionLinks }
    </ul>
  );
}

export default Navigation;