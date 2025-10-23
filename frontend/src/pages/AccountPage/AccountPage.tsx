import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import AccountForm from "../../components/AccountForm/AccountForm";

const AccountPage: React.FC = () => {
    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="far fa-user"></i>Mon compte
                </h2>
                <AccountForm />
            </div>
        </div>
    );
};

export default AccountPage;
