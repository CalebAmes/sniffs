import AddEventForm from './Form'
import './EditEventModal.css'

const EditEventModal = ({setOpen, open}) => {
  const openFunc = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className='editModal'>
        <div className='modalBackground' onClick={openFunc} />
        <div className='editEventDiv'>
          <AddEventForm />
        </div>
      </div>
    </>
  ) 
}

export default EditEventModal