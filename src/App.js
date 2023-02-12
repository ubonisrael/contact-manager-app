import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { storage } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "./App.css";
import Welcome from "./components/welcome/welcome";
import Navbar from "./components/navbar/navbar";
import Contactlist from "./components/contacts/contacts";
import Addcontactbtn from "./components/addcontactbtn/addcontactbtn";
import Addcontact from "./components/addcontact/addcontact";
import Editcontact from "./components/edit/edit";

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme === "dark") {
  document.body.classList.toggle("light-theme");
}

let list;
console.log(localStorage.getItem("contacts"));

function IDgen() {
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

function App() {
  const [user] = useAuthState(auth);
  const [contacts, setContacts] = useState(list);
  const [theme, setTheme] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  const [editContact, setEdit] = useState();
  const [avatar, setAvatar] = useState();
  const [selected, setSelect] = useState([]);

  //Handles add contact
  const handleAddContact = () => {
    const form = document.forms[0];
    setContacts([
      ...contacts,
      {
        firstname: form.firstname.value,
        midname: form.midname.value,
        surname: form.surname.value,
        telephone: form.phone.value,
        email: form.email.value,
        gender: form.gender.value,
        address: form.address.value,
        description: form.desc.value,
        ID: `${form.phone.value}A${IDgen()}`,
      },
    ]);
    showAddContact();
  };

  //handles editing contacts
  const handleEdit = (i) => {
    const contact = contacts.find((contact) => contact.ID === i);
    setEdit(contact);
    showEdit();
  };

  //Toggles the display of the edit form
  const showEdit = () => {
    setEditForm((prev) => !prev);
  };

  //handles submission of edited contact
  const handleEditContact = () => {
    const form = document.forms[1];
    const editedContact = {
      firstname: form.firstname.value,
      midname: form.midname.value,
      surname: form.surname.value,
      telephone: form.phone.value,
      email: form.email.value,
      gender: form.gender.value,
      address: form.address.value,
      description: form.desc.value,
      ID: editContact.ID,
    };

    setContacts((prev) =>
      prev.map((contact, i) => {
        if (contact.ID === editedContact.ID) {
          return editedContact;
        } else {
          return contact;
        }
      })
    );

    showEdit();
  };

  //handles the deletion of a single contact
  const handleDelete = (i) => {
    const contactIndex = contacts.findIndex((contact) => contact.ID === i);
    setContacts((prev) =>
      prev.slice(0, contactIndex).concat(prev.slice(1 + contactIndex))
    );
  };

  //handles the deletion of multiple contacts
  const handleDeleteMultiple = () => {
    const newContacts = contacts.filter((contact, i) => {
      if (selected.indexOf(contact.ID) < 0) {
        return contact;
      }
    });
    setContacts(newContacts);
    setSelect([]);
  };

  //handles the selection of a contact
  const handleSelect = (i) => {
    const contactIndex = contacts.findIndex((contact) => contact.ID === i);
    if (selected.indexOf(contactIndex)) {
      setSelect((prev) =>
        prev.slice(0, contactIndex).concat(prev.slice(1 + contactIndex))
      );
    } else {
      setSelect([...selected, contactIndex]);
    }
  };

  //Sets contact to local storage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  //function handles the contact form will be displayed
  const showAddContact = () => {
    setShowForm((prev) => !prev);
  };

  //function handling the image file upload and display
  const updateAvatar = () => {
    const avatar = document.querySelector(".avatar");
    const avatarFile = avatar.files;
    const avatarSrc = URL.createObjectURL(avatarFile);
    setAvatar(avatarSrc);
  };

  // function handles signing in event
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
    //addfirst time user to database
    //addUser()
  };
  //function that handles logging out user
  const handleLogOut = () => {
    auth.signOut()
  };

  //function handles toggling theme event
  const handleTheme = () => {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      setTheme(
        document.body.classList.contains("light-theme") ? "light" : "dark"
      );
    } else {
      document.body.classList.toggle("dark-theme");
      setTheme(
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    }

    localStorage.setItem("theme", theme);
  };

  return (
    <div>
      {user ? (
        <>
          <Navbar
            theme={theme}
            handleTheme={handleTheme}
            handleLogOut={handleLogOut}
          />
          <Contactlist
            contacts={contacts}
            avatar={avatar}
            delMultiple={handleDeleteMultiple}
            del={handleDelete}
            select={handleSelect}
            show={showAddContact}
          />
          <Addcontactbtn addcontact={showAddContact} />
          {showForm ? (
            <Addcontact
              close={showAddContact}
              avatar={avatar}
              updateAvatar={updateAvatar}
              submit={handleAddContact}
            />
          ) : null}
          {showEditForm ? (
            <Editcontact
              contact={editContact}
              close={showEdit}
              avatar={avatar}
              submit={handleEditContact}
            />
          ) : null}
        </>
      ) : (
        <Welcome
          signin={handleSignIn}
          theme={theme}
          handleTheme={handleTheme}
        />
      )}
    </div>
  );
}

export default App;