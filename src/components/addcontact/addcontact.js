import React, {useState} from 'react'
import { FaTimes, FaUser, FaUserAlt, FaUserCircle } from 'react-icons/fa'

import './addcontact.css'

const formFields = [
    {label: 'First Name', name: 'firstname'},
    {label: 'Middle Name', name: 'midname'},
    {label: 'Surname', name: 'surname'},
    {label: 'Telephone', name: 'phone'},
    {label: 'Email', name: 'mail'},
    {label: 'Gender', name: 'gender'},
    {label: 'Address', name: 'address'},
    {label: 'Description', name: 'desc'},
]

const Addcontact = () => {
    const avatar = document.querySelector('.avatar')

    //function that handles submitting the form ?? passed down from app
    const submit = e => {
        e.preventDefault()
        console.log('contact added');
    }

    const [firstname, setFirstname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [input, setInput] = useState('')

    const [error, setError] = useState({firstname: '', phone: '', email: ''})


    // functions that handle input change forms
    const handleFirstname = e => {
        setFirstname(e.target.value)
    }
    const handlePhone = e => {
        setPhone(e.target.value)
    }
    const handleEmail = e => {
        setEmail(e.target.value)
    }
    //other inputs
    const handleInput = e => {
        setInput(e.target.value)
    }
  return (
    <div className='addcontact'>
        <div className='addcontact__container'>
            <button className='addcontact__container-closebtn'>
                <FaTimes />
            </button>
            <form className='addcontact__form'>
                <div className='addcontact__form__header'>
                    <h2>Add Contact</h2>
                </div>
                <div className='addcontact__form__details-image-container'>
                    {avatar 
                    ? <img src='' alt='avatar' className='addcontact__form__details-image'/>
                    : <span className='addcontact__form__details-avatar-icon'><FaUserCircle  /></span>}
                    <label htmlFor='avatar'>Select Contact Image <input type='file' id='avatar' className='addcontact__form__details-avatar-picker' name='avatar' accept='image/*' /></label>
                </div>
                {formFields.map((field, i) => {
                    return (
                        <div key={field.name+i} className='addcontact__form__details-container'>
                            <label htmlFor={field.name} className='addcontact__form__details-label'>{field.label} :</label>
                            {field.name === 'desc'
                            ? <textarea id='desc' className='addcontact__form__details-input desc' ></textarea>
                            : field.name === 'gender'
                            ? <select name='gender' id='gender'>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                            : <input id={field.name} className='addcontact__form__details-input'
                                type={field.name === 'phone' ? 'number' : 'text'}
                                onChange={field.name === 'firstname' ? handleFirstname
                                : field.name === 'phone' ? handlePhone
                                : field.name === 'email' ? handleEmail
                                : handleInput}
                                value={field.name === 'firstname' ? firstname
                                    : field.name === 'phone' ? phone
                                    : field.name === 'email' ? email
                                    : input} />}
                            {field.name === 'firstname' ? <span className='error'>{error.firstname}</span>
                                    : field.name === 'phone' ? <span className='error'>{error.phone}</span>
                                    : field.name === 'email' ? <span className='error'>{error.email}</span>
                                    : null}
                        </div>
                    )
                })}
                <button type='submit' className='addcontact__form-btn' onClick={submit}>Add Contact</button>
            </form>
        </div>
    </div>
  )
}

export default Addcontact