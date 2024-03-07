import "./App.css";

import DefaultSchedule from "./ScheduleSet/DefaultSchedule/DefaultSchedule.jsx";

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
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="Default" element={<DefaultSchedule />}></Route>
          <Route path="Custom" element={<CustomSchedule />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
