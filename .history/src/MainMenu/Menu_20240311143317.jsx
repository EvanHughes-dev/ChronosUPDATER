import { useEffect, useState } from "react";
import "./Menu.css";
const MainMenu = () => {
  const [LoginPage, setLogin] = useState(null);
  const [ReturnBody, setReturnBody] = useState(null);

  const SetLoginPageObject = (toggle) => {
    if (toggle) {
      setLogin(<div className="LoginObject"></div>);
    } else {
      setLogin(
        <button
          className="LoginButton"
          onClick={() => {
            SetLoginPageObject(true);
          }}
        >
          Click To Login
        </button>
      );
    }
  };

  useEffect(() => {
    setReturnBody(
      <div className="ParentDiv">
        {LoginPage}
        <center></center>
      </div>
    );
  }, [LoginPage]);

  return ReturnBody;
};

export default MainMenu;
