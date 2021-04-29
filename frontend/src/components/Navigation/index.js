import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// 
import './Navigation.css';
import '../../index.css'

const Navigation = (props) => {
  const sessionUser = useSelector(state => state.session.user);

  if(!sessionUser){
    return (
      <nav className='navbar'>
        <ul className='navbar-nav'>
          <NavLink className='link icon-navlink' to='/login'>Log In</NavLink>
          <NavLink className='link icon-navlink' to='/signup'>Sign Up</NavLink>
          <NavLink className='link icon-navlink' to='/'>Home</NavLink>
          <NavItem icon={<i class="fas fa-chevron-circle-down"/>} >
            <Dropdown />
          </NavItem>
        </ul>
      </nav>
    )}
    else {
      return (
        <nav className='navbar'>
          <ul className='navbar-nav'>
            <NavLink className='link icon-navlink' to='/profile'>{`Welcome,  ${sessionUser.username}`}</NavLink>
            <NavItem icon={<i class="fas fa-chevron-circle-down"/>}>
              <Dropdown2 />
            </NavItem>
          </ul>
        </nav>
      )}
  }

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={()=> setOpen(!open)}>
        { props.icon }
      </a>

      {open && props.children}
    </li>
  )
}

export function Dropdown() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownToMenu(props) {
    // if (sessionUser) {
    return (
      <a href='#' className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <div className='icon-button'>{props.leftIcon}</div>
        {props.children}
      </a>
    )
  }
  function DropdownCategory({ category }) {
    return (
      <Link to={`/category/${category.id}`} className='menu-item'>
        <div className='icon-button'></div>
        {category.name}
      </Link>
    )
  }
  function DropdownEvent({ event }) {
    return (
      <Link to={`/event/${event.id}`} className='menu-item'>
        <div className='icon-button'></div>
        {event.name}
      </Link>
    )
  }
  return (
    <div className='dropdown' style={{ height: menuHeight }}>
      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames='menu-primary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownToMenu leftIcon={<i class="far fa-calendar-alt"/>} goToMenu='events'>Events</DropdownToMenu>
          <DropdownToMenu leftIcon={<i class="fas fa-layer-group"/>} goToMenu='categories'>Categories</DropdownToMenu>

        </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'events'} 
        unmountOnExit timeout={500}
        classNames='menu-secondary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownToMenu goToMenu='main' leftIcon={<i class="far fa-arrow-alt-circle-left"/>}>...back</DropdownToMenu>
          {
            eventItemsArray.map(item => (
              <DropdownEvent event={ item } key={ item.id }> { item.name }</DropdownEvent>
            ))
          }
        </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'categories'} 
        unmountOnExit timeout={500}
        classNames='menu-secondary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownToMenu goToMenu='main' leftIcon={<i class="far fa-arrow-alt-circle-left"/>}>...back</DropdownToMenu>
          {
            categoryItemsArray.map(item => (
              <DropdownCategory category={ item } key={ item.id }> 
              { item.name }
              </DropdownCategory>
            ))
          }
        </div>
      </CSSTransition>
    </div>
  )
}

export function Dropdown2() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function logout () {
    dispatch(sessionActions.logout());
    history.push('/')
  }

  function DropdownItem(props) {
    return (
      <a href='#' className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <div className='icon-button'>{props.leftIcon}</div>
        {props.children}
      </a>
    )
  }
  function DropdownCategory({ category }) {
    return (
      <Link to={`/category/${category.id}`} className='menu-item'>
        <div className='icon-button'></div>
        {category.name}
      </Link>
    )
  }
  function DropdownEvent({ event }) {
    return (
      <Link to={`/event/${event.id}`} className='menu-item'>
        <div className='icon-button'></div>
        {event.name}
      </Link>
    )
  }
  return (
    <div className='dropdown' style={{ height: menuHeight }}>
      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames='menu-primary'
        onEnter={ calcHeight }
        >
        <div className='menu'>
          <Link to='/' className='menu-item'>
          <div className='icon-button'>{<i class="fas fa-home"/>}</div>
          Home
          </Link>
          <Link to='/profile' className='menu-item'>
          <div className='icon-button'>{<i class="fas fa-house-user"/>}</div>
          Profile
          </Link>
          <DropdownItem leftIcon={<i class="far fa-calendar-alt"/>} goToMenu='events'>Events</DropdownItem>
          <DropdownItem leftIcon={<i class="fas fa-layer-group"/>} goToMenu='categories'>Categories</DropdownItem>
          <Link to='/createEvent' className='menu-item'>
            <div className='icon-button'>{<i class="far fa-calendar-plus"/>}
            </div>
              Create Event
          </Link>
          <div onClick={logout} className='menu-item'>
            <div className='icon-button'>{<i class="fas fa-sign-out-alt"/>}
            </div>
              Log Out
          </div>
        </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'events'} 
        unmountOnExit timeout={500}
        classNames='menu-secondary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownItem goToMenu='main' leftIcon={<i class="far fa-arrow-alt-circle-left"/>}>...back</DropdownItem>
          {
            eventItemsArray.map(item => (
              <DropdownEvent event={ item } key={ item.id }> { item.name }</DropdownEvent>
            ))
          }
        </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'categories'} 
        unmountOnExit timeout={500}
        classNames='menu-secondary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownItem goToMenu='main' leftIcon={<i class="far fa-arrow-alt-circle-left"/>}>...back</DropdownItem>
          {
            categoryItemsArray.map(item => (
              <DropdownCategory category={ item } key={ item.id }> { item.name }</DropdownCategory>
            ))
          }
        </div>
      </CSSTransition>
    </div>
  )
}

export default Navigation;