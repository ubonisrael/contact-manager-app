import React, {useState} from 'react';
import './components/welcome/welcome'
import "./App.css";
import Welcome from './components/welcome/welcome';
import Navbar from './components/navbar/navbar'

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const currentTheme = localStorage.getItem('theme')

if (currentTheme === 'dark') {
  document.body.classList.toggle('dark-theme')
} else if (currentTheme === 'dark') {
  document.body.classList.toggle('light-theme')
}

function App() {
  const [user, setUser] = useState(false)
  const [theme, setTheme] = useState()
  

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
      ? <Navbar theme={theme} handleTheme={handleTheme} handleLogOut={handleLogOut}/>
      : <Welcome signin={handleSignIn} theme={theme} handleTheme={handleTheme} />}
    </div>
  );
}

export default App;
