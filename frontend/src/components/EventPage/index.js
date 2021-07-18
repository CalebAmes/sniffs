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
	const rsvps = useSelector((state) => state.rsvp);
	const [editModal, setEditModal] = useState(false);
	const [hasRSVP, setHasRSVP] = useState(false);

	let { id } = useParams();
	id = Number(id);
	const event = eventItems && eventItems[id];
	const rsvpArray = Object.values(rsvps);
	let getRSVP = rsvpArray.find(el => el.userId === user?.id && el.eventId === id);
	const rsvpIdx = rsvpArray[rsvpArray.length - 1]?.id + 1;
	const category = categoryItems && event && categoryItems[event.categoryId];
	const eventId = id;

	const deleteEventId = async (id) => {
		await dispatch(removeEvent(id));
		history.push('/');
	};

	console.log(hasRSVP, 'has');
	console.log(getRSVP, 'get');

	const addRsvp = () => {
		dispatch(
			createRsvp({
				id: rsvpIdx,
				userId: user.id,
				eventId,
			})
		);
		setHasRSVP(true);
	};

	const rmRSVP = () => {
		dispatch(
			removeRsvp(getRSVP.id)
			);
	};

	const Button = (props) => {
		


	useEffect(() => {
		body1();
		dispatch(getEvent());
		dispatch(getCategory());
		dispatch(getRsvp());
		setRSVP()
	}, [dispatch]);

	const setRSVP = () => {
		if (getRSVP) {
			setHasRSVP(true);
		}
	};
	
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
						{ getRSVP &&
							<button type="button" className="submit rsvp" onClick={rmRSVP}>
								Delete Reservation
							</button>
						}
						{ !getRSVP &&
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
