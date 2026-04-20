import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoMobile from "../../assets/images/logo-mobile.png";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const appVersion = import.meta.env.PACKAGE_VERSION;
    const navigate = useNavigate();
    const roleCookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("role="))
        ?.split("=")[1];
    const isAdmin = roleCookie === "2";

    const toggleMenu = () => setIsOpen(isOpen == false);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="menu">
            <div className="">
                <img src={LogoMobile} alt="Logo" className="logoPages" onClick={() => navigate("/dashboard")} />
            </div>
            <button className="menuButton" onClick={toggleMenu}>
                <i className={`fas fa-${isOpen ? "times" : "bars"}`}></i>
            </button>
            {isOpen && (
                <div className="menuItems">
                    <button className="closeButton" onClick={toggleMenu}>
                        <i className="fas fa-xmark"></i>
                    </button>
                    {isAdmin && (
                        <button className="buttonMenu" onClick={() => handleNavigation("/admin")}>
                            <i className="fa fa-wrench"></i>Administration
                        </button>
                    )}
                    <button className="buttonMenu" onClick={() => handleNavigation("/account")}>
                        <i className="fas fa-user"></i>Mon compte
                    </button>
                    <button className="buttonMenu" onClick={() => handleNavigation("/login")}>
                        <i className="fas fa-arrow-right-from-bracket"></i>Déconnexion
                    </button>
                    <div className="version-tag">{appVersion}</div>
                </div>
            )}
        </div>
    );
};

export default Menu;
