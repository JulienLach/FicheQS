import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import { getAdminUsers, createAdminUser, updateAdminUser } from "../../services/api";
import { UserAdmin } from "../../interfaces/interfaces";
import { usePagination } from "../../hooks/usePagination";
import { validatePassword } from "../../utils/password";

const PAGE_SIZE = 15;

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserAdmin[]>([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const { paginatedData, totalPages } = usePagination(users, page, PAGE_SIZE);

    const [showForm, setShowForm] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newFirstname, setNewFirstname] = useState("");
    const [newLastname, setNewLastname] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState(false);

    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editFirstname, setEditFirstname] = useState("");
    const [editLastname, setEditLastname] = useState("");
    const [editError, setEditError] = useState<string | null>(null);
    const [editSuccess, setEditSuccess] = useState(false);

    const loadUsers = () => {
        getAdminUsers()
            .then((data) => setUsers(data.users))
            .catch(() => setError("Impossible de charger les utilisateurs."));
    };

    useEffect(() => {
        const role = document.cookie
            .split(";")
            .find((c) => c.trim().startsWith("role="))
            ?.split("=")[1];
        if (role !== "2") {
            navigate("/dashboard");
            return;
        }
        loadUsers();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setFormError(passwordError);
            return;
        }
        try {
            await createAdminUser(newEmail, newPassword, newFirstname || undefined, newLastname || undefined);
            setFormSuccess(true);
            setNewEmail("");
            setNewPassword("");
            setNewFirstname("");
            setNewLastname("");
            loadUsers();
            setTimeout(() => {
                setShowForm(false);
                setFormSuccess(false);
            }, 1500);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const openEdit = (u: UserAdmin) => {
        setEditUserId(u.idUser);
        setEditEmail(u.email);
        setEditFirstname(u.firstname ?? "");
        setEditLastname(u.lastname ?? "");
        setEditPassword("");
        setEditError(null);
        setEditSuccess(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editUserId) return;
        setEditError(null);
        if (editPassword) {
            const passwordError = validatePassword(editPassword);
            if (passwordError) {
                setEditError(passwordError);
                return;
            }
        }
        try {
            await updateAdminUser(
                editUserId,
                editEmail || undefined,
                editPassword || undefined,
                editFirstname,
                editLastname,
            );
            setEditSuccess(true);
            loadUsers();
            setTimeout(() => {
                setEditUserId(null);
                setEditSuccess(false);
            }, 1500);
        } catch (err: any) {
            setEditError(err.message);
        }
    };

    return (
        <div>
            <Menu />
            <div className="container">
                <h2 className="headerTitle">
                    <i className="fas fa-wrench"></i>Administration — Utilisateurs
                </h2>
                {error && <div className="empty">{error}</div>}

                <button
                    className="buttonDashboard"
                    onClick={() => {
                        setShowForm(!showForm);
                        setFormError(null);
                        setFormSuccess(false);
                    }}
                >
                    <i className="fas fa-user-plus"></i>Créer un utilisateur
                </button>

                {showForm && (
                    <form className="adminForm" onSubmit={handleCreate}>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={newFirstname}
                            onChange={(e) => setNewFirstname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newLastname}
                            onChange={(e) => setNewLastname(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <small>
                            Critères requis : 12 caractères mininmum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère
                            spécial
                        </small>
                        {formError && <p className="errorMessage">{formError}</p>}
                        {formSuccess && <p className="successMessage">Utilisateur créé !</p>}
                        <div style={{ display: "flex", gap: "0.8em" }}>
                            <button
                                type="button"
                                className="buttonDashboard"
                                style={{ margin: 0, background: "#6b7280", border: "none" }}
                                onClick={() => {
                                    setShowForm(false);
                                    setFormError(null);
                                }}
                            >
                                Annuler
                            </button>
                            <button type="submit" className="buttonDashboard" style={{ margin: 0 }}>
                                Créer
                            </button>
                        </div>
                    </form>
                )}

                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((u) => (
                            <React.Fragment key={u.idUser}>
                                <tr>
                                    <td>{u.idUser}</td>
                                    <td>{u.firstname}</td>
                                    <td>{u.lastname}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role === 2 ? "Admin" : "Utilisateur"}</td>
                                    <td>
                                        <button
                                            className="adminEditBtn"
                                            onClick={() =>
                                                editUserId === u.idUser ? setEditUserId(null) : openEdit(u)
                                            }
                                        >
                                            <i className="far fa-pen-to-square"></i>
                                        </button>
                                    </td>
                                </tr>
                                {editUserId === u.idUser && (
                                    <tr>
                                        <td colSpan={6}>
                                            <form className="adminForm" onSubmit={handleUpdate}>
                                                <input
                                                    type="text"
                                                    placeholder="Prénom"
                                                    value={editFirstname}
                                                    onChange={(e) => setEditFirstname(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Nom"
                                                    value={editLastname}
                                                    onChange={(e) => setEditLastname(e.target.value)}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={editEmail}
                                                    onChange={(e) => setEditEmail(e.target.value)}
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)"
                                                    value={editPassword}
                                                    onChange={(e) => setEditPassword(e.target.value)}
                                                />
                                                {editError && <p className="errorMessage">{editError}</p>}
                                                {editSuccess && <p className="successMessage">Mis à jour !</p>}
                                                <div style={{ display: "flex", gap: "0.8em" }}>
                                                    <button
                                                        type="button"
                                                        className="buttonDashboard"
                                                        style={{ margin: 0, background: "#6b7280", border: "none" }}
                                                        onClick={() => setEditUserId(null)}
                                                    >
                                                        Annuler
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="buttonDashboard"
                                                        style={{ margin: 0 }}
                                                    >
                                                        Enregistrer
                                                    </button>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="pagination">
                        <i
                            className={`fas fa-chevron-left${page === 1 ? " disabled" : ""}`}
                            onClick={() => page > 1 && setPage(page - 1)}
                        ></i>
                        <span>
                            {page} / {totalPages}
                        </span>
                        <i
                            className={`fas fa-chevron-right${page === totalPages ? " disabled" : ""}`}
                            onClick={() => page < totalPages && setPage(page + 1)}
                        ></i>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
