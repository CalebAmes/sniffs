import './EventHolder.css'

const EventHolder = ({ event }) => {

  return (
    <>
      <div className='eventHolder'>
        <img className='eventPhoto' src={`${ event.photo }`} />
        <div className='lower'>
          <h3>{ event.name }</h3>
          <p>{event.description}</p>
        </div>
      </div>
    </>
  )
}

export default EventHolder;