import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import AccountForm from "../../components/AccountForm/AccountForm";

const AccountPage: React.FC = () => {
    return (
        <div className="container">
            <Menu />
            <h2 className="headerTitle">
                <i className="fas fa-file-circle-check"></i>Fiche qualité sécurité validée
            </h2>
            <AccountForm />
        </div>
    );
};

export default AccountPage;
