import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './EventForm.css'
import '../../index.css'

const EventForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [userId, setUserId] = useState('');
  // const [categoryId, setCategoryId] = useState(1);
  // const [errors, setErrors] = useState('');

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  // setUserId(user.id)
  // if (user) return <Redirect to='/' />;

  const handleSubmit = (e) => null;
  //   e.preventDefault();

  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data?.errors) setErrors(data.errors);
  //   });
  //   // return setErrors(['event errors']);
  // };

  return (
    <div className='formDiv SignupFormDiv'>
      <form onSubmit={handleSubmit} className='form SignupForm'>
        <ul>
          {/* {errors.map((err, id) => <li key={ id } >{ err }</li>)} */}
        </ul>
        <div className='formTitleDiv'>
          <h2 className='formTitle'>Create event</h2>
        </div>
        <label className='labels top' >Name:
          <input
            type='text'
            className='input'
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            required
          />
        </label>
        <label className='labels'>Description:
          <textarea
            type='text'
            className='input'
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
            required
          />
        </label>
        <label className='labels'>Start Date:
          <input
            type='datetime-local'
            className='input'
            value={ startDate }
            onChange={ (e) => setStartDate(e.target.value) }
            required
            />
        </label>
        <label className='labels'>End date:
          <input
            type='datetime-local'
            className='input'
            value={ endDate }
            onChange={ (e) => setEndDate(e.target.value) }
            required
            />
        </label>
        <label>
          {/* <input type='file' onChange={ updateFile } /> */}
        </label>
        <button className='submit' type='submit'>Create!</button>
      </form>
      {/* <div> */}
        {/* {user && (
          <div>
            <h1>{user.username}</h1>
            <img
              style={{ width: "150px" }}
              src={user.profileImageUrl}
              alt="profile"
            />
          </div>
        )}
      </div> */}
    </div>
  );
}

export default EventForm;
