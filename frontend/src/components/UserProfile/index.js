import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserProfile.css";
import "../../index.css";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const rsvps = useSelector((state) => Object.values(state.rsvp));
  const dispatch = useDispatch();
  const history = useHistory();

  const clickHandler = () => {
    history.push("/editProfile");
  };

  console.log(rsvps);

  if ( user ) return (
    <>
      <div className="UserProfile">
        <div className="userPad"></div>
        <div className="profile">
          <img src={user.avatar} className="userAvatar" />
          <h1>{user.username}</h1>
        </div>
        <div className="userEvents">
          <h2>Events that you are attending</h2>
          { rsvps.map((rsvp) => (

            // build a component for this
            <div key={rsvp.Event.id} className="event">
              <h2 className="eventName">{rsvp.Event.name}</h2>
              <h3 className="eventDescription">{rsvp.Event.description}</h3>  
            </div>
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
