import { useEffect, useState } from "react";
import "./Menu.css";
const MainMenu = () => {
  const [LoginPage, setLogin] = useState(null);
  const [ReturnBody, setReturnBody] = useState(null);
  const SetLoginPageObject = () => {
    if (LoginPage === null) {
      setLogin(<div className="LoginObject"></div>);
    } else {
      setLogin(null);
    }
  };

  useEffect(() => {
    setReturnBody(
      <>
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
          </center>
        </div>
        {LoginPage}
      </>
    );
  }, [LoginPage]);

  return ReturnBody;
};

export default MainMenu;
