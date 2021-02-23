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
          <NavLink className='link' exact to='/'>Home</NavLink>
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
          <NavLink className='link' exact to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink className='link' to='/login'>Log In</NavLink>
        </li>
        <li>
          <NavLink className='link lastLink' to='/signup'>Sign Up</NavLink>
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