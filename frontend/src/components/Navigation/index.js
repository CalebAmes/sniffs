import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';
import '../../index.css'
// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

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

const Navigation = (props) => (
  <nav className='navbar'>
    <ul className='navbar-nav'>
      { props.children }
    </ul>
  </nav>
)

export function NavItem(props) {
  const [open, setOpen] = useState(false);
  
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

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
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

          <DropdownItem leftIcon={'⚙︎'} goToMenu='settings'>settings</DropdownItem>
          <DropdownItem leftIcon={'🤧'}>Categories</DropdownItem>

        </div>
      </CSSTransition>
      <CSSTransition 
        in={activeMenu === 'settings'} 
        unmountOnExit timeout={500}
        classNames='menu-secondary'
        onEnter={ calcHeight }
        >
        <div className='menu'>

          <DropdownItem goToMenu='main' leftIcon={'←'}>Settings</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>
          <DropdownItem>thisga</DropdownItem>

        </div>
      </CSSTransition>
    </div>
  )
}

export default Navigation;