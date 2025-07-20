import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FicheqsForm.css";

const FicheqsForm: React.FC = () => {
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [visiteDate, setVisiteDate] = useState("");
    const [logement, setLogement] = useState("");

    // Groupe DAAF
    const [fieldsDaaf, setFieldsDaaf] = useState<any>([
        { idField: 1, valeur: null, description: "", label: "Présence" },
        {
            idField: 2,
            valeur: null,
            description: "",
            label: "État et propreté",
        },
        { idField: 3, valeur: null, description: "", label: "Fonctionnement" },
    ]);

    // Groupe Installations de gaz
    const [fieldsGaz, setFieldsGaz] = useState<any>([
        { idField: 4, valeur: null, description: "", label: "ROAI bouchonné" },
        {
            idField: 5,
            valeur: null,
            description: "",
            label: "Chaudière vérifiée",
        },
        {
            idField: 6,
            valeur: null,
            description: "",
            label: "Canalisations correctement fixées",
        },
    ]);

    // Groupe Installations électriques
    const [fieldsElectrique, setFieldsElectrique] = useState<any>([
        {
            idField: 7,
            valeur: null,
            description: "",
            label: "Cables électriques sous goulottes",
        },
        {
            idField: 8,
            valeur: null,
            description: "",
            label: "Prises et interrupteurs correctement fixés",
        },
        {
            idField: 9,
            valeur: null,
            description: "",
            label: "Convecteur en bon état et correctement fixés",
        },
        {
            idField: 10,
            valeur: null,
            description: "",
            label: "Tableau électrique sans pièce nue sous tension",
        },
    ]);

    // Groupe Risque de chute
    const [fieldsRisqueChute, setFieldsRisqueChute] = useState<any>([
        {
            idField: 11,
            valeur: null,
            description: "",
            label: "Sols sans trou ni différence de dénivellation anormale",
        },
        {
            idField: 12,
            valeur: null,
            description: "",
            label: "Marches et mains courantes de l’escalier correctement fixées",
        },
        {
            idField: 13,
            valeur: null,
            description: "",
            label: "Gardes corps correctement dimensionnés, fixés et en bon état",
        },
    ]);

    // Groupe Balcon
    const [fieldsBalcon, setFieldsBalcon] = useState<any>([
        {
            idField: 14,
            valeur: null,
            description: "",
            label: "Absence de fissure",
        },
        {
            idField: 15,
            valeur: null,
            description: "",
            label: "Absence d’infiltration",
        },
    ]);

    // Groupe Évier, lavabos, baignoires, bacs à douche
    const [fieldsEvierLavabos, setFieldsEvierLavabos] = useState<any>([
        {
            idField: 16,
            valeur: null,
            description: "",
            label: "Absence d’équipement cassé ou fuyard",
        },
        {
            idField: 17,
            valeur: null,
            description: "",
            label: "État des joints",
        },
    ]);

    // Groupe Faience murales
    const [fieldsFaience, setFieldsFaience] = useState<any>([
        {
            idField: 18,
            valeur: null,
            description: "",
            label: "Absence d’équipement cassé ou fuyard",
        },
        {
            idField: 19,
            valeur: null,
            description: "",
            label: "État des joints",
        },
    ]);

    // Groupe Meubles et placards
    const [fieldsMeuble, setFieldsMeuble] = useState<any>([
        {
            idField: 20,
            valeur: null,
            description: "",
            label: "Ouverture / fermeture",
        },
        {
            idField: 21,
            valeur: null,
            description: "",
            label: "Ventilation gaz dégagée",
        },
        {
            idField: 22,
            valeur: null,
            description: "",
            label: "Ventilation sanitaire dégagée",
        },
        {
            idField: 23,
            valeur: null,
            description: "",
            label: "Fixations",
        },
    ]);

    // Groupe Canaliations d'eau
    const [fieldsCanalisation, setFieldsCanalisation] = useState<any>([
        {
            idField: 24,
            valeur: null,
            description: "",
            label: "Absence d’équipement cassé ou fuyard",
        },
        {
            idField: 25,
            valeur: null,
            description: "",
            label: "État des joints",
        },
    ]);

    // Groupe Menuiseries
    const [fieldsMenuiserie, setFieldsMenuiserie] = useState<any>([
        {
            idField: 26,
            valeur: null,
            description: "",
            label: "Ouverture / fermeture",
        },
        {
            idField: 27,
            valeur: null,
            description: "",
            label: "Menuiseries extérieures étanches à l’eau",
        },
        {
            idField: 28,
            valeur: null,
            description: "",
            label: "Détalonnage des portes",
        },
        {
            idField: 29,
            valeur: null,
            description: "",
            label: "Quincailleries en bon état",
        },
    ]);

    // Groupe Ventilation sanitaire
    const [fieldsVentilation, setFieldsVentilation] = useState<any>([
        {
            idField: 30,
            valeur: null,
            description: "",
            label: "Bon fonctionnement",
        },
    ]);

    // Groupe Embelissements
    const [fieldsEmbelissement, setFieldsEmbelissement] = useState<any>([
        {
            idField: 31,
            valeur: null,
            description: "",
            label: "Propres et sans  trous",
        },
        {
            idField: 32,
            valeur: null,
            description: "",
            label: "Plinthes correctement fixées",
        },
        {
            idField: 33,
            valeur: null,
            description: "",
            label: "Présence d’une barre de seuil si nécéssaire",
        },
    ]);

    // Groupe Espaces extérieurs
    const [fieldsEspaceExt, setFieldsEspaceExt] = useState<any>([
        {
            idField: 34,
            valeur: null,
            description: "",
            label: "Haies, arbres et pelouses taillées et tondues",
        },
    ]);

    // Groupe Équipements extérieurs
    const [fieldsEquipementExt, setFieldsEquipementExt] = useState<any>([
        {
            idField: 35,
            valeur: null,
            description: "",
            label: "Fixation des gouttières et descentes d’EP",
        },
        {
            idField: 36,
            valeur: null,
            description: "",
            label: "Continuité des clotûres",
        },
        {
            idField: 37,
            valeur: null,
            description: "",
            label: "Ouverture / fermeture des portillons",
        },
    ]);

    // Groupe Équipements divers
    const [fieldsEquipementDiv, setFieldsEquipementDiv] = useState<any>([
        {
            idField: 38,
            valeur: null,
            description: "",
            label: "Hotte propre, à recyclage interne et correctement raccordée",
        },
        {
            idField: 39,
            valeur: null,
            description: "",
            label: "Fixation et fonctionnement de la sonette, de l’interphone ou du visiophone",
        },
        {
            idField: 40,
            valeur: null,
            description: "",
            label: "WC correctement fixé, non fuyard et inodore",
        },
        {
            idField: 41,
            valeur: null,
            description: "",
            label: "Ouverture / fermeture de la porte de douche",
        },
        {
            idField: 42,
            valeur: null,
            description: "",
            label: "Absence de brises vues (canisses)",
        },
        {
            idField: 43,
            valeur: null,
            description: "",
            label: "Stores bannes propres, en bon état et correctement fixés",
        },
    ]);

    // Groupe Propreté
    const [fieldsProprete, setFieldsProprete] = useState<any>([
        {
            idField: 44,
            valeur: null,
            description: "",
            label: "Toilettes (cuvette WC, réservoir de chasse d’eau)",
        },
        {
            idField: 45,
            valeur: null,
            description: "",
            label: "Salle de bain (lavabo, douche, baignoire)",
        },
        {
            idField: 46,
            valeur: null,
            description: "",
            label: "Cuisine (évier, meuble évier, plant de travail)",
        },
        {
            idField: 47,
            valeur: null,
            description: "",
            label: "Grilles de ventillation",
        },
        {
            idField: 48,
            valeur: null,
            description: "",
            label: "Calandre d’appareil de production d’eau chaude",
        },
        {
            idField: 49,
            valeur: null,
            description: "",
            label: "Tuyauteries",
        },
        {
            idField: 50,
            valeur: null,
            description: "",
            label: "Menuiseries PVC",
        },
        {
            idField: 51,
            valeur: null,
            description: "",
            label: "Vitrage",
        },
        {
            idField: 52,
            valeur: null,
            description: "",
            label: "Chambranles de portes",
        },
        {
            idField: 53,
            valeur: null,
            description: "",
            label: "Interrupteurs",
        },
        {
            idField: 54,
            valeur: null,
            description: "",
            label: "Sols",
        },
        {
            idField: 55,
            valeur: null,
            description: "",
            label: "Joints sillicones",
        },
    ]);

    const navigate = useNavigate();

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()!.split(";").shift()!;
        return "";
    }

    useEffect(() => {
        const email = decodeURIComponent(getCookie("email"));
        setEmail(email);
    });

    const handleDaafFieldChange = (idx: number, key: string, value: any) => {
        setFieldsDaaf((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleGazFieldChange = (idx: number, key: string, value: any) => {
        setFieldsGaz((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleElectriqueFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsElectrique((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleRisqueChuteFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsRisqueChute((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleBalconFieldChange = (idx: number, key: string, value: any) => {
        setFieldsBalcon((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleEvierLavabosFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsEvierLavabos((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleFaienceFieldChange = (idx: number, key: string, value: any) => {
        setFieldsFaience((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleMeubleFieldChange = (idx: number, key: string, value: any) => {
        setFieldsMeuble((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleCanalisationFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsCanalisation((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleMenuiserieFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsMenuiserie((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleVentilationFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsVentilation((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleEmbelissementFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsEmbelissement((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleEspaceExtFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsEspaceExt((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleEquipementExtFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsEquipementExt((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handleEquipementDivFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsEquipementDiv((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    const handlePropreteFieldChange = (
        idx: number,
        key: string,
        value: any
    ) => {
        setFieldsProprete((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    };

    return (
        <form className="ficheqsForm">
            <div className="formHeader">
                <div>
                    <label>Date de visite :</label>
                    <input
                        type="date"
                        value={visiteDate}
                        onChange={(e) => setVisiteDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Logement :</label>
                    <input
                        type="text"
                        value={logement}
                        onChange={(e) => setLogement(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Par :</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly
                    />
                </div>
            </div>

            <hr />

            <div>
                <h3 className="fieldTitle">DAAF</h3>
                {fieldsDaaf.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleDaafFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleDaafFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleDaafFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Installations de gaz</h3>
                {fieldsGaz.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleGazFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleGazFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleGazFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Installations électriques</h3>
                {fieldsElectrique.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleElectriqueFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleElectriqueFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleElectriqueFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Risque de chute</h3>
                {fieldsRisqueChute.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleRisqueChuteFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleRisqueChuteFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleRisqueChuteFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Balcon</h3>
                {fieldsBalcon.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleBalconFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleBalconFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleBalconFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">
                    Éviers, lavabos, baignoires, bacs à douche
                </h3>
                {fieldsEvierLavabos.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEvierLavabosFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEvierLavabosFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleRisqueChuteFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Faience murales</h3>
                {fieldsFaience.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleFaienceFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleFaienceFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleFaienceFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Meubles et placards</h3>
                {fieldsMeuble.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleMeubleFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleMeubleFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleMeubleFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Canalisations d’eau</h3>
                {fieldsCanalisation.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleCanalisationFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleCanalisationFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleCanalisationFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Menuiseries</h3>
                {fieldsMenuiserie.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleMenuiserieFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleMenuiserieFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleMenuiserieFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Ventilation sanitaire</h3>
                {fieldsVentilation.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleVentilationFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleVentilationFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleVentilationFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Embelissements</h3>
                {fieldsEmbelissement.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEmbelissementFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEmbelissementFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleEmbelissementFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Espaces extérieurs</h3>
                {fieldsEspaceExt.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEspaceExtFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEspaceExtFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleEspaceExtFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Équipements extérieurs</h3>
                {fieldsEquipementExt.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEquipementExtFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEquipementExtFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleEquipementExtFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Équipements divers</h3>
                {fieldsEquipementDiv.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEquipementDivFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handleEquipementDivFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handleEquipementDivFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h3 className="fieldTitle">Propreté</h3>
                {fieldsProprete.map((field: any, idx: number) => (
                    <div key={field.idField} className="field">
                        <span className="fieldSubtitle">{field.label} :</span>
                        <div className="fieldButtons">
                            <button
                                type="button"
                                className={
                                    field.valeur === true
                                        ? "switch active"
                                        : "switch"
                                }
                                onClick={() =>
                                    handlePropreteFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === true ? null : true
                                    )
                                }
                            >
                                <i className="fas fa-check"></i>
                                Ok
                            </button>
                            <button
                                type="button"
                                className={
                                    field.valeur === false
                                        ? "switch descActive"
                                        : "switch"
                                }
                                onClick={() =>
                                    handlePropreteFieldChange(
                                        idx,
                                        "valeur",
                                        field.valeur === false ? null : false
                                    )
                                }
                            >
                                <i className="far fa-calendar"></i>
                                Pas opérationel
                            </button>
                        </div>
                        {field.valeur === false && (
                            <textarea
                                className="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) =>
                                    handlePropreteFieldChange(
                                        idx,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </div>
                ))}
            </div>

            <hr />

            <button type="submit" className="buttonLogin">
                <i className="fas fa-file-circle-check"></i>
                Valider
            </button>
        </form>
    );
};

export default FicheqsForm;
