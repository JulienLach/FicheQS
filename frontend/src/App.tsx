import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AuditPage from "./pages/AuditPage/AuditPage";
import AllAuditsPage from "./pages/AllAuditsPage/AllAuditsPage";
import AuditDetailsPage from "./pages/AuditDetailsPage/AuditDetailsPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { useOfflineSync } from "./hooks/useOfflineSync";

const App: React.FC = () => {
    const { pendingCount } = useOfflineSync();

    return (
        <Router>
            {pendingCount > 0 && (
                <div className="offlineSyncBanner">
                    <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                    {pendingCount} audit{pendingCount > 1 ? "s" : ""} en attente de synchronisation
                </div>
            )}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                    element={
                        <PrivateRoute>
                            <Outlet />
                        </PrivateRoute>
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/audit" element={<AuditPage />} />
                    <Route path="/all-audits" element={<AllAuditsPage />} />
                    <Route path="/audit-details/:idAudit" element={<AuditDetailsPage />} />
                    <Route path="/account" element={<AccountPage />}>/</Route>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
            </Routes>
            <ScrollToTopButton />
        </Router>
    );
};

export default App;
