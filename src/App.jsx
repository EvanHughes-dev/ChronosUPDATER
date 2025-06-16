import "./App.css";
import DefaultSchedule from "./ScheduleSet/DefaultSchedule/DefaultSchedule.jsx";
import CustomSchedule from "./ScheduleSet/CustomSchedule/CustomSchedule.jsx";
import { HeaderObject } from "./Header/Header.jsx";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./ScheduleSet/ScheduleHandle.jsx";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

/**
 * Main application component that sets up routing, handles login,
 * and manages conditional rendering based on user authentication.
 */
function App() {
  const [user, setUser] = useState(null);

  // Auto-login if user info is stored in localStorage
  useEffect(() => {
    if (user !== true &&
      localStorage.getItem("ReactLoginSetTrueChronos") === "SavedUser"

    ) {
      setUser(true);
    }
  }, [user]);

  /**
   * Handle the submit action of the login form
   * @param {Event} e - Event of the form submitting
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    const UserNameValue = document.getElementById("UserName").value;
    const PasswordValue = document.getElementById("UserPassword").value;

    try {
      const foundDoc = await getDoc(doc(db, "Login", "Login"));
      if (foundDoc.exists()) {
        const data = foundDoc.data();
        if (
          data.Password === PasswordValue &&
          data.id.toString() === UserNameValue
        ) {
          localStorage.setItem("ReactLoginSetTrueChronos", "SavedUser");
          setUser(true);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const LoginPage = (
    <div className="parent-div">
      <center>
        <Container className="login-container">
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <Form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <FormGroup>
                  <Label for="UserName">Username:</Label>
                  <Input type="text" id="UserName" required />
                </FormGroup>
                <FormGroup>
                  <Label for="UserPassword">Password:</Label>
                  <Input type="password" id="UserPassword" required />
                </FormGroup>
                <Button color="primary" type="submit" className="SubmitBtn">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </center>
    </div>
  );

  return (
    <div>
      <HashRouter>
        <HeaderObject />
        <div>
          {!user ? (
            <Routes>
              <Route path="*" element={LoginPage} />
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<DefaultSchedule />} />
              <Route path="Custom" element={<CustomSchedule />} />
            </Routes>
          )}
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
