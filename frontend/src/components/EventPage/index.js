import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getComment } from '../../store/comment';
import { getRSVP, createRSVP } from '../../store/rsvp';
import './EventPage.css';
import { body1 } from '../index';

const EventPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(state => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const commentItems = useSelector((state) => state.comment);
  const rsvpItems = useSelector((state) => state.rsvp);

  const commentsArray = Object.values(commentItems);
  const event = eventItems && eventItems[id];
  const category = categoryItems && event && categoryItems[event.categoryId];
  const [ userId, setUserId ] = useState(user?.id);
  const [ eventId, setEventId ] = useState(event?.id)
  
  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
    dispatch(getComment())
    dispatch(getRSVP())
  }, [dispatch])
  
  const addRSVP = () => (
    dispatch(createRSVP({ userId, eventId }))
  )

  if(user){
    return (
      <>
        <h1 className='title'>{category?.name}.</h1>
        <div className='eventBox'>
          <div className='name'>{event?.name.toUpperCase()}</div>
          <div className='desc'>{event?.description.toLowerCase()}</div>
        <button type='button' onClick={ addRSVP } className='submit rsvp'>RSVP</button>
        </div>
        <div className='comments'>
          { commentsArray?.filter(comment => comment.eventId == id).map(comment => 
            <div key={comment?.id} className='comment'>{comment?.content}
          </div>) }
        </div>
        {/* <div className='rsvps'>
          { rsvpArray?.filter(comment => comment.eventId == id).map(comment => 
            <div key={comment?.id} className='comment'>{comment?.content}
          </div>) }
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
