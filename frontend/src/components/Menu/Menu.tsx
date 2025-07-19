import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoMobile from "../../assets/images/logo-mobile.png";
import "./Menu.css";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="menu">
            <div className="">
                <img src={LogoMobile} alt="Logo" className="logoPages" />
            </div>
            <button className="menuButton" onClick={toggleMenu}>
                <i className={`fas fa-${isOpen ? "times" : "bars"}`}></i>
            </button>
            {isOpen && (
                <div className="menuItems">
                    <button className="closeButton" onClick={toggleMenu}>
                        <i className="fas fa-xmark"></i>
                    </button>
                    <button
                        className="buttonMenu"
                        onClick={() => handleNavigation("/dashboard")}
                    >
                        <i className="fas fa-user"></i>Mon compte
                    </button>
                    <button
                        className="buttonMenu"
                        onClick={() => handleNavigation("/login")}
                    >
                        <i className="fas fa-sign-out-alt"></i>Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;
