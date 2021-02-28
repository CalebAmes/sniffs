import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import * as rsvpActions from '../../store/rsvp';
import './EventPage.css';
import { body1 } from '../index';

const EventPage = () => {
  const dispatch = useDispatch();
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const user = useSelector(state => state.session.user);
  // const rsvp = useSelector(state => state.rsvp);
  // const rsvpArray = Object.values(rsvp);
  const { id } = useParams();
  const event = eventItems && eventItems[id];
  const category = categoryItems && event && categoryItems[event.categoryId];
  const [ userId, setUserId ] = useState(user?.id);
  const [ eventId, setEventId ] = useState(event?.id)
  
  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
    // dispatch(rsvpActions.createRSVP())
  }, [dispatch])
  
  const addRSVP = () => {
    return dispatch(rsvpActions.createRSVP({ userId, eventId }))
  }

  if(user){
    return (
      <>
        <h1 className='title'>{category?.name}.</h1>
        <div className='eventBox'>
          <div className='name'>{event?.name.toUpperCase()}</div>
          <div className='desc'>{event?.description.toLowerCase()}</div>
        <button type='button' onClick={ addRSVP } className='submit rsvp'>RSVP</button>
        </div>
        {/* <div>
          {
            rsvpArray.map(r => 
              <p key={ r?.id }>{ r.userId }</p>)
          }
        </div> */}
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
