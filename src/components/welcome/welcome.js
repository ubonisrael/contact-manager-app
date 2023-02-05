
import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import "./welcome.css";

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
        <h1 className="welcome__body-title">Welcome to CManager</h1>
        <p className="welcome__body-text">lorem ipsum</p>
        <button className="welcome__body-signin-btn" onClick={signin}>
          Sign-in with GMail
        </button>
      </div>
    </div>
  );
};

export default Welcome;
