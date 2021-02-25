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

  if (sessionUser) {
    return (
      <nav className='navbar'>
        <div>
          <NavLink className='link' exact to='/'>Home</NavLink>
        </div>
        <div>
          <ProfileButton className='link' user={ sessionUser } />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className='navbar'>
        <div>
          <NavLink onClick={ body1 } className='link' exact to='/'>Home</NavLink>
        </div>
        <div>
          <NavLink onClick={ body2 } className='link' to='/login'>Log In</NavLink>
        </div>
        <div>
          <NavLink onClick={ body2 } className='link lastLink' to='/signup'>Sign Up</NavLink>
        </div>
      </nav>
    );
  }
}

export default Navigation;