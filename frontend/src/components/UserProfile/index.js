import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserProfile.css";
import "../../index.css";
import EventHolder from "../EventHolder";
import { getUserComments } from "../../store/comment"
// import '../EventHolder/EventHolder.scss'
// import '../EventPage/EventPage.css'

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const rsvps = useSelector((state) => Object.values(state.rsvp));
  const interest = useSelector((state) => Object.values(state.event).slice(0, 5));
  const comments = useSelector((state) => Object.values(state.comment));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserComments(user.id));
  }, [dispatch]);
  
  if ( user && comments ) return (
    <>
      <div className="UserProfile">
        <div className="userPad"></div>
        <div className="profile">
          <div className="profileCol1">
            <img src={user.avatar} className="userAvatar" />
          </div>
          <div className="profileCol2">
            <h1>{user.username}</h1>
            <h3>{user.email}</h3>
            <h3>Member since March 7th, 2020</h3>
            <h3>Attending {rsvps.length} events</h3>
          </div>
        </div>
        <div className="userEvents">
          <h2>Events that you are attending</h2>
          { rsvps.map((rsvp, i) => (
             <EventHolder event={ rsvp.Event } i={ i } key={ rsvp.Event.id }>{ rsvp.Event.name }</EventHolder>
          ))}
        </div>
        <div className="userEvents">
          <h2>Events that you have commented on</h2>
          { comments.map((comment, i) => (
             <EventHolder event={ comment.Event } i={ i } key={ comment.Event.id }>{ comment.Event.name }</EventHolder>
          ))}
        </div>
        <div className="userEvents">
          <h2>Events that you might be interested in</h2>
          { interest.map((event, i) => (
             <EventHolder event={ event } i={ i } key={ event.id }>{ event.name }</EventHolder>
          ))}
        </div>
      </div>
    </>
  )
  else return (
    <h1>Please Login</h1>
  )
};

export default UserProfile;
