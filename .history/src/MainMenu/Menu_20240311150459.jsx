import { useEffect, useState } from "react";
import "./Menu.css";
const MainMenu = () => {
  const [LoginPage, setLogin] = useState(null);
  const [ReturnBody, setReturnBody] = useState(null);
  const SetLoginPageObject = () => {
    if (LoginPage === null) {
      document.getElementById("ToggleButton").style.display = "none";
      setLogin(
        <div className="FullScreenObject">
          <form className="LoginObject">
            <div>
              <label htmlFor="UserName">Username: </label>
              <input type="text" name="name" id="UserName" />
            </div>
            <div>
              <label htmlFor="UserPassword">Password: </label>
              <input type="password" name="password" id="UserPassword" />
            </div>
          </form>
        </div>
      );
    } else {
      document.getElementById("ToggleButton").style.display = "inherit";
      setLogin(null);
    }
  };

  useEffect(() => {
    setReturnBody(
      <div className="ParentDiv">
        {LoginPage}
        <center>
          <button
            className="LoginButton"
            id="ToggleButton"
            onClick={() => {
              SetLoginPageObject();
            }}
          >
            Click To Login
          </button>
        </center>
      </div>
    );
  }, [LoginPage]);

  return ReturnBody;
};

export default MainMenu;
