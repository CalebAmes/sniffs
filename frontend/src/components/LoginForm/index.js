import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'
import '../../index.css'

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if(sessionUser) return (
    <Redirect to='/' />
  );
  
  const demoLogin = () => {
    body1();
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    body1();
    return dispatch(sessionActions.login({ credential, password }))
    .catch(async (res) => {
        const data = await res.json();
        if(data?.errors) {
          body2();
          setErrors(data.errors);
        }
      });
  }
  return (
    <>
    <div className='formDiv loginFormDiv'>
      <form className='form loginForm' onSubmit={ handleSubmit }>
        {errors.map((err, id) => <div className='errors' key={id}>{err}
        </div>)}
        <div className='formTitleDiv'>
          <h2 className='formTitle'>Log in</h2>
        </div>
        <label className='labels top'>Username or Email address:
          <input
            className='input'
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='labels'>Password:
          <input
            className='input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className='submitDiv'>
          <button className='submit' type='submit'>Log in</button>
          <button className='submit' type='button' onClick={ demoLogin }>Demo</button>
        </div>
      </form>
    </div>
    <div className='bottom'></div>
    </>
  );
}

export default LoginForm;