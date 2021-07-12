import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, removeEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getRsvp, createRsvp } from '../../store/rsvp';
import './EventPage.css';
import { body1 } from '../index';

import CommentSection from '../Comments'

const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.session.user);
	const eventItems = useSelector((state) => state.event);
	const categoryItems = useSelector((state) => state.category);

	const { id } = useParams();
	const event = eventItems && eventItems[id];

	const category = categoryItems && event && categoryItems[event.categoryId];
	const eventId = id;

	const deleteEventId = async (id) => {
		await dispatch(removeEvent(id));
		history.push('/');
	};


	const addRsvp = () => {
		dispatch(
			createRsvp({
				userId: user.id,
				eventId,
			})
		);
		history.push('/');
	};

	useEffect(() => {
		body1();
		dispatch(getEvent());
		dispatch(getCategory());
		dispatch(getRsvp());
	}, [dispatch]);

	if (user) {
		return (
			<>
				<h1 className="title">{category?.name}.</h1>
				<div className="block">
					<div className="image">
						<img src={event?.photo} />
					</div>
					<div className="eventBox">
						<div className="name">{event?.name.toUpperCase()}</div>
						<div className="desc">{event?.description.toLowerCase()}</div>
						<div className="dateTimeDiv">
							<div className="dateTime">{event?.dateStart}</div>
							<p>-</p>
							<div className="dateTime">{event?.dateEnd}</div>
						</div>
						<button type="button" className="submit rsvp" onClick={addRsvp}>
							RSVP
						</button>
						<button type="button" className="submit rsvp" onClick={() => deleteEventId(event.id)}>
							Delete
						</button>
					</div>
				</div>
				<CommentSection id={ id } userId={ user.id } />
				<div className="pad" />
			</>
		);
	} else {
		return (
			<>
				<h1 className="title">{category?.name}.</h1>
				<div className="block">
					<div className="image">
						<img src={event?.photo} />
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
