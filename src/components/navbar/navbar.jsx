import React, {useState} from 'react'

import './navbar.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaPortrait, FaRegSun, FaRegMoon, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const Navbar = ({theme, handleTheme, handleLogOut, displayName, photoURL}) => {

    const [toggled, setToggle] = useState(false)
    
    // function that handles toggling navbar menu
    const handleToggle = () => {
        document.querySelector('.navbar__center').classList.toggle('show-links')
        setToggle(prev => !prev)
    }

    return (
        <nav className='navbar'>
                <div className='navbar__header'>
                    {!toggled 
                    ? <button className='navbar__header-toggle-btn' onClick={handleToggle}><RxHamburgerMenu size='2rem' /></button>
                    : <button className='navbar__header-toggle-btn' onClick={handleToggle}><FaTimes size='2rem' /></button>}
                    <IconContext.Provider value={{className: 'logo'}}>
                        <FaPortrait />
                    </IconContext.Provider>
                    <h1 className='navbar__header-title'>CManager</h1>
                </div>
                <div className='navbar__center'>
                <ul className='navbar__center__links'>
                    <li>
                    <img className='navbar__center__links-userPhoto' src={photoURL} alt='userPhoto'/>
                    <p>{displayName}</p>
                    </li>
                    <li>
                        <p onClick={handleLogOut}>Log Out</p>
                    </li>
                </ul>
                    {theme !== 'light'
                    ?(
                        <button className="navbar__center__theme-btn" onClick={handleTheme}>
                          <FaRegSun size='1.5rem'/>
                        </button>
                      ) : (
                        <button className="navbar__center__theme-btn" onClick={handleTheme}>
                          <FaRegMoon size='1.5rem'/>
                        </button>
                      )
                    }
                </div>
        </nav>
    )
}

export default Navbar