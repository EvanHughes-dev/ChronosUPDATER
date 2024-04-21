import "./Menu.css";
const MainMenu = () => {
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

const LoginPage = () => {};
export default MainMenu;
