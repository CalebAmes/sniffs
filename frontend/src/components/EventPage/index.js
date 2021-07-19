import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, removeEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getRsvp, createRsvp, removeRsvp } from '../../store/rsvp';
import EditEventModal from '../EventForm/EditEventModal';
import './EventPage.css';
import { body1 } from '../index';
import CommentSection from '../Comments'


const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.session.user);
	const eventItems = useSelector((state) => state.event);
	const categoryItems = useSelector((state) => state.category);
	const [editModal, setEditModal] = useState(false);
	const rsvps = useSelector((state) => state.rsvp);

	const id = Number(useParams().id);

	let hasRSVP = rsvps[id]

	const event = eventItems && eventItems[id];
	const category = categoryItems && event && categoryItems[event.categoryId];

	const deleteEventId = async (id) => {
		dispatch(removeEvent(id));
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
		dispatch(getEvent());
		dispatch(getCategory());
		dispatch(getRsvp(user.id));
		// dispatch(getUserEvents(user.id));
		// setHasRSVP(userEvents?.find(e => e.eventId === id))
		// console.log('this is hasRSVP in useEffect: ', hasRSVP);
	}, [dispatch]);
	
	if (user) {
		return (
			<>
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
		);
	} else {
		return (
			<>
				<h1 className="title">{category?.name}.</h1>
				<div className="block">
					<div className="image">
						<img src={event?.photo[0]} />
					</div>
					<div className="eventBox">
						<div className="name">{event?.name.toUpperCase()}</div>
						<div className="desc">{event?.description.toLowerCase()}</div>
						<div className="dateTimeDiv">
							<div className="dateTime">{event?.dateStart}</div>
							<p>-</p>
							<div className="dateTime">{event?.dateEnd}</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default EventPage;
