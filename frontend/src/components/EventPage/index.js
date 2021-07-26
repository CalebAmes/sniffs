import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails, removeEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { getUserRsvp, createRsvp, removeRsvp } from '../../store/rsvp';
import EditEventModal from '../EventForm/EditEventModal';
import './EventPage.css';
import { body1, footer1, footer2 } from '../index';
import CommentSection from '../Comments';


const EventPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const id = Number(useParams().id);

	
	const user = useSelector((state) => state.session.user);
	const event = useSelector((state) => state.event[id]);
	const categoryItems = useSelector((state) => state.category);
	const [editModal, setEditModal] = useState(false);
	const rsvps = useSelector((state) => state.rsvp);
	const [photoIndex, setPhotoIndex] = useState(0);
	const attendees = event?.Rsvps;
	const [showControls, setShowControls] = useState(false);
	const [open, setOpen] = useState(false);

	let hasRSVP = rsvps[id];

	const imageStyles = {backgroundImage:'url('+event?.photo[photoIndex]+')', backgroundSize: 'cover', height: '400px'};

	const nextPhoto = () => {
		setPhotoIndex((photoIndex + 1) % event?.photo.length);
	}
	const prevPhoto = () => {
		photoIndex === 0
		? setPhotoIndex(event?.photo.length - 1)
		: setPhotoIndex((photoIndex - 1) % event?.photo.length);
	}
	
	const category = categoryItems && event && categoryItems[event.categoryId];

	const deleteEventId = (id) => {
		console.log('in deleteEventId')
		dispatch(removeEvent(id)).then(() => {
		return history.push('/');
		});
	};

	const addRsvp = () => {
		if (!user) return history.push('/login');
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

	const dateCreator = time => {
		if(!time) return undefined;
		let ymd = time.slice(0, 10)
		let hm = time.slice(11, 16).split(':');
		let hours;
		let am;
		if(hm[0] > 12){
			(hours = hm[0] - 12);
			am = 'pm';
		}else{
			(hours = hm[0]);
			am = 'am';
		};
		hm = [hours, hm[1]].join(':') + am;
		
		return { hm, ymd };
	};

	const startTime = dateCreator(event?.dateStart);
	const endTime = dateCreator(event?.dateEnd);

	useEffect(() => {
		body1();
		footer2();
		dispatch(getEventDetails(id));
		dispatch(getCategory());
		if(user?.id) {
			dispatch(getUserRsvp(user?.id));
		}
		return () => footer1();
	}, [dispatch, id]);
	
	return (
		<>
		{ event?.User &&
			<>
				<div className='rightColor' />
				<h1 className="title">{category?.name}.</h1>
				{editModal &&
					<EditEventModal setOpen={setEditModal} open={editModal} event={event} />
				}
				<div className="event">
					<div className="eventGrid">
						<div className="eventColumnLeft">
							<div className = "eventHost">
								<p>Hosted by</p>
								{ event.User.id === user?.id &&
									<h3>This event is hosted by you</h3>
								}{ event.User.id !== user?.id && 
									<h3>{event.User.username}</h3>
								}
							</div>
							<div className="image" 
								style={imageStyles}
								onMouseEnter={() => setShowControls(true)}
								onMouseLeave={() => setShowControls(false)}
								>
								<div className="imageArea1 imageArea" onClick={prevPhoto}>
									{	showControls &&
										<i className="fas fa-arrow-left fa-lg" />
									}
								</div>
								<div className="imageArea2 imageArea" onClick={() => setOpen(true)}>
									{ showControls &&
										<i className="fas fa-expand fa-lg" />
									}
								</div>
								<div className="imageArea3 imageArea" onClick={nextPhoto}>
									{ showControls &&
										<i className="fas fa-arrow-right fa-lg" />
									}
								</div>
							</div>
							<div className="eventBox">
								<div className="name">{event?.name.toUpperCase()}</div>
								<div className="desc">{event?.description.toLowerCase()}</div>
									<div className="dateTimeDiv">
										<div>
											<div className="dateTime">{startTime.hm}</div>
											<div className="dateTime">{`${startTime.ymd}`}</div>
										</div>
										<p>-</p>
										<div>
											<div className="dateTime">{endTime.hm}</div>
											<div className="dateTime">{`${endTime.ymd}`}</div>
										</div>
								</div>
							</div>
							<div className='attendees'>
								<h1>Attendees</h1>
								{attendees.map((attendee, index) => (
									<>
										<h3>{ attendee.User.username }</h3>
									</>
								))}
							</div>
						</div>
						<div className="eventColumnRight">
							<div className="eventButtons">
									{ hasRSVP &&
										<button type="button" className="submit rsvp" onClick={rmRSVP}>
												Delete Reservation
										</button>
									}
									{ !hasRSVP && user?.id !== event.User.id &&
										<button type="button" className="submit rsvp" onClick={addRsvp}>
											RSVP
										</button>
									}
									{ user &&
										<>
											<button type="button" className="submit rsvp" onClick={() => setEditModal(!editModal)}>
												Update
											</button>
											<button type="button" className="submit rsvp" onClick={() => deleteEventId(event.id)}>
												Delete
											</button>
										</>
									}
							</div>
							<div className="eventDates">
								<h2>from: {startTime.hm}</h2>
								<h2> - </h2>
								<h2>to: {endTime.hm}</h2>
							</div>
							{ user &&
							<CommentSection id={ id } userId={ user?.id } />
							}{ !user &&
								<>
								<br />
								<br />
								<br />
								<br />
								<h2>Please login. Demo login available</h2>
								</>
							}
						</div>
					</div>
				</div>
				{open && (
				<>
					<div className="modal">
						<div className="modal-background" onClick={() => setOpen(!open)} />
						<img src={event?.photo[photoIndex]} alt='sent in chat, enlarged' className="modal-content" />
					</div>
				</>
				)}
			</>
		}
		{ !event?.User &&
			<>
				<h1>Event is not there</h1>
				<div className="loading" />
			</>
		}
		</>
	);
}

export default EventPage;
