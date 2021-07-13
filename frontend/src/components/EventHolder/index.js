import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EventHolder.css'

const EventHolder = ({ event, i }) => {
  const [increment, setIncrement] = useState(i);

  useEffect(() => {
    let timeout = setInterval(() => {
      setIncrement(increment + 1);
    }, 3000);
    return () => clearInterval(timeout);
  }, [increment]);

  return (
    <>
      <Link to={`/event/${event?.id}`} className='eventHolder'>
        <img className='eventPhoto' src={`${ event?.photo[increment % 3] }`} />
        <div className='lower'>
          <h3>{ event?.name }</h3>
          <p>{event?.description}</p>
        </div>
      </Link>
    </>
  )
}

export default EventHolder;