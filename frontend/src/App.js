import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation, { NavItem, Dropdown } from './components/Navigation';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import EventForm from './components/EventForm';
import ProfileForm from './components/ProfileForm';
import CategoryPage from './components/CategoryPage'
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={ isLoaded }>
      </Navigation>
      { isLoaded && (
      <Switch>
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
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/:id'>
          <CategoryPage />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
