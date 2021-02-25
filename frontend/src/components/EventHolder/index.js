import './EventHolder.css'

const EventHolder = ({ event }) => {

  return (
    <div className='eventHolder'>
      <img className='eventPhoto' src={`${ event.photo }`} />
      <div>{ event.name }</div>
      <div>{event.description}</div>
    </div>
  )
}

export default EventHolder;