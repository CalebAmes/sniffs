import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';
import '../../index.css'
// function Navigation({ isLoaded }){
  // const sessionUser = useSelector(state => state.session.user);

//   const body1 = () => {
//     const body = document.getElementById('body');
//     body.classList.add('body1');
//     body.classList.remove('body2');
//   }

//   const body2 = () => {
//     const body = document.getElementById('body');
//     body.classList.add('body2');
//     body.classList.remove('body1');
//   }

//   if (sessionUser) {
//     return (
//       <nav className='navbar'>
//         <div>
//           <NavLink className='link' exact to='/'>Home</NavLink>
//         </div>
//         <div>
//           <ProfileButton className='link' user={ sessionUser } />
//         </div>
//       </nav>
//     );
//   } else {
//     return (
//       <nav className='navbar'>
//         <div>
//           <NavLink onClick={ body1 } className='link' exact to='/'>Home</NavLink>
//         </div>
//         <div>
//           <NavLink onClick={ body2 } className='link' to='/login'>Log In</NavLink>
//         </div>
//         <div>
//           <NavLink onClick={ body2 } className='link lastLink' to='/signup'>Sign Up</NavLink>
//         </div>
//       </nav>
//     );
//   }
// }

const Navigation = (props) => {
  const sessionUser = useSelector(state => state.session.user);
  const body1 = () => {
    const body = document.getElementById('body');
    body.classList.add('body1');
    body.classList.remove('body2');
  }

  const body2 = () => {
    const body = document.getElementById('body');
    body.classList.add('body2');
    body.classList.remove('body1');
  }


  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {/* { props.children } */}
        {/* <NavItem icon='🤟' /> */}
        <NavLink className='link icon-navlink' onClick={ body2 } to='/login'>Log In</NavLink>
        <NavLink className='link icon-navlink' onClick={ body2 } to='/signup'>Sign Up</NavLink>
        <NavLink className='link icon-navlink' onClick={ body1 } to='/'>Home</NavLink>
        <NavItem icon={<i class="fas fa-chevron-circle-down"/>}>
          <Dropdown>
            
          </Dropdown>
        </NavItem>
      </ul>
      
    </nav>
)}

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  
  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        { props.icon }
      </a>

      {open && props.children}
    </li>
  )
}

export function Dropdown() {

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

  function DropdownItem(props) {
    // if (sessionUser) {
    return (
      <a href='#' className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
      </a>
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

          <DropdownItem leftIcon={<i class="far fa-calendar-alt"/>} goToMenu='events'>Events</DropdownItem>
          <DropdownItem leftIcon={<i class="fas fa-layer-group"/>} goToMenu='categories'>Categories</DropdownItem>

        </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'events'} 
        unmountOnExit timeout={500}
        classNames='menu-secondary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownItem goToMenu='main' leftIcon={'←'}>Settings</DropdownItem>
          {
                eventItemsArray.map(item => (
                  <DropdownItem event={ item } key={ item.id }> { item.name }</DropdownItem>
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

          <DropdownItem goToMenu='main' leftIcon={'←'}>Settings</DropdownItem>
          {
                categoryItemsArray.map(item => (
                  <DropdownItem category={ item } key={ item.id }> { item.name }</DropdownItem>
                  ))
          }
        </div>
      </CSSTransition>
    </div>
  )
}
// }

export default Navigation;