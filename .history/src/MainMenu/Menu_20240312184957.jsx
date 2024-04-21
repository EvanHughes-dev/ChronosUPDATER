import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../ScheduleSet/ScheduleHandle";
import "./Menu.css";

const userSet = false;

const MainMenu = () => {
  const [LoginPage, setLogin] = useState(null);
  const [ReturnBody, setReturnBody] = useState(null);

  const handleLogin = async (e) => {
    const UserNameValue = document.getElementById("UserName").value;
    const PasswordValue = document.getElementById("UserPassword").value;
    e.preventDefault();
    await getDoc(doc(db, "Login", "Login")).then((foundDoc) => {
      if (foundDoc.exists) {
        if (
          foundDoc.data().Password == PasswordValue &&
          foundDoc.data().id == UserNameValue
        ) {
          console.log("True");
        }
      }
    });
  };

  const SetLoginPageObject = () => {
    if (LoginPage === null) {
      document.getElementById("ToggleButton").style.display = "none";
      setLogin(
        <div className="FullScreenObject">
          <form
            className="LoginObject"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <div className="FormElement">
              <label htmlFor="UserName">Username: </label>
              <input type="text" name="name" id="UserName" required />
            </div>
            <div className="FormElement">
              <label htmlFor="UserPassword">Password: </label>
              <input
                type="password"
                name="password"
                id="UserPassword"
                required
              />
            </div>
            <input type="submit" className="Submit"></input>
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
