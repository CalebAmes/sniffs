import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import EventForm from './components/EventForm'
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={ isLoaded } />
      { isLoaded && (
      <Switch>
        <Route path='/createEvent'>
          <EventForm />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path='/'>
          <LandingPage />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
