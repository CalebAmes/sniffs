import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './UserProfile.css';
import '../../index.css';

const UserProfile = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const clickHandler = () => {
    history.push('/editProfile')
  }

  return (
    <>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <button className='submit' onClick={ clickHandler }>Edit Profile</button>
    </>
  )
}

export default UserProfile;