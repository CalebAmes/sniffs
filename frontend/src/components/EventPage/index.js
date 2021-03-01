import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getComment, createComment } from '../../store/comment';
import { getRsvp, createRsvp } from '../../store/rsvp'
import './EventPage.css';
import { body1 } from '../index';

const EventPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const user = useSelector(state => state.session.user);
  const [userId, setUserId] = useState(user?.id)
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const commentItems = useSelector((state) => state.comment);
  const rsvpItems = useSelector((state) => state.rsvp);
  const { id } = useParams();
  const event = eventItems && eventItems[id];

  const commentsArray = Object.values(commentItems);

  const category = categoryItems && event && categoryItems[event.categoryId];
  const [content, setContent] = useState('')
  const eventId = id;
    
  const addComment = (e) => {
    e.preventDefault();
    dispatch(createComment({
      userId, content, eventId
    }))
  }

  const addRsvp = () => {
    dispatch(createRsvp({
      userId, eventId
    }))
    history.push('/')
  }
    
    useEffect(() => {
      body1()
      dispatch(getEvent())
      dispatch(getCategory())
      dispatch(getComment())
      dispatch(getRsvp())
    }, [dispatch])
    
  if(user){
    return (
      <>
        <h1 className='title'>{category?.name}.</h1>
        <div className='block'>
          <div className='image'>
            <img src={event?.photo} />
          </div>
          <div className='eventBox'>
            <div className='name'>{event?.name.toUpperCase()}</div>
            <div className='desc'>{event?.description.toLowerCase()}</div>
            <div className='dateTimeDiv'>
              <div className='dateTime'>{event?.dateStart}</div>
              <p>-</p>
              <div className='dateTime'>{event?.dateEnd}</div>
            </div>
            <button type='button' className='submit rsvp' onClick={addRsvp}>RSVP</button>
          </div>
        </div>
        <div className='commentBlock'>
          <div className='comments'>
            { commentsArray?.filter(comment => comment.eventId == id).map(comment => 
              <div key={comment?.id} className='comment'>{comment?.content}
            </div>) }
          </div>
          <div>
            <form value={ userId } onSubmit={ addComment }>
              <div className='postComment'>
                <textarea
                  type='text'
                  className='input'
                  value={ content }
                  onChange={(e) => setContent(e.target.value)}
                  required />
                <button className='submit commentB' type='submit'>comment.</button>
              </div>
            </form>
          </div>
        </div>
        <div className='pad'/>
      </>
    )} else {
      return (
        <>
        <h1 className='title'>{category?.name}.</h1>
        <div className='block'>
          <div className='image'>
            <img src={event?.photo} />
          </div>
          <div className='eventBox'>
            <div className='name'>{event?.name.toUpperCase()}</div>
            <div className='desc'>{event?.description.toLowerCase()}</div>
            <div className='dateTimeDiv'>
              <div className='dateTime'>{event?.dateStart}</div>
              <p>-</p>
              <div className='dateTime'>{event?.dateEnd}</div>
            </div>
          </div>
        </div>
      </>
      )}
}

export default EventPage;
