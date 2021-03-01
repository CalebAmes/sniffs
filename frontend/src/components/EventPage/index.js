import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getComment, createComment } from '../../store/comment';
import { getRSVP, createRSVP } from '../../store/rsvp';
import './EventPage.css';
import { body1 } from '../index';

const EventPage = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.session.user);
  const [userId, setUserId] = useState(user?.id)
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const commentItems = useSelector((state) => state.comment);
  const rsvpItems = useSelector((state) => state.rsvp);
  const { id } = useParams();
  const event = eventItems && eventItems[id];

  const rsvpArray = Object.values(rsvpItems);
  const commentsArray = Object.values(commentItems);

  const category = categoryItems && event && categoryItems[event.categoryId];
  const [content, setContent] = useState('')
  const eventId = id;

  console.log(rsvpItems)
  console.log(commentItems)

  const addRSVP = () => (
    dispatch(createRSVP({ userId, eventId }))
    )
    
  const addComment = (e) => {
    e.preventDefault();
    dispatch(createComment({
      userId, content, eventId
    }))
  }
    
    useEffect(() => {
      body1()
      dispatch(getEvent())
      dispatch(getCategory())
      dispatch(getComment())
      dispatch(getRSVP())
    }, [dispatch])
    
  if(user){
    return (
      <>
        <h1 className='title'>{category?.name}.</h1>
        <div className='eventBox'>
          <div className='name'>{event?.name.toUpperCase()}</div>
          <div className='desc'>{event?.description.toLowerCase()}</div>
        <button type='button' className='submit rsvp' onClick={addRSVP}>RSVP</button>
        </div>
        <div className='comments'>
          { commentsArray?.filter(comment => comment.eventId == id).map(comment => 
            <div key={comment?.id} className='comment'>{comment?.content}
          </div>) }
        </div>
        <div>
          <form value={ userId } onSubmit={ addComment }>
            <label>
              <textarea
                type='text'
                className='input'
                value={ content }
                onChange={(e) => setContent(e.target.value)}
                required />
            </label>
            <button className='submit' type='submit'>comment.</button>
          </form>
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
