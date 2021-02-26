import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/category';
import * as sessionActions from '../../store/session';
import './EventForm.css';

const EventForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const categoryItems = useSelector((state) => state.category);
  const user = useSelector((state) => state.session.user);

  const categories = Object.values(categoryItems);

  // const [errors, setErrors] = useState('');

  const handleSubmit = (e) => null;
  //   e.preventDefault();

  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data?.errors) setErrors(data.errors);
  //   });
  //   return setErrors(['event errors']);
  // };

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])


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
        <label className='labels'>pick a category.</label>
        <div className='selectDiv'>
          <label className='wrap'>
            <select>
              {
                categories.map((category) => <option>{category?.name}</option>)
              }
            </select>
          </label>
          <button className='submit' type='submit'>Create!</button>
        </div>
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
