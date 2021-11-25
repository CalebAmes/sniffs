import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventHolder.scss";

const EventHolder = ({ event, i }) => {
  const [increment, setIncrement] = useState(i);

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
  const endTime = dateCreator(event?.dateEnd);

  return (
    <>
      <Link to={`/event/${event?.id}`} className="eventHolder">
        {/* <h3>{ event?.name }</h3> */}
        <p>
          {startTime?.ymd} @ {startTime?.hm}
        </p>
        <img className="eventPhoto" src={`${event?.photo[increment % 3]}`} />
        <div className="lower">
          <h3>{event?.name}</h3>
          {/* <p>to: {endTime?.ymd} at: {endTime?.hm}</p> */}
        </div>
      </Link>
    </>
  );
};

export default EventHolder;
