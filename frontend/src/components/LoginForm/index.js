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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if(data?.errors) setErrors(data.errors);
      });
  }
  return (
    <>
    <div className='formDiv loginFormDiv'>
      <form className='form loginForm' onSubmit={ handleSubmit }>
        <ul>
          {errors.map((err, id) => <li key={id}>{err}
          </li>)}
        </ul>
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
          <button className='submit' type='submit' disabled={errors.length}>Log in</button>
        </div>
      </form>
    </div>
    <div className='bottom'></div>
    </>
  );
}

export default LoginForm;