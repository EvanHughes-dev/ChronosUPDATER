import { useState } from "react";
import "./Menu.css";
const MainMenu = () => {
  const [LoginPage, setLogin] = useState(null);
  const SetLoginPageObject = () => {
    if (LoginPage === null) {
    } else {
      setLogin(null);
    }
  };
  return (
    <div className="ParentDiv">
      <center>
        <button
          className="LoginButton"
          onClick={() => {
            SetLoginPageObject();
          }}
        >
          Click To Login
        </button>
        {LoginPage}
      </center>
    </div>
  );
};

export default MainMenu;
