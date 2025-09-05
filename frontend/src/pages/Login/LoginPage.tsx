import React from "react";
import LogoMobile from "../../assets/images/logo-mobile.png";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <div className="container">
            <img src={LogoMobile} alt="Logo" className="logoMobile" />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
