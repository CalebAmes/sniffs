import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event';
import './EditEventModal.css'

const EditEventModal = ({setOpen, open, event}) => {
  const user = useSelector((state) => state.session.user);
  const categoryItems = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [dateStart, setDateStart] = useState(event.dateStart);
  const [dateEnd, setDateEnd] = useState(event.dateEnd);
  const [categoryId, setCategoryId] = useState(event.categoryId);
  const [userId, setUserId] = useState(user?.id)

  const categories = Object.values(categoryItems);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(eventActions.createEvent({ 
        name, description, dateStart, 
        dateEnd,categoryId, userId,
      }))
  }

  const openFunc = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className='editModal'>
        <div className='modalBackground' onClick={openFunc} />
        <div className='editEventDiv'>
        <form value={ categoryId } onSubmit={ handleSubmit } className='formE SignupForm editEventForm'>
        <ul>
          {/* {errors.map((err, id) => <li key={ id } >{ err }</li>)} */}
        </ul>
        <div className='formTitleDivE'>
          <h2 className='formTitleE'>Update event</h2>
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
          <button className='submit' type='submit'>Update!</button>
        </div>
      </form>
        </div>
      </div>
    </>
  ) 
}

export default EditEventModal