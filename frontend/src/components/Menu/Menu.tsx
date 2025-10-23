import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoMobile from "../../assets/images/logo-mobile.png";
import "./Menu.css";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const appVersion = import.meta.env.PACKAGE_VERSION;
    const navigate = useNavigate();

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
                    <button className="buttonMenu" onClick={() => handleNavigation("/account")}>
                        <i className="far fa-user"></i>Mon compte
                    </button>
                    <button className="buttonMenu" onClick={() => handleNavigation("/login")}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>Déconnexion
                    </button>
                    <a className="gdpr" onClick={() => handleNavigation("/mentions-legales")}>
                        Mentions légales
                    </a>
                    <div className="version-tag">{appVersion}</div>
                </div>
            )}
        </div>
    );
};

export default Menu;
