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

  const profile = () => {
    history.push('/profile');
  }
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  }

  const createEvent = () => {
    history.push('/createEvent');
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);


  return (
    <>
      <div>
        <button className='link dogButton button' onClick={ openMenu }>
          <i className='fas fa-dog' />
        </button>
      </div>
      <div>
      {showMenu && (
        <div className='profileDropdown'>
          <h2>{user.username}</h2>
          <button className='button link dropDown' onClick={profile}>Profile</button>
          <button className='button link dropDown' onClick={ logout }>Log out</button>
          <button className='button link dropDown' onClick={ createEvent }>Create event</button>
        </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;