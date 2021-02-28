import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getCategory } from '../../store/category';
import * as eventActions from '../../store/event';
import './EventForm.css';
import '../../index.css';

const EventForm = () => {
  const user = useSelector((state) => state.session.user);
  const categoryItems = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [userId, setUserId] = useState(user?.id)
  const history = useHistory();

  const categories = Object.values(categoryItems);

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(eventActions.createEvent({ 
        name, description, dateStart, 
        dateEnd,categoryId, userId,
      }))
    history.push('/');
  }

  if (!user) return <Redirect to='/' />;

  return (
    <div className='formDiv SignupFormDiv'>
      <form value={ categoryId } onSubmit={ handleSubmit } className='formE SignupForm'>
        <ul>
          {/* {errors.map((err, id) => <li key={ id } >{ err }</li>)} */}
        </ul>
        <div className='formTitleDivE'>
          <h2 className='formTitleE'>Create event</h2>
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
            value={ dateEnd }
            onChange={ (e) => setDateEnd(e.target.value) }
            required
            />
        </label>
        <label className='labels'>End date:
          <input
            type='datetime-local'
            className='input'
            value={ dateStart }
            onChange={ (e) => setDateStart(e.target.value) }
            required
            />
        </label>
        <label className='labels'>pick a category.</label>
        <div className='selectDivE'>
          <label className='wrap'>
            <select onChange={(e) => setCategoryId(e.target.value)}>
              {
                categories.map((category) => <option key={category.id} value={category?.id}>{category?.name}</option>)
              }
            </select>
          </label>
          <button className='submit' type='submit'>Create!</button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
