import React from 'react'
import { FaTimes } from 'react-icons/fa'

import './addcontact.css'


const Addcontact = () => {
  return (
    <div className='addcontact'>
        <div className='addcontact__container'>
            <button className='addcontact__container-closebtn'>
                <FaTimes />
            </button>
            <form className='addcontact__form'>
                <div addcontact__form__header>
                    <h2>Add Contact</h2>
                </div>
                {/* <div addcontact__form__details></div> image display */}
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
                <div addcontact__form__details></div>
            </form>
        </div>
    </div>
  )
}

export default Addcontact