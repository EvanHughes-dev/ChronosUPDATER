import logo from "./logo.svg";
import "./App.css";
import ScheduleSet from "./ScheduleSet/ScheduleSet.js";
import { useEffect, useState } from "react";
import "./Header/Header.css";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
const HeaderButtons = ["Default", "Custom"];
function App() {
  const [currentSelect, setSelected] = useState("Default");

  const Header = () => {
    return (
      <div className="topnav">
        {HeaderButtons.map((buttonName) => {
          if (buttonName === currentSelect) {
            return (
              <a className="active" key={buttonName}>
                {buttonName}
              </a>
            );
          }
          return (
            <a className="inactive" key={buttonName}>
              <button
                className="BlankButton"
                onClick={() => {
                  setSelected(buttonName);
                }}
              >
                <Link to={buttonName}>{buttonName}</Link>
              </button>
            </a>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="Default" element={<ScheduleSet />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
