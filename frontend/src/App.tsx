import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
