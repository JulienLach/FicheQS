import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import FicheqsPage from "./pages/FicheqsPage/FicheqsPage";
import AllFichesqsPage from "./pages/AllFichesqsPage/AllFichesqsPage";
import FicheqsDetailsPage from "./pages/FicheqsDetails/FicheqsDetailsPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/ficheqs" element={<FicheqsPage />} />
                <Route path="/all-fichesqs" element={<AllFichesqsPage />} />
                <Route
                    path="/ficheqs-details/:idFiche"
                    element={<FicheqsDetailsPage />}
                />
            </Routes>
        </Router>
    );
};

export default App;
