import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import './addcontactbtn.css'

const Addcontactbtn = ({addcontact}) => {
  return (
    <div className='addcontactbtn__container'>
        <button className='addcontact-btn' onClick={addcontact}>
            <IconContext.Provider value={{className: 'addcontactbtn-icon'}} >
                <FaPlusCircle />
            </IconContext.Provider>
        </button>
    </div>
  )
}

export default Addcontactbtn