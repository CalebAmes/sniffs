import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <p>This is the landing page</p>
    </div>
  )
}

export default LandingPage;