import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import AuthScreen from "./screens/AuthScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MainScreen from "./screens/MainScreen";
import { AuthProvider } from './AuthContext';
import ProfileScreen from "./screens/ProfileScreen";
import CreateWorkScreen from "./screens/CreateWorkScreen";
import ViewWorkScreen from "./screens/ViewWorkScreen";
import AboutScreen from "./screens/AboutScreen";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingScreen />} />
                    <Route path="/about" element={<AboutScreen />} />
                    <Route path="/auth" element={<AuthScreen />} />
                    <Route path="/registration" element={<RegistrationScreen />} />
                    <Route path="/main" element={<MainScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/create_work" element={<CreateWorkScreen />} />
                    <Route path="/work/:workId" element={<ViewWorkScreen />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
