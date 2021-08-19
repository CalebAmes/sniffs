import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import "./UserProfile.scss";
import "../../index.css";
import EventHolder from "../EventHolder";
import { getUserComments } from "../../store/comment"
// import '../EventHolder/EventHolder.scss'
// import '../EventPage/EventPage.css'

const UserEvent = ({event, i}) => {
  const [increment, setIncrement] = useState(i);

  useEffect(() => {
    let timeout = setInterval(() => {
      setIncrement(increment + 1);
    }, 3000);
    return () => clearInterval(timeout);
  }, [increment]);

  const dateCreator = time => {
    if(!time) return undefined;
    let ymd = time.slice(5, 10)
    let hm = time.slice(11, 16).split(':');
    let hours;
    let am;
    if(hm[0] > 12){
      (hours = hm[0] - 12);
      am = 'pm';
    }else{
      (hours = hm[0]);
      am = 'am';
    };
    hm = [hours, hm[1]].join(':') + am;
    
    return { hm, ymd };
  };

  const startTime = dateCreator(event?.dateStart);

  return (
    <>
      <Link to={`/event/${event?.id}`} className='eventHolder'>
        {/* <h3>{ event?.name }</h3> */}
        <p>{startTime?.ymd} @ {startTime?.hm}</p>
        <img className='eventPhoto' src={`${ event?.photo[increment % 3] }`} />
        <div className='lower'>
          <h3>{ event?.name }</h3>
          {/* <p>to: {endTime?.ymd} at: {endTime?.hm}</p> */}
        </div>
      </Link>
    </>
  )
}

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const rsvps = useSelector((state) => Object.values(state.rsvp));
  const interest = useSelector((state) => Object.values(state.event).slice(0, 5));
  const comments = useSelector((state) => Object.values(state.comment));
  const dispatch = useDispatch();
  const history = useHistory();

  const id = Number(useParams().id);

  useEffect(() => {
    dispatch(getUserComments(id));
  }, [dispatch]);

  if (user && comments) return (
    <>
      <div className="UserProfile">
        <div className="userPad"></div>
        <div className="profile">
          <div className="profileCol1">
            <img src={user.avatar} className="userAvatar" />
          </div>
          <div className="profileCol2">
            <h1>{user.username}</h1>
            <h3>Member since March 7th, 2020</h3>
            <p><i class="fas fa-dog iPad"></i> Attending {rsvps.length} events</p>
            <p><i class="fas fa-map-marker-alt iPad"></i> Located in Dogtopia, USA</p>
          </div>
        </div>
        <div className="profileDivider">
          <div className="dividerRight">
            <div className="rightSection">
              <div className='dividerBubble'>{comments.length % 100}</div>
              <p>Comments</p>
            </div>
            <div className="rightSection">
              <div className='dividerBubble'>{user.Events.length % 100}</div>
              <p>Hosting</p>
            </div>
          </div>
          <div className="dividerLeft">
            <button
              type="button"
              className="submit editProfile"
            >
              Edit profile
            </button>
          </div>
        </div>
        <div className="userEvents">
          <h2>Events that you are attending</h2>
          {rsvps.map((rsvp, i) => (
            <EventHolder event={rsvp.Event} i={i} key={rsvp.Event.id}>
              {rsvp.Event.name}
            </EventHolder>
          ))}
        </div>
        <div className="userEvents">
          <h2>Events that you are hosting</h2>
          {user.Events.map((event, i) => (
            <EventHolder event={event} i={i} key={event.id}>
              {event.name}
            </EventHolder>
          ))}
        </div>
        <div className="userEvents">
          <h2>Events that you have commented on</h2>
          {comments.map((comment, i) => (
            <EventHolder event={comment.Event} i={i} key={comment.Event.id}>
              {comment.Event.name}
            </EventHolder>
          ))}
        </div>
        <div className="userEvents">
          <h2>Events that you might be interested in</h2>
          {interest.map((event, i) => (
            <EventHolder event={event} i={i} key={event.id}>{event.name}</EventHolder>
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
