import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import "./UserProfile.scss";
import "../../index.css";
import EventHolder from "../EventHolder";
import { getUserComments } from "../../store/comment";

const UserEvent = ({ event, i }) => {
  const [increment, setIncrement] = useState(i);

  const imageStyles = {
    backgroundImage: "url(" + event?.photo[increment % 3] + ")",
    backgroundSize: "cover",
    height: "80px",
    width: "80px",
  };

  useEffect(() => {
    let timeout = setInterval(() => {
      setIncrement(increment + 1);
    }, 3000);
    return () => clearInterval(timeout);
  }, [increment]);

  const dateCreator = (time) => {
    if (!time) return undefined;
    let ymd = time.slice(5, 10);
    let hm = time.slice(11, 16).split(":");
    let hours;
    let am;
    if (hm[0] > 12) {
      hours = hm[0] - 12;
      am = "pm";
    } else {
      hours = hm[0];
      am = "am";
    }
    hm = [hours, hm[1]].join(":") + am;

    return { hm, ymd };
  };

  const startTime = dateCreator(event?.dateStart);

  return (
    <>
      <Link to={`/event/${event?.id}`} className="userEvent">
        {/* <h3>{ event?.name }</h3> */}
        <div className="eventCardImg">
          <img src={event?.photo[increment % 3]} alt="dogs" />
        </div>
        <div className="userEventDetails">
          <p>
            {startTime?.ymd} @ {startTime?.hm}
          </p>
          <h3>{event?.name}</h3>
          {/* <p>to: {endTime?.ymd} at: {endTime?.hm}</p> */}
        </div>
      </Link>
    </>
  );
};

// TODO: #24 ^^^ This component needs it's own file!

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const rsvps = useSelector((state) => Object.values(state.rsvp));
  const interest = useSelector((state) =>
    Object.values(state.event).slice(0, 5)
  );
  const comments = useSelector((state) => Object.values(state.comment));
  const dispatch = useDispatch();
  const history = useHistory();

  const id = Number(useParams().id);

  useEffect(() => {
    dispatch(getUserComments(id));
  }, [dispatch]);

  if (user && comments)
    return (
      <>
        <div className="UserProfile">
          <div className="userPad"></div>
          <div className="profile">
            <div className="profileCol1">
              <img src={user.avatar} className="userAvatar" />
            </div>
            <div className="profileCol2">
              <h1>{user.username}</h1>
              <h3>Member since March 7th, 2021</h3>
              <p>
                <i class="fas fa-dog iPad"></i> Attending {rsvps.length} events
              </p>
              <p>
                <i class="fas fa-map-marker-alt iPad"></i> Located in Dogtopia,
                USA
              </p>
            </div>
          </div>
          <div className="profileDivider">
            <div className="dividerLeft">
              <div className="rightSection">
                <div className="dividerBubble">{comments.length % 100}</div>
                <p>Comments</p>
              </div>
              <div className="rightSection">
                <div className="dividerBubble">{user.Events.length % 100}</div>
                <p>Hosting</p>
              </div>
            </div>
            <div className="dividerRight">
              {/* <button
              type="button"
              className="submit editProfile"
            >
              Edit profile
            </button> */}
            </div>
          </div>
          <h2 className="userH2">Attending</h2>
          <div className="userEvents">
            {rsvps.length === 0 && <div className="noEvents">No events</div>}
            {rsvps.map((rsvp, i) => (
              <UserEvent event={rsvp.Event} i={i} key={rsvp.Event.id}>
                {rsvp.Event.name}
              </UserEvent>
            ))}
          </div>
          <h2 className="userH2">Hosting</h2>
          <div className="userEvents">
            {user.Events.length === 0 && (
              <div className="noEvents">No events</div>
            )}
            {user.Events.map((event, i) => (
              <UserEvent event={event} i={i} key={event.id}>
                {event.name}
              </UserEvent>
            ))}
          </div>
          <h2 className="userH2">Commented on</h2>
          <div className="userEvents">
            {comments.length === 0 && <div className="noEvents">No events</div>}
            {comments.map((comment, i) => (
              <UserEvent event={comment.Event} i={i} key={comment.Event.id}>
                {comment.Event.name}
              </UserEvent>
            ))}
          </div>
          <h2 className="userH2">Based on your interest</h2>
          <div className="userEvents">
            {interest.length === 0 && <div className="noEvents">No events</div>}
            {interest.map((event, i) => (
              <UserEvent event={event} i={i} key={event.id}>
                {event.name}
              </UserEvent>
            ))}
          </div>
        </div>
      </>
    );
  else return <h1>Please Login</h1>;
};

export default UserProfile;
