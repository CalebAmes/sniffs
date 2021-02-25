import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const body1 = () => {
    const body = document.getElementById('body');
    body.classList.add('body1');
    body.classList.remove('body2');
  }

  const body2 = () => {
    const body = document.getElementById('body');
    body.classList.add('body2');
    body.classList.remove('body1');
  }

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
          <NavLink onClick={ body1 } className='link' exact to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink onClick={ body2 } className='link' to='/login'>Log In</NavLink>
        </li>
        <li>
          <NavLink onClick={ body2 } className='link lastLink' to='/signup'>Sign Up</NavLink>
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