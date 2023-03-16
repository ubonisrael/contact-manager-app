import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "./firebase";
import { storage } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "./App.css";
import Welcome from "./components/welcome/welcome";
import Navbar from "./components/navbar/navbar";
import Contactlist from "./components/contacts/contacts";
import Addcontactbtn from "./components/addcontactbtn/addcontactbtn";
import Addcontact from "./components/addcontact/addcontact";
import Editcontact from "./components/edit/edit";
import {
  query,
  setDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  writeBatch,
  where,
  getDocs,
} from "firebase/firestore";
import Spinner from "./components/spinner/spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/searchbar/searchbar";
import { Footer } from "./components/footer/footer";

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme === "light") {
  document.body.classList.toggle("light-theme");
}

function IDgen() {
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

function App() {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [theme, setTheme] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  const [editContact, setEdit] = useState();
  const [avatar, setAvatar] = useState();
  const [selected, setSelect] = useState([]);
  const [search, setSearch] = useState("");

  //Handles add contact
  const handleAddContact = async () => {
    const form = document.forms[0];
    const contactID = `${form.phone.value}A${IDgen()}`;
    const contact = {
      firstname: form.firstname.value,
      midname: form.midname.value,
      surname: form.surname.value,
      telephone: form.phone.value,
      email: form.email.value,
      gender: form.gender.value,
      address: form.address.value,
      description: form.desc.value,
      ID: contactID,
      avatar: avatar ? avatar : "",
    };

    await setDoc(doc(db, "users", user.uid, "contacts", contactID), contact);

    showAddContact();
    toast.success("Contact Added Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    setAvatar();
  };

  //handles editing contacts
  const handleEdit = (i) => {
    const contact = contacts.find((contact) => contact.ID === i);
    setEdit(contact);
    showEdit();
    setAvatar(contact.avatar);
  };

  //Toggles the display of the edit form
  const showEdit = () => {
    setEditForm((prev) => !prev);
  };

  //handles submission of edited contact
  const handleEditContact = async () => {
    const form = document.forms[0];
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
      avatar: avatar ? avatar : "",
    };

    const contactID = editContact.ID;

    await setDoc(
      doc(db, "users", user.uid, "contacts", contactID),
      editedContact
    );
    toast.success("Contact Edited Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });

    showEdit();
    setAvatar();
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const q = query(collection(db, "users", user.uid, "contacts"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let contactlist = [];
      QuerySnapshot.forEach((doc) => {
        contactlist.push(doc.data());
      });
      setContacts(contactlist);
    });

    return () => unsubscribe;
  }, [user]);

  //handles the deletion of a single contact
  const handleDelete = async (i) => {
    await deleteDoc(doc(db, "users", user.uid, "contacts", i));
    toast.success("Contact Deleted Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //handles the deletion of multiple contacts
  const handleDeleteMultiple = async () => {
    const batch = writeBatch(db);

    //get the contacts to be deleted
    const contactsQuery = query(
      collection(db, "users", user.uid, "contacts"),
      where("ID", "in", [...selected])
    );
    const contactsQuerySnapshot = await getDocs(contactsQuery);
    contactsQuerySnapshot.forEach((doc) => batch.delete(doc.ref));

    batch.commit();
    setSelect([]);
    toast.success("Contacts Deleted Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //handles the selection of a contact
  const handleSelect = (i) => {
    if (selected.indexOf(i) >= 0) {
      setSelect((prev) => prev.filter((item) => item !== i));
    } else {
      setSelect([...selected, i]);
    }
  };


  const customToastId = 'custom'

  const selectNotification = () =>
    toast.info(`${selected.length} contact(s) selected`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: selected.length > 0 ? false : true,
      toastId: customToastId,
    });

  useEffect(() => {
    if (toast.isActive(customToastId)) {
      // updateNotification
      toast.update(customToastId, {
        render: `${selected.length} contact(s) selected`,
        type: toast.TYPE.INFO,
        autoClose: selected.length > 0 ? false : true,
      });
      return;
    }

    if (selected.length < 1) return
    
    selectNotification();
  }, [selected]);

  //function handles the contact form will be displayed
  const showAddContact = () => {
    setShowForm((prev) => !prev);
    setAvatar();
  };

  //function handling the image file upload and display
  const updateAvatar = (e) => {
    const avatarFile = e.target.files[0];
    if (!avatarFile) return;

    const storageRef = ref(
      storage,
      `cmanager/${user.uid}/${user.uid}${IDgen()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, avatarFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        alert(error);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setAvatar(downloadURL);
        })
    );
  };

  // function handles signing in event
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      }
    });
  }, []);

  //function that handles logging out user
  const handleLogOut = () => {
    auth.signOut();
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {!isLoading && !user ? (
        <Welcome
          signin={handleSignIn}
          theme={theme}
          handleTheme={handleTheme}
        />
      ) : !isLoading && user ? (
        <>
          <Navbar
            theme={theme}
            handleTheme={handleTheme}
            handleLogOut={handleLogOut}
            displayName={user.displayName}
            photoURL={user.photoURL}
          />
          <Searchbar search={search} handleSearch={handleSearch} />
          <Contactlist
            contacts={contacts}
            delMultiple={handleDeleteMultiple}
            del={handleDelete}
            edit={handleEdit}
            select={handleSelect}
            show={showAddContact}
            selected={selected}
            search={search}
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
          <Footer />
        </>
      ) : (
        <Spinner />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
