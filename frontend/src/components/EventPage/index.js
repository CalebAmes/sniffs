import React, { useEffect, useState } from 'react';
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
  const { id } = useParams();
  const event = eventItems[id];
  const category = categoryItems[event.id];
  
  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])

  return(
    <>
    <h1 className='title'>{category.name}.</h1>
    <div className='eventBox'>
      <div className='name'>{event.name.toUpperCase()}</div>
      <div className='desc'>{event.description.toLowerCase()}</div>
    </div>
    </>
  )
}

export default EventPage;