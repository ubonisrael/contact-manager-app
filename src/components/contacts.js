import React, {useState} from 'react'

import './contacts.css'

const Contactlist = ({contacts, mulDelete, edit, delete, select}) => {

return (
<div className='contactlist'>
<div className='contactlist__header'>
<h2 className='contactlist__header-title'></h2>
<button className='contactlist__header-deletemultiple-btn' onClick={mulDelete}></button>
</div>
<div className='contactlist__underline'></div>
{
contacts.length <1?<h4 className='contactlist__empty>
You do not have any contacts. Click on the add button to add a new contact.
</h4>
:
<div className='contactlist__container'>
{contacts.map((contact, i)=>{
return (
<Contactcard key={i} index={i} contacts={contacts} edit={edit} delete={delete} select={select} />
)
})}
</div>
}
</div>
)
}
