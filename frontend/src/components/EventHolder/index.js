import { Link } from 'react-router-dom';
import './EventHolder.css'

const EventHolder = ({ event }) => {

  return (
    <>
      <Link to={`/event/${event.id}`} className='eventHolder'>
        <img className='eventPhoto' src={`${ event.photo }`} />
        <div className='lower'>
          <h3>{ event.name }</h3>
          <p>{event.description}</p>
        </div>
      </Link>
    </>
  )
}

export default EventHolder;