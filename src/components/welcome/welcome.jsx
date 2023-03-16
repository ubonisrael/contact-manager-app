
import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import "./welcome.css";
import googleSignin from '../../assets/btn_google_signin_dark_pressed_web.png'

const Welcome = ({ signin, theme, handleTheme }) => {
  
  

  return (
    <div className="welcome">
      {theme !== 'light' ? (
        <button className="welcome__theme-btn" onClick={handleTheme}>
          <FaRegSun />
        </button>
      ) : (
        <button className="welcome__theme-btn" onClick={handleTheme}>
          <FaRegMoon />
        </button>
      )}
      <div className="welcome__body">
        <h2 className="welcome__body-title">Welcome to CManager</h2>
        <p className="welcome__body-text">Sign in and start adding your contacts to your favorite online contacts book.</p>
        <button className="welcome__body-signin-btn" onClick={signin}>
          <img src={googleSignin} alt="google signin" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
