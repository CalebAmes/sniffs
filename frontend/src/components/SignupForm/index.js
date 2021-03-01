import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { body2 } from '../index';
import './SignupForm.css';
import '../../index.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    body2()
  }, []);

  if (user) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors){
            setErrors(data.errors);
          }
        });
    }
    return setErrors(['Confirm Password and Password fields must match']);
  };

  return (
    <>
        {errors.map((err, id) => <div className='errors' key={ id } >{ err }</div>)}
    <div className='formDiv SignupFormDiv'>
      <form onSubmit={ handleSubmit } className='form SignupForm'>
        <div className='formTitleDiv'>
          <h2 className='formTitle'>Sign up</h2>
        </div>
        <label className='labels top'>Email:
          <input
            type='text'
            className='input'
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label className='labels'>Username:
          <input
            type='username'
            className='input'
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
            required
          />
        </label>
        <label className='labels'>Password:
          <input
            type='password'
            className='input'
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
            />
        </label>
        <label className='labels'>Confirm password:
          <input
            type='password'
            className='input'
            value={ confirmPassword }
            onChange={ (e) => setConfirmPassword(e.target.value) }
            required
            />
        </label>
        <div className='submitDiv'>
          <button className='submit' type='submit'>Sign up</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default SignupForm;
