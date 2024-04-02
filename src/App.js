import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import AuthorizationScreen from "./screens/AuthorizationScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MainPage from "./screens/MainPage";
import { AuthProvider } from './AuthContext';

function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={
                      <AuthorizationScreen/>} />
                  <Route path="/registration" element={<RegistrationScreen/>} />
                  <Route path="/user" element={<MainPage/>} />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
