import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails, removeEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getUserRsvp, createRsvp, removeRsvp } from '../../store/rsvp';
import EditEventModal from '../EventForm/EditEventModal';
import './EventPage.css';
import { body1 } from '../index';
import CommentSection from '../Comments';


const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const id = Number(useParams().id);

	const user = useSelector((state) => state.session.user);
	// const user = undefined;
	const event = useSelector((state) => state.event[id]);
	const categoryItems = useSelector((state) => state.category);
	const [editModal, setEditModal] = useState(false);
	const rsvps = useSelector((state) => state.rsvp);

	let hasRSVP = rsvps[id];

	const category = categoryItems && event && categoryItems[event.categoryId];

	const deleteEventId = async (id) => {
		await dispatch(removeEvent(id));
		history.push('/');
	};

	const addRsvp = () => {
		const rsvp = {
			userId: user.id,
			eventId: id,
		}
		dispatch(
			createRsvp({
				...rsvp,
			})
		);
		hasRSVP = rsvp;
	};

	const rmRSVP = () => {
		dispatch(
			removeRsvp(hasRSVP)
		);
	};
	

	useEffect(() => {
		body1();
		dispatch(getEventDetails(id));
		dispatch(getCategory());
		if(user?.id) {
			dispatch(getUserRsvp(user?.id));
		}
	}, [dispatch]);
	
	return (
		<>
		{ event && user &&
			<>
				<div className="eventPadding">
					<h2>{event.dateStart}</h2>
					<h1>{event.name}</h1>
					<div className = "eventHost">
						<p>Hosted by</p>
						<p>{event.host}</p>
					</div>
				</div>
				<h1 className="title">{category?.name}.</h1>
				{editModal &&
					<EditEventModal setOpen={setEditModal} open={editModal} event={event} />
				}
				<div className="block">
					<div className="image">
						<img src={event?.photo[2]} />
					</div>
					<div className="eventBox">
						<div className="name">{event?.name.toUpperCase()}</div>
						<div className="desc">{event?.description.toLowerCase()}</div>
						<div className="dateTimeDiv">
							<div className="dateTime">{event?.dateStart}</div>
							<p>-</p>
							<div className="dateTime">{event?.dateEnd}</div>
						</div>
						{ hasRSVP &&
							<button type="button" className="submit rsvp" onClick={rmRSVP}>
								Delete Reservation
							</button>
						}
						{ !hasRSVP &&
							<button type="button" className="submit rsvp" onClick={addRsvp}>
								RSVP
							</button>
						}
						<button type="button" className="submit rsvp" onClick={() => deleteEventId(event.id)}>
							Delete
						</button>
						<button type="button" className="submit rsvp" onClick={() => setEditModal(!editModal)}>
							Update
						</button>
					</div>
				</div>
				<CommentSection id={ id } userId={ user.id } />
				{/* <div className="pad" /> */}
			</>
		}{
			(!event || !user ) &&
			<>
			<h1>Event is not there</h1>
			<div className="loading" />
			</>
		}
		</>
	);
}

export default EventPage;
