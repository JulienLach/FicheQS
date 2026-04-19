import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toInputDateValue } from "../../utils/date";
import { getCookie } from "../../utils/cookie";
import { formatStatusTag } from "../../utils/status";
import QuestionSection from "./QuestionSection";
import SignatureCanvas, { SignatureCanvasHandle } from "./SignatureCanvas";
import { createAudit, deleteAudit } from "../../services/api";
import { sendPDF, generatePDF } from "../../services/api";
import { AuditQuestion, ActionCorrective, Rating } from "../../interfaces/interfaces";

type AuditFormProps = {
    auditData: {
        idAudit: number;
        status: number;
        auditDate: string;
        site: string;
        auditeur: string;
        natureAudit: string;
        audites: string;
        observationGenerale?: string;
        signature?: string;
        signatureTimestamp?: string | null;
    };
    questions: { idQuestion: number; valeur: Rating; observation: string }[];
    actions: ActionCorrective[];
    readOnly: boolean;
    showSubmitButton: boolean;
    showEmailButton: boolean;
    showDeleteButton: boolean;
};

const SSE_INIT: AuditQuestion[] = [
    { idQuestion: 1, valeur: null, observation: "", label: "Ordre / Rangement", section: "SSE" },
    {
        idQuestion: 2,
        valeur: null,
        observation: "",
        label: "Conditions de travail (Environnement-installation bureau)",
        section: "SSE",
    },
    { idQuestion: 3, valeur: null, observation: "", label: "Accès (lieu de passage dégagé)", section: "SSE" },
    {
        idQuestion: 4,
        valeur: null,
        observation: "",
        label: "Conformité du matériel (couleur pastille)",
        section: "SSE",
    },
    {
        idQuestion: 5,
        valeur: null,
        observation: "",
        label: "A quoi sert un PDP (coactivité/interférence) ?",
        section: "SSE",
    },
    {
        idQuestion: 6,
        valeur: null,
        observation: "",
        label: "Présentation des habilitations (date de validité)",
        section: "SSE",
    },
    { idQuestion: 7, valeur: null, observation: "", label: "Donnez thème de la dernière causerie", section: "SSE" },
    {
        idQuestion: 8,
        valeur: null,
        observation: "",
        label: "Quelles sont les consignes de confinement ?",
        section: "SSE",
    },
    { idQuestion: 9, valeur: null, observation: "", label: "Vérification permis de conduire", section: "SSE" },
    {
        idQuestion: 10,
        valeur: null,
        observation: "",
        label: "Où se trouve le classeur SSE ? (PDP, lettre engagement, document unique, règlement intérieur)",
        section: "SSE",
    },
    {
        idQuestion: 11,
        valeur: null,
        observation: "",
        label: "Équipement 1er secours (trousse pharmacie, SST, infirmerie)",
        section: "SSE",
    },
    {
        idQuestion: 12,
        valeur: null,
        observation: "",
        label: "Que veut dire CPSHE et où le trouve-t-on ?",
        section: "SSE",
    },
    {
        idQuestion: 13,
        valeur: null,
        observation: "",
        label: "Quelles sont les consignes en cas d'alertes ? (incendie-sirène d'unité)",
        section: "SSE",
    },
    { idQuestion: 14, valeur: null, observation: "", label: "Qu'est ce qu'un lancement de travail ?", section: "SSE" },
    {
        idQuestion: 15,
        valeur: null,
        observation: "",
        label: "Que veut dire L.S.A. ? Donner le nombre (11) ?",
        section: "SSE",
    },
    {
        idQuestion: 16,
        valeur: null,
        observation: "",
        label: "Que veut dire LPS ? (Loss Prévention System)",
        section: "SSE",
    },
    {
        idQuestion: 17,
        valeur: null,
        observation: "",
        label: "Qu'est ce qu'un MPP ? (Minute Papillon Personnel)",
        section: "SSE",
    },
    { idQuestion: 18, valeur: null, observation: "", label: "Citez les 4 règles qui sauvent la vie ?", section: "SSE" },
    {
        idQuestion: 19,
        valeur: null,
        observation: "",
        label: "Quelle est la durée max. légale du travail ? (10h/jour et 48h/semaine)",
        section: "SSE",
    },
    { idQuestion: 20, valeur: null, observation: "", label: "Connaissez vous le numéro d'urgence ?", section: "SSE" },
];

const EPI_INIT: AuditQuestion[] = [
    { idQuestion: 21, valeur: null, observation: "", label: "Chaussures", section: "EPI" },
    { idQuestion: 22, valeur: null, observation: "", label: "Vêtement", section: "EPI" },
    { idQuestion: 23, valeur: null, observation: "", label: "Gants", section: "EPI" },
    { idQuestion: 24, valeur: null, observation: "", label: "Lunettes", section: "EPI" },
    { idQuestion: 25, valeur: null, observation: "", label: "Casque (date de validité)", section: "EPI" },
    { idQuestion: 26, valeur: null, observation: "", label: "Protections auditives", section: "EPI" },
];

const SANTE_INIT: AuditQuestion[] = [
    { idQuestion: 27, valeur: null, observation: "", label: "Aptitude médicale (date de validité)", section: "SANTE" },
    {
        idQuestion: 28,
        valeur: null,
        observation: "",
        label: "Quelle est la politique alcool et drogue ?",
        section: "SANTE",
    },
];

const CULTURE_SEC_INIT: AuditQuestion[] = [
    {
        idQuestion: 29,
        valeur: null,
        observation: "",
        label: "Qu'est ce qu'un lancement de travail ? (Contrôler que les documents correspondent au travail à effectuer)",
        section: "CULTURE_SECURITE",
    },
];

const ENV_INIT: AuditQuestion[] = [
    {
        idQuestion: 30,
        valeur: null,
        observation: "",
        label: "Quelles mesures sont mises en place pour réduire notre empreinte carbone (électricité, eau, papier) ?",
        section: "ENVIRONNEMENT",
    },
    {
        idQuestion: 31,
        valeur: null,
        observation: "",
        label: "Tri des déchets (piles-toners-ordures ménagères-chantier)",
        section: "ENVIRONNEMENT",
    },
    {
        idQuestion: 32,
        valeur: null,
        observation: "",
        label: "Quelle mesure doit-on appliquer pour l'écoconduite ?",
        section: "ENVIRONNEMENT",
    },
];

const AuditForm: React.FC<AuditFormProps> = ({
    auditData,
    questions,
    actions: initialActions,
    readOnly,
    showSubmitButton = true,
    showEmailButton = false,
    showDeleteButton = false,
}) => {
    const [idAudit, setIdAudit] = useState<number>(auditData.idAudit);
    const [status] = useState<number>(2);
    const [userEmail, setUserEmail] = useState("");
    const [idUser, setIdUser] = useState<number>();
    const [auditDate, setAuditDate] = useState(new Date().toISOString().split("T")[0]);
    const [site, setSite] = useState("");
    const [auditeur, setAuditeur] = useState("");
    const [natureAudit, setNatureAudit] = useState("");
    const [audites, setAudites] = useState("");

    const [observationGenerale, setObservationGenerale] = useState("");
    const signatureRef = useRef<SignatureCanvasHandle>(null);

    const [emailSent, setEmailSent] = useState(false);
    const [auditValidated, setAuditValidated] = useState(false);
    const [auditDeleted, setAuditDeleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const [fieldsSse, setFieldsSse] = useState<AuditQuestion[]>(SSE_INIT);
    const [fieldsEpi, setFieldsEpi] = useState<AuditQuestion[]>(EPI_INIT);
    const [fieldsSante, setFieldsSante] = useState<AuditQuestion[]>(SANTE_INIT);
    const [fieldsCultureSec, setFieldsCultureSec] = useState<AuditQuestion[]>(CULTURE_SEC_INIT);
    const [fieldsEnv, setFieldsEnv] = useState<AuditQuestion[]>(ENV_INIT);
    const [actions, setActions] = useState<ActionCorrective[]>(initialActions || []);

    const sectionSetters: Record<string, React.Dispatch<React.SetStateAction<AuditQuestion[]>>> = {
        sse: setFieldsSse,
        epi: setFieldsEpi,
        sante: setFieldsSante,
        culture_sec: setFieldsCultureSec,
        env: setFieldsEnv,
    };

    const handleQuestionChange = useCallback((sectionKey: string, idx: number, key: string, value: any) => {
        const setter = sectionSetters[sectionKey];
        if (!setter) return;
        setter((prev) => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [key]: value };
            return updated;
        });
    }, []);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const hydrate = (init: AuditQuestion[]) =>
                init.map((q) => {
                    const found = questions.find((f) => f.idQuestion === q.idQuestion);
                    return found ? { ...q, valeur: found.valeur, observation: found.observation || "" } : q;
                });
            setFieldsSse(hydrate(SSE_INIT));
            setFieldsEpi(hydrate(EPI_INIT));
            setFieldsSante(hydrate(SANTE_INIT));
            setFieldsCultureSec(hydrate(CULTURE_SEC_INIT));
            setFieldsEnv(hydrate(ENV_INIT));
        }
        if (auditData) {
            setIdAudit(auditData.idAudit);
            setAuditDate(auditData.auditDate || new Date().toISOString().split("T")[0]);
            setSite(auditData.site || "");
            if (auditData.auditeur) setAuditeur(auditData.auditeur);
            setNatureAudit(auditData.natureAudit || "");
            setAudites(auditData.audites || "");
            setObservationGenerale(auditData.observationGenerale || "");
        }
        if (initialActions) {
            setActions(initialActions);
        }
    }, [auditData, questions, initialActions]);

    const navigate = useNavigate();

    useEffect(() => {
        const email = decodeURIComponent(getCookie("email"));
        setUserEmail(email);
        const userId = decodeURIComponent(getCookie("userId"));
        setIdUser(Number(userId));
        // Pré-remplir l'auditeur avec le nom de la personne connectée
        if (!auditData.auditeur) {
            const firstname = decodeURIComponent(getCookie("firstname"));
            const lastname = decodeURIComponent(getCookie("lastname"));
            if (firstname || lastname) {
                setAuditeur(`${firstname} ${lastname}`.trim());
            }
        }
    }, []);

    useEffect(() => {
        if (emailSent) {
            const timer = setTimeout(() => setEmailSent(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [emailSent]);

    useEffect(() => {
        if (auditValidated) {
            const timer = setTimeout(() => setAuditValidated(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [auditValidated]);

    useEffect(() => {
        if (auditDeleted) {
            const timer = setTimeout(() => {
                setAuditDeleted(false);
                navigate("/dashboard");
                window.scrollTo(0, 0);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [auditDeleted, navigate]);

    const addAction = () => {
        setActions((prev) => [...prev, { nature: "", delai: "", responsable: "" }]);
    };

    const removeAction = (idx: number) => {
        setActions((prev) => prev.filter((_, i) => i !== idx));
    };

    const updateAction = (idx: number, key: keyof ActionCorrective, value: string) => {
        setActions((prev) => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [key]: value };
            return updated;
        });
    };

    const getAllQuestions = () => [...fieldsSse, ...fieldsEpi, ...fieldsSante, ...fieldsCultureSec, ...fieldsEnv];

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const signatureData =
            signatureRef.current && !signatureRef.current.isEmpty() ? signatureRef.current.toDataURL() : null;
        const signatureTimestamp = signatureRef.current?.getTimestamp() ?? null;

        const payload = {
            status,
            idUser,
            auditDate,
            site,
            auditeur,
            natureAudit,
            audites,
            observationGenerale: observationGenerale || null,
            signature: signatureData,
            signatureTimestamp,
            questions: getAllQuestions(),
            actions,
        };

        try {
            await createAudit(payload);
            setAuditValidated(true);
            setTimeout(() => {
                navigate("/dashboard");
                window.scrollTo(0, 0);
                setIsSubmitting(false);
            }, 3000);
        } catch (error) {
            console.error("Erreur lors de la création de l'audit :", error);
            setIsSubmitting(false);
        }
    }

    const handleSendEmail = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsSendingEmail(true);

        try {
            const signatureData =
                signatureRef.current && !signatureRef.current.isEmpty()
                    ? signatureRef.current.toDataURL()
                    : auditData.signature || null;

            const pdfData = {
                idAudit,
                auditeur,
                natureAudit,
                site,
                auditDate,
                audites,
                observationGenerale: observationGenerale || null,
                signature: signatureData,
                signatureTimestamp: signatureRef.current?.getTimestamp() ?? auditData.signatureTimestamp ?? null,
                questions: getAllQuestions(),
                actions,
            };

            const data = await generatePDF(pdfData);
            const attachmentBase64 = data.pdfBase64;

            const emailData = {
                to: userEmail,
                subject: `Audit sécurité -  ${site}`,
                body: `Veuillez trouver ci-joint l'audit sécurité pour le site ${site}.`,
                attachmentBase64,
                filename: `Audit-sécurité-folio-${site}.pdf`,
            };

            const result = await sendPDF(emailData);

            if (result.success) {
                setEmailSent(true);
            } else {
                throw new Error(result.message || "Erreur lors de l'envoi de l'email");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
            alert("Une erreur est survenue lors de l'envoi de l'email");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAudit(idAudit);
            setAuditDeleted(true);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <form className="auditqsForm" onSubmit={handleSubmit}>
            <div className="formHeader">
                <div>
                    <label>Nom auditeur :</label>
                    <input
                        type="text"
                        value={auditeur}
                        onChange={(e) => setAuditeur(e.target.value)}
                        required
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label>Nature audit :</label>
                    <input
                        type="text"
                        value={natureAudit}
                        onChange={(e) => setNatureAudit(e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label>Site :</label>
                    <input
                        type="text"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        required
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label>Date :</label>
                    <input
                        type="date"
                        value={toInputDateValue(auditDate)}
                        onChange={(e) => setAuditDate(e.target.value)}
                        required
                        readOnly={readOnly}
                        style={{ WebkitAppearance: "none" }}
                    />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                    <label>Audités :</label>
                    <input
                        type="text"
                        value={audites}
                        onChange={(e) => setAudites(e.target.value)}
                        readOnly={readOnly}
                    />
                </div>
                <div className="formButtons">
                    {readOnly && formatStatusTag(status)}
                    {showDeleteButton && (
                        <button type="button" className="deleteButton" onClick={handleDelete}>
                            Supprimer
                        </button>
                    )}
                    {auditDeleted && (
                        <div className="auditDeletedMessage">
                            <i className="far fa-trash-can"></i> Audit supprimé
                        </div>
                    )}
                </div>
            </div>

            <QuestionSection
                title="SSE — Sécurité Santé Environnement"
                sectionKey="sse"
                questions={fieldsSse}
                onQuestionChange={handleQuestionChange}
                readOnly={readOnly}
                startIndex={1}
            />
            <QuestionSection
                title="EPI — Équipement de Protection Individuelle"
                sectionKey="epi"
                questions={fieldsEpi}
                onQuestionChange={handleQuestionChange}
                readOnly={readOnly}
                startIndex={21}
            />
            <QuestionSection
                title="Santé"
                sectionKey="sante"
                questions={fieldsSante}
                onQuestionChange={handleQuestionChange}
                readOnly={readOnly}
                startIndex={27}
            />
            <QuestionSection
                title="Culture Sécurité"
                sectionKey="culture_sec"
                questions={fieldsCultureSec}
                onQuestionChange={handleQuestionChange}
                readOnly={readOnly}
                startIndex={29}
            />
            <QuestionSection
                title="Environnement"
                sectionKey="env"
                questions={fieldsEnv}
                onQuestionChange={handleQuestionChange}
                readOnly={readOnly}
                startIndex={30}
            />

            <div className="observationGenerale">
                <h3 className="fieldTitle">Observation générale</h3>
                <textarea
                    placeholder="Observation générale (optionnel)"
                    value={observationGenerale}
                    onChange={(e) => setObservationGenerale(e.target.value)}
                    readOnly={readOnly}
                />
            </div>

            <div className="signatureSection">
                <h3 className="fieldTitle">Signature de l'audité</h3>
                <p className="signatureLabel">Signez dans le cadre ci-dessous</p>
                <SignatureCanvas
                    ref={signatureRef}
                    readOnly={readOnly}
                    initialDataURL={auditData.signature || undefined}
                />
                {!readOnly && (
                    <button type="button" className="clearSignatureBtn" onClick={() => signatureRef.current?.clear()}>
                        Effacer
                    </button>
                )}
            </div>

            <div className="actionsCorrectives">
                <h3 className="fieldTitle">Actions correctives</h3>
                {(actions.length > 0 || !readOnly) && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nature</th>
                                <th>Délai</th>
                                <th>Responsable</th>
                                {!readOnly && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {actions.map((a, i) => (
                                <tr key={i}>
                                    <td>
                                        <input
                                            type="text"
                                            value={a.nature}
                                            onChange={(e) => updateAction(i, "nature", e.target.value)}
                                            readOnly={readOnly}
                                            placeholder="Description de l'action"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={a.delai}
                                            onChange={(e) => updateAction(i, "delai", e.target.value)}
                                            readOnly={readOnly}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={a.responsable}
                                            onChange={(e) => updateAction(i, "responsable", e.target.value)}
                                            readOnly={readOnly}
                                            placeholder="Responsable"
                                        />
                                    </td>
                                    {!readOnly && (
                                        <td>
                                            <button
                                                type="button"
                                                className="removeActionBtn"
                                                onClick={() => removeAction(i)}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!readOnly && (
                    <button type="button" className="addActionBtn" onClick={addAction}>
                        + Ajouter une ligne
                    </button>
                )}
            </div>

            {showSubmitButton && (
                <div className="submitContainer">
                    <button type="submit" className="buttonLogin" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <div className="custom-spinner"></div>
                                Chargement...
                            </>
                        ) : (
                            <>Valider l'audit</>
                        )}
                    </button>
                    {auditValidated && (
                        <div className="auditValidatedMessage">
                            <i className="fa-solid fa-check"></i> Audit validé
                        </div>
                    )}
                </div>
            )}

            {showEmailButton && (
                <div className="sendEmailContainer">
                    <button type="button" className="buttonLogin" onClick={handleSendEmail} disabled={isSendingEmail}>
                        {isSendingEmail ? (
                            <>
                                <div className="custom-spinner"></div>
                                Envoi en cours...
                            </>
                        ) : (
                            <>Envoyer par mail</>
                        )}
                    </button>
                    {emailSent && (
                        <div className="emailSentMessage">
                            <i className="fa-solid fa-check"></i> Email envoyé
                        </div>
                    )}
                </div>
            )}
        </form>
    );
};

export default AuditForm;
