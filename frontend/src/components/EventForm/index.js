import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './EventForm.css'
import '../../index.css'

const EventForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  // if (user) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ image, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password and Password fields must match']);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };


  return (
    <div className='formDiv signupFormDiv'>
      <form onSubmit={handleSubmit} className='form signupForm'>
        <ul>
          {errors.map((err, id) => <li key={ id } >{ err }</li>)}
        </ul>
        <div className='formTitleDiv'>
          <h2 className='formTitle'>Sign up</h2>
        </div>
        <label className='labels top' >Email:
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
        <label>
          <input type='file' onChange={ updateFile } />
        </label>
        <button className='submit' type='submit'>Sign up</button>
      </form>
      <div>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <img
              style={{ width: "150px" }}
              src={user.profileImageUrl}
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventForm;
