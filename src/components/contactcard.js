import React, { useRef } from 'react'

import './contactcard.css'

const Contactcard = ({contact, index, edit, delete, select}) => {

const cardRef = useRef()
const dropdownRef = useRef()

//Function that handles the event when the card is clicked
const handleSelect = index => {
cardRef.current.classList.toggle("selected")
select(index)
}

//Function that handles the event when the dropdown button is clicked
const handleDropdown = () => {
dropdownRef.current.classList.toggle("dropped")
}

return (
<div ref={cardRef} className ="contactcard" onClick={handleSelect}>
<div className="contactcard__avatarcontainer">
{contact.avatar ? <img className ="contactcard__avatarcontainer__img" src={contact.avatar} alt='avatar'>
: <div className ="contactcard__avatarcontainer-icon"><FaUserCircle /></div>
</div>
<div className ="contactcard__details">
<h4 className ="contactcard__details-names">
{contact.firstname} {contact.midname} {contact.surname}
</h4>
<h4 className ="contactcard__details-phone">
{contact.phone}
</h4>
<div className ="contactcard__details-btns-container">
<button className ="contactcard__details-btn" onClick={handleDropdown}>dropdown</button>
<button className ="contactcard__details-btn" onClick={() => edit(index)}>edit</button>
<button className ="contactcard__details-btn" onClick={() => delete(index)}>delete</button>
<button className ="contactcard__details-btn">marked</button>
</div>
<div className = "contactcard__details-underline"></div>
<div ref={dropdownRef} className ="contactcard__details__other">
<p className ="contactcard__detail__other-item">
{contact.email}
</p>
<p className ="contactcard__details__other-item">
{contact.sex}
</p>
<p className ="contactcard__details__other-item">
{contact.address}
</p>
<p className ="contactcard__details__other-item">
{contact.description}
</p>
</div>
</div>
</div>
)
}
