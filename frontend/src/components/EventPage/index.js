import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import './EventPage.css';
import { body1 } from '../index';

const EventPage = () => {
  const dispatch = useDispatch();
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const user = useSelector(state => state.session.user);
  const { id } = useParams();
  const event = eventItems && eventItems[id];
  const category = categoryItems && event && categoryItems[event.categoryId];
  
  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])

  if(user){
    return (
      <>
        <h1 className='title'>{category?.name}.</h1>
        <div className='eventBox'>
          <div className='name'>{event?.name.toUpperCase()}</div>
          <div className='desc'>{event?.description.toLowerCase()}</div>
        <button className='submit rsvp'>RSVP</button>
        </div>
      </>
    )} else {
      return (
      <>
      <h1 className='title'>{category?.name}.</h1>
        <div className='eventBox'>
          <div className='name'>{event?.name.toUpperCase()}</div>
          <div className='desc'>{event?.description.toLowerCase()}</div>
        </div>
      </>
      )}
}

export default EventPage;
