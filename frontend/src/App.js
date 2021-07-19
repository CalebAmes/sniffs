import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import EventForm from './components/EventForm';
import ProfileForm from './components/ProfileForm';
import EventPage from './components/EventPage';
import CategoryPage from './components/CategoryPage';
import * as sessionActions from './store/session';
import { getEvent } from './store/event';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getEvent()).then(() => {
      dispatch(sessionActions.restoreUser())
    }).then(() => setIsLoaded(true))
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={ isLoaded }/>
      { isLoaded && (
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/category/:id'>
          <CategoryPage />
        </Route>
        <Route path='/event/:id'>
          <EventPage />
        </Route>
        <Route path='/editProfile'>
          <ProfileForm />
        </Route>
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
          <SignupForm />
        </Route>
        <Route>
          <LandingPage/>
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
