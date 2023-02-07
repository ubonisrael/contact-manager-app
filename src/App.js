import React, {useState} from 'react';
import './components/welcome/welcome'
import "./App.css";
import Welcome from './components/welcome/welcome';
import Navbar from './components/navbar/navbar'
import Addcontactbtn from './components/addcontactbtn/addcontactbtn';
import Addcontact from './components/addcontact/addcontact';

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const currentTheme = localStorage.getItem('theme')

if (currentTheme === 'dark') {
  document.body.classList.toggle('dark-theme')
} else if (currentTheme === 'dark') {
  document.body.classList.toggle('light-theme')
}

let list

function loadFromLocalStorage () {
  list = JSON.parse(localStorage.getItem("contacts"))
}

function App() {
  const [user, setUser] = useState(false)
  const [contacts, setContacts] useState(list)
  const [theme, setTheme] = useState()
  const [showForm, setShowForm] = useState(false)
  const [avatar, setAvatar] = useState()

  //Handles add contact
  const handleAddContact = e => {
    e.preventDefault()
    const form = document.forms[0]
    setContacts([...contacts, {
     firstname: form.firstname.value,
     midname: form.midname.value,
surname: form.surname.value,
telephone: form.phone.value,
email: form.email.value,
gender: form.gender.value,
address: form.address.value,
description: form.desc.value,
  }

  //Sets contact to local storage
  useEffect(() => {
    localstorage.setItem('contacts', JSON stringify(contactlist))
}, [contacts])

  //function handles the contact form will be displayed
  const showAddContact = () => {
    setShowForm(prev => !prev)
   }
  
  //function handling the image file upload and display
  const updateAvatar = () => {
    const avatar = document.querySelector('.avatar')
    const avatarFile = avatar.files
    if (validFileType(avatarFile) {
       const avatarSrc = URL.createObjectURL(avatarFile)
       setAvatar(avatarSrc)
     }
}

  // function handles signing in event
  const handleSignIn = () => {
    setUser(true);
  };
  //function that handles logging out user
  const handleLogOut = () => {
    setUser(false)
}

  //function handles toggling theme event
  const handleTheme = () => {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle('light-theme')
      setTheme(document.body.classList.contains('light-theme') ? 'light' : 'dark')
    } else {
      document.body.classList.toggle('dark-theme')
      setTheme(document.body.classList.contains('dark-theme') ? 'dark' : 'light')
    }

    localStorage.setItem('theme', theme)
  };

  return (
    <div>
      {user
      ? 
      <>
      <Navbar theme={theme} handleTheme={handleTheme} handleLogOut={handleLogOut}/>
      <Addcontactbtn addcontact={showAddContact}/>
      {showForm ? <Addcontact close={showAddContact} avatar={avatar} updateAvatar={updateAvatar} submit={handleAddContact}/>: null}
      </>
      : <Welcome signin={handleSignIn} theme={theme} handleTheme={handleTheme} />}
    </div>
  );
}

export default App;
