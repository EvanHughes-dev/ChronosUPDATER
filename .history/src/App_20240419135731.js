import "./App.css";

import DefaultSchedule from "./ScheduleSet/DefaultSchedule/DefaultSchedule.jsx";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./ScheduleSet/ScheduleHandle.js";
import "./MainMenu/Menu.css";
import "./Header/Header.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate as useHistory,
} from "react-router-dom";

import CustomSchedule from "./ScheduleSet/CustomSchedule/CustomSchedule.jsx";

const HeaderButtons = ["Default", "Custom"];
function App() {
  const [user, setUser] = useState(null);
  const [LoginPage, setLogin] = useState(null);
  const [ReturnBody, setReturnBody] = useState(null);

  if (
    localStorage.getItem("ReactLoginSetTrueChronos") ===
      process.env.REACT_LOGIN_KEY &&
    user != true
  ) {
    setUser(true);
  }
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
          localStorage.setItem(
            "ReactLoginSetTrueChronos",
            process.env.REACT_LOGIN_KEY
          );

          setUser(true);
        }
      }
    });
  };

  const MainMenu = () => {
    return ReturnBody;
  };

  const Header = () => {
    let location = useLocation();
    let history = useHistory();
    return (
      <div className="topnav">
        {HeaderButtons.map((buttonName) => {
          if ("/" + buttonName === location.pathname) {
            return (
              <a className="active" key={buttonName}>
                {buttonName}
              </a>
            );
          }
          return (
            <a className="inactive" key={buttonName}>
              <button
                className={"BlankButton"}
                onClick={() => {
                  history(buttonName);
                }}
              >
                {buttonName}
              </button>
            </a>
          );
        })}
      </div>
    );
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
  return (
    <div>
      <Router>
        <Header />
        <div>
          {!user ? (
            <Routes>
              <Route path="*" element={MainMenu()}></Route>
            </Routes>
          ) : (
            <Routes>
              <Route
                path={("Default", "*")}
                element={<DefaultSchedule />}
              ></Route>
              <Route path="Custom" element={<CustomSchedule />}></Route>
            </Routes>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
