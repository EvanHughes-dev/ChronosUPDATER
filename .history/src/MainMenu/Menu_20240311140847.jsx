import { useEffect, useState } from "react";
import "./Menu.css";
const MainMenu = () => {
  const [LoginPage, setLogin] = useState(null);
  const SetLoginPageObject = () => {
    if (LoginPage === null) {
    } else {
      setLogin(null);
    }
  };
  var ReturnBody;
useEffect(()=>{ReturnBody=(<div className="ParentDiv">
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
</div>)},[LoginPage])

  return (
    
  );
};

export default MainMenu;
