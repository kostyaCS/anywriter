import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import LandingScreen from "./screens/Landing";
import AuthorizationScreen from "./screens/AuthorizationScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MainPage from "./screens/MainPage";
import { AuthProvider } from './AuthContext';
import MyWorks from "./screens/MyWorks";
import CreateWork from "./screens/CreateWork";
import MyPage from "./screens/MyPage";
import CheckWork from "./screens/CheckWork";
import AboutScreen from "./screens/About";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingScreen />} />
                    <Route path="/about" element={<AboutScreen />} />
                    <Route path="/auth" element={<AuthorizationScreen />} />
                    <Route path="/registration" element={<RegistrationScreen />} />
                    <Route path="/main_page" element={<MainPage />} />
                    <Route path="/my_works" element={<MyWorks />} />
                    <Route path="/create_work" element={<CreateWork />} />
                    <Route path="/my_page" element={<MyPage />} />
                    <Route path="/work/:workId" element={<CheckWork />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
