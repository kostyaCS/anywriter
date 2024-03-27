import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import AuthorizationScreen from "./screens/AuthorizationScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import UserTestPage from "./screens/UserTestPage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={
                  <AuthorizationScreen/>} />
              <Route path="/registration" element={<RegistrationScreen/>} />
              <Route path="/user" element={<UserTestPage/>} />
          </Routes>
      </Router>
  );
}

export default App;
