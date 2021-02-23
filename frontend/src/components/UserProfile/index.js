import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './UserProfile.css'
import '../../index.css'

const UserProfile = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  return (
    <>
      <p>{user.username}</p>
    </>
  )
}

export default UserProfile;