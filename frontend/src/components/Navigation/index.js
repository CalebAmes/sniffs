import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserRsvp } from "../../store/rsvp";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import "../../index.css";

const Navigation = (props) => {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    return (
      <nav className="navbar2">
        <ul className="navbar-nav">
          <NavLink className="icon-navlink" to="/login">
            Log In
          </NavLink>
          <NavLink className="icon-navlink" to="/signup">
            Sign Up
          </NavLink>
          <NavLink className="icon-navlink" to="/">
            Home
          </NavLink>
          <NavItem
            icon={<i className="fas fa-chevron-circle-down" />}
          ></NavItem>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <Link className="logo" to="/">
          Sniffs
        </Link>
        <ul className="navbar-nav">
          <NavLink
            className="link icon-navlink"
            to={`/profile/${sessionUser.id}`}
          >{`Welcome,  ${sessionUser.username}`}</NavLink>
          <NavItem
            icon={<i className="fas fa-chevron-circle-down" />}
          ></NavItem>
        </ul>
      </nav>
    );
  }
};

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  const openFunc = () => {
    setOpen(!open);
  };

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={openFunc}>
        {props.icon}
      </a>
      {open && <Dropdown openFunc={openFunc} />}
    </li>
  );
}

export function Dropdown({ openFunc }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const userEvents = useSelector((state) => state.rsvp);
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  const userEventsArray = Object.values(userEvents);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  useEffect(async () => {
    await dispatch(getUserRsvp(sessionUser?.id));
  }, [dispatch, openFunc])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function logout() {
    dispatch(sessionActions.logout());
    history.push("/");
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <div className="icon-button">{props.leftIcon}</div>
        {props.children}
      </a>
    );
  }

  function DropdownCategory({ category }) {
    return (
      <Link to={`/category/${category.id}`} className="menu-item">
        <div className="icon-button"></div>
        {category.name}
      </Link>
    );
  }
  function DropdownEvent({ event }) {
    return (
      <Link to={`/event/${event.id}`} className="menu-item">
        <div className="icon-button"></div>
        {event.name}
      </Link>
    );
  }

  return (
    <>
      <div className="cardBackground" onClick={openFunc} />
      <div className="dropdown" style={{ height: menuHeight }}>
        <CSSTransition
          in={activeMenu === "main"}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
          onEnter={calcHeight}
        >
          <div className="menu">
            {sessionUser && (
              <>
                <Link onClick={openFunc} to="/" className="menu-item">
                  <div className="icon-button">
                    {<i className="fas fa-home" />}
                  </div>
                  Home
                </Link>
                <Link onClick={openFunc} to={`/profile/${sessionUser.id}`} className="menu-item">
                  <div className="icon-button">
                    {<i className="fas fa-house-user" />}
                  </div>
                  Profile
                </Link>
              </>
            )}
            <DropdownItem
              leftIcon={<i className="far fa-calendar-alt" />}
              goToMenu="events"
            >
              Events
            </DropdownItem>
            <DropdownItem
              leftIcon={<i className="fas fa-layer-group" />}
              goToMenu="categories"
            >
              Categories
            </DropdownItem>
            {sessionUser && (
              <>
                <DropdownItem
                  leftIcon={<i className="fas fa-hotdog" />}
                  goToMenu="userEvents"
                >
                  Events You're Attending
                </DropdownItem>
                <Link
                  onClick={openFunc}
                  to="/createEvent"
                  className="menu-item"
                >
                  <div className="icon-button">
                    {<i className="far fa-calendar-plus" />}
                  </div>
                  Create Event
                </Link>
                <div
                  onClick={() => {
                    logout();
                    openFunc();
                  }}
                  className="menu-item"
                >
                  <div className="icon-button">
                    {<i className="fas fa-sign-out-alt" />}
                  </div>
                  Log Out
                </div>
              </>
            )}
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "events"}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem
              goToMenu="main"
              leftIcon={<i className="far fa-arrow-alt-circle-left" />}
            >
              ...back
            </DropdownItem>
            {eventItemsArray.map((item) => (
              <DropdownEvent event={item} key={item.id}>
                {" "}
                {item?.name}
              </DropdownEvent>
            ))}
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "userEvents"}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem
              goToMenu="main"
              leftIcon={<i className="far fa-arrow-alt-circle-left" />}
            >
              ...back
            </DropdownItem>
            {userEventsArray.map((item) => (
              <DropdownEvent event={item.Event} key={item.Event?.eventId}>
                {" "}
                {item.Event?.name}
              </DropdownEvent>
            ))}
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "categories"}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem
              goToMenu="main"
              leftIcon={<i className="far fa-arrow-alt-circle-left" />}
            >
              ...back
            </DropdownItem>
            {categoryItemsArray.map((item) => (
              <DropdownCategory category={item} key={item.id}>
                {" "}
                {item.name}
              </DropdownCategory>
            ))}
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

export default Navigation;
