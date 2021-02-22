import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css'
import '../../index.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password and Password fields must match']);
  };

  return (
    <div className='formDiv signupFormDiv'>
      <form onSubmit={handleSubmit} className='form signupForm'>
        <ul>
          {errors.map((err, id) => <li key={ id } >{ err }</li>)}
        </ul>
        <label className='labels' >
          <input
            type='text'
            placeholder='Email'
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label className='labels'>
          <input
            type='username'
            placeholder='Username'
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
            required
          />
        </label>
        <label className='labels'>
          <input
            type='password'
            placeholder='Password'
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
            />
        </label>
        <label className='labels'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={ confirmPassword }
            onChange={ (e) => setConfirmPassword(e.target.value) }
            required
            />
        </label>
        <button className='submit' type='submit'>Sign Up for this shizzz</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
