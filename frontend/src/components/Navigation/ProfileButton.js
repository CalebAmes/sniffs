import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  }

  return (
    <>
      <button className='dogButton button' onClick={ openMenu }>
        <i className='fas fa-dog' />
      </button>
      {showMenu && (
        <div className='profile-dropdown'>
          <NavLink className='link dropDown' to='/profile'>{ user.username }</NavLink>
          <button className='button dropDown' onClick={ logout }>Log out</button>
          <NavLink className='link dropDown' to='/createEvent'>Create event</NavLink>
        </div>
      )}
    </>
  );
}

export default ProfileButton;