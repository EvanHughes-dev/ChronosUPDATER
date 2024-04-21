import { useState } from "react";
import "./Menu.css";
const MainMenu = () => {
    const [LoginPage, setLogin]=useState(null
  const SetLoginPageObject = () => {};
  return (
    <div className="ParentDiv">
      <center>
        <button
          className="LoginButton"
          onClick={() => {
            LoginPage();
          }}
        >
          Click To Login
        </button>
        <LoginPage />
      </center>
    </div>
  );
};

export default MainMenu;
