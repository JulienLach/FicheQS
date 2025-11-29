import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toInputDateValue } from "../../utils/date";
import { getCookie } from "../../utils/cookie";
import { formatStatusTag } from "../../utils/status";
import FieldSection from "./FieldSection";
import { createFicheqs, deleteFicheqs } from "../../services/api";
import { sendPDF } from "../../services/api";
import "./FicheqsForm.css";

interface FicheField {
    idField: number;
    valeur: boolean | null;
    description: string;
    label: string;
}

type FicheqsFormProps = {
    ficheData: {
        idFiche: number;
        status: number;
        email: string;
        visiteDate: string;
        logement: string;
    };
    fields: FicheField[];
    readOnly: boolean;
    showSubmitButton: boolean;
    showEmailButton: boolean;
    showDeleteButton: boolean;
};

const FicheqsForm: React.FC<FicheqsFormProps> = ({
    ficheData,
    fields,
    readOnly,
    showSubmitButton = true,
    showEmailButton = false,
    showDeleteButton = false,
}) => {
    const [idFiche, setIdFiche] = useState<number>(ficheData.idFiche);
    const [status, setStatus] = useState<number>(1);
    const [email, setEmail] = useState("");
    const [idUser, setIdUser] = useState<number>();
    const [visiteDate, setVisiteDate] = useState(new Date().toISOString().split("T")[0]);
    const [logement, setLogement] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [ficheValidated, setFicheValidated] = useState(false);
    const [ficheDeleted, setFicheDeleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (fields) {
            setFieldsDaaf([
                {
                    idField: 1,
                    label: "Présence",
                    ...fields.find((f) => f.idField === 1),
                },
                {
                    idField: 2,
                    label: "État et propreté",
                    ...fields.find((f) => f.idField === 2),
                },
                {
                    idField: 3,
                    label: "Fonctionnement",
                    ...fields.find((f) => f.idField === 3),
                },
            ]);
            setFieldsGaz([
                {
                    idField: 4,
                    label: "ROAI bouchonné",
                    ...fields.find((f) => f.idField === 4),
                },
                {
                    idField: 5,
                    label: "Chaudière vérifiée",
                    ...fields.find((f) => f.idField === 5),
                },
                {
                    idField: 6,
                    label: "Canalisations correctement fixées",
                    ...fields.find((f) => f.idField === 6),
                },
            ]);
            setFieldsElectrique([
                {
                    idField: 7,
                    label: "Cables électriques sous goulottes",
                    ...fields.find((f) => f.idField === 7),
                },
                {
                    idField: 8,
                    label: "Prises et interrupteurs correctement fixés",
                    ...fields.find((f) => f.idField === 8),
                },
                {
                    idField: 9,
                    label: "Convecteur en bon état et correctement fixés",
                    ...fields.find((f) => f.idField === 9),
                },
                {
                    idField: 10,
                    label: "Tableau électrique sans pièce nue sous tension",
                    ...fields.find((f) => f.idField === 10),
                },
            ]);
            setFieldsRisqueChute([
                {
                    idField: 11,
                    label: "Sols sans trou ni différence de dénivellation anormale",
                    ...fields.find((f) => f.idField === 11),
                },
                {
                    idField: 12,
                    label: "Marches et mains courantes de l’escalier correctement fixées",
                    ...fields.find((f) => f.idField === 12),
                },
                {
                    idField: 13,
                    label: "Gardes corps correctement dimensionnés, fixés et en bon état",
                    ...fields.find((f) => f.idField === 13),
                },
            ]);
            setFieldsBalcon([
                {
                    idField: 14,
                    label: "Absence de fissure",
                    ...fields.find((f) => f.idField === 14),
                },
                {
                    idField: 15,
                    label: "Absence d’infiltration",
                    ...fields.find((f) => f.idField === 15),
                },
            ]);
            setFieldsEvierLavabos([
                {
                    idField: 16,
                    label: "Absence d’équipement cassé ou fuyard",
                    ...fields.find((f) => f.idField === 16),
                },
                {
                    idField: 17,
                    label: "État des joints",
                    ...fields.find((f) => f.idField === 17),
                },
            ]);
            setFieldsFaience([
                {
                    idField: 18,
                    label: "Absence d’équipement cassé ou fuyard",
                    ...fields.find((f) => f.idField === 18),
                },
                {
                    idField: 19,
                    label: "État des joints",
                    ...fields.find((f) => f.idField === 19),
                },
            ]);
            setFieldsMeuble([
                {
                    idField: 20,
                    label: "Ouverture / fermeture",
                    ...fields.find((f) => f.idField === 20),
                },
                {
                    idField: 21,
                    label: "Ventilation gaz dégagée",
                    ...fields.find((f) => f.idField === 21),
                },
                {
                    idField: 22,
                    label: "Ventilation sanitaire dégagée",
                    ...fields.find((f) => f.idField === 22),
                },
                {
                    idField: 23,
                    label: "Fixations",
                    ...fields.find((f) => f.idField === 23),
                },
            ]);
            setFieldsCanalisation([
                {
                    idField: 24,
                    label: "Absence d’équipement cassé ou fuyard",
                    ...fields.find((f) => f.idField === 24),
                },
                {
                    idField: 25,
                    label: "État des joints",
                    ...fields.find((f) => f.idField === 25),
                },
            ]);
            setFieldsMenuiserie([
                {
                    idField: 26,
                    label: "Ouverture / fermeture",
                    ...fields.find((f) => f.idField === 26),
                },
                {
                    idField: 27,
                    label: "Menuiseries extérieures étanches à l’eau",
                    ...fields.find((f) => f.idField === 27),
                },
                {
                    idField: 28,
                    label: "Détalonnage des portes",
                    ...fields.find((f) => f.idField === 28),
                },
                {
                    idField: 29,
                    label: "Quincailleries en bon état",
                    ...fields.find((f) => f.idField === 29),
                },
            ]);
            setFieldsVentilation([
                {
                    idField: 30,
                    label: "Bon fonctionnement",
                    ...fields.find((f) => f.idField === 30),
                },
            ]);
            setFieldsEmbelissement([
                {
                    idField: 31,
                    label: "Propres et sans trous",
                    ...fields.find((f) => f.idField === 31),
                },
                {
                    idField: 32,
                    label: "Plinthes correctement fixées",
                    ...fields.find((f) => f.idField === 32),
                },
                {
                    idField: 33,
                    label: "Présence d’une barre de seuil si nécessaire",
                    ...fields.find((f) => f.idField === 33),
                },
            ]);
            setFieldsEspaceExt([
                {
                    idField: 34,
                    label: "Haies, arbres et pelouses taillées et tondues",
                    ...fields.find((f) => f.idField === 34),
                },
            ]);
            setFieldsEquipementExt([
                {
                    idField: 35,
                    label: "Fixation des gouttières et descentes d’EP",
                    ...fields.find((f) => f.idField === 35),
                },
                {
                    idField: 36,
                    label: "Continuité des clôtures",
                    ...fields.find((f) => f.idField === 36),
                },
                {
                    idField: 37,
                    label: "Ouverture / fermeture des portillons",
                    ...fields.find((f) => f.idField === 37),
                },
            ]);
            setFieldsEquipementDiv([
                {
                    idField: 38,
                    label: "Hotte propre, à recyclage interne et correctement raccordée",
                    ...fields.find((f) => f.idField === 38),
                },
                {
                    idField: 39,
                    label: "Fixation et fonctionnement de la sonette, de l’interphone ou du visiophone",
                    ...fields.find((f) => f.idField === 39),
                },
                {
                    idField: 40,
                    label: "WC correctement fixé, non fuyard et inodore",
                    ...fields.find((f) => f.idField === 40),
                },
                {
                    idField: 41,
                    label: "Ouverture / fermeture de la porte de douche",
                    ...fields.find((f) => f.idField === 41),
                },
                {
                    idField: 42,
                    label: "Absence de brises vues (canisses)",
                    ...fields.find((f) => f.idField === 42),
                },
                {
                    idField: 43,
                    label: "Stores bannes propres, en bon état et correctement fixés",
                    ...fields.find((f) => f.idField === 43),
                },
            ]);
            setFieldsProprete([
                {
                    idField: 44,
                    label: "Toilettes (cuvette WC, réservoir de chasse d’eau)",
                    ...fields.find((f) => f.idField === 44),
                },
                {
                    idField: 45,
                    label: "Salle de bain (lavabo, douche, baignoire)",
                    ...fields.find((f) => f.idField === 45),
                },
                {
                    idField: 46,
                    label: "Cuisine (évier, meuble évier, plan de travail)",
                    ...fields.find((f) => f.idField === 46),
                },
                {
                    idField: 47,
                    label: "Grilles de ventilation",
                    ...fields.find((f) => f.idField === 47),
                },
                {
                    idField: 48,
                    label: "Calandre d’appareil de production d’eau chaude",
                    ...fields.find((f) => f.idField === 48),
                },
                {
                    idField: 49,
                    label: "Tuyauteries",
                    ...fields.find((f) => f.idField === 49),
                },
                {
                    idField: 50,
                    label: "Menuiseries PVC",
                    ...fields.find((f) => f.idField === 50),
                },
                {
                    idField: 51,
                    label: "Vitrage",
                    ...fields.find((f) => f.idField === 51),
                },
                {
                    idField: 52,
                    label: "Chambranles de portes",
                    ...fields.find((f) => f.idField === 52),
                },
                {
                    idField: 53,
                    label: "Interrupteurs",
                    ...fields.find((f) => f.idField === 53),
                },
                {
                    idField: 54,
                    label: "Sols",
                    ...fields.find((f) => f.idField === 54),
                },
                {
                    idField: 55,
                    label: "Joints sillicones",
                    ...fields.find((f) => f.idField === 55),
                },
            ]);
        }
        if (ficheData) {
            setIdFiche(ficheData.idFiche);
            setStatus(2);
            setVisiteDate(ficheData.visiteDate || new Date().toISOString().split("T")[0]);
            setLogement(ficheData.logement || "");
        }
    }, [ficheData, fields]);

    const navigate = useNavigate();

    useEffect(() => {
        if (emailSent) {
            const timer = setTimeout(() => setEmailSent(false), 3000); // 3 secondes
            return () => clearTimeout(timer);
        }
    }, [emailSent]);

    useEffect(() => {
        if (ficheValidated) {
            const timer = setTimeout(() => setFicheValidated(false), 3000); // 3 secondes
            return () => clearTimeout(timer);
        }
    }, [ficheValidated]);

    useEffect(() => {
        if (ficheDeleted) {
            const timer = setTimeout(() => {
                setFicheDeleted(false);
                navigate("/dashboard");
                window.scrollTo(0, 0);
            }, 1500); // Redirige après 1,5 secondes
            return () => clearTimeout(timer);
        }
    }, [ficheDeleted, navigate]);

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

    // Groupe Faiences murales
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

    useEffect(() => {
        const email = decodeURIComponent(getCookie("email"));
        setEmail(email);
        const idUser = decodeURIComponent(getCookie("userId"));
        setIdUser(Number(idUser));
    }, []);

    const handleDaafFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsDaaf((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleGazFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsGaz((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleElectriqueFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsElectrique((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleRisqueChuteFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsRisqueChute((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleBalconFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsBalcon((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleEvierLavabosFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsEvierLavabos((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleFaienceFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsFaience((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleMeubleFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsMeuble((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleCanalisationFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsCanalisation((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleMenuiserieFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsMenuiserie((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleVentilationFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsVentilation((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleEmbelissementFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsEmbelissement((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleEspaceExtFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsEspaceExt((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleEquipementExtFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsEquipementExt((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handleEquipementDivFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsEquipementDiv((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    const handlePropreteFieldChange = useCallback((idx: number, key: string, value: any) => {
        setFieldsProprete((fields: any) => {
            const updated = [...fields];
            updated[idx][key] = value;
            return updated;
        });
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const ficheData = {
            status,
            idUser,
            visiteDate,
            logement,
            fields: [
                ...fieldsDaaf,
                ...fieldsGaz,
                ...fieldsElectrique,
                ...fieldsRisqueChute,
                ...fieldsBalcon,
                ...fieldsEvierLavabos,
                ...fieldsFaience,
                ...fieldsMeuble,
                ...fieldsCanalisation,
                ...fieldsMenuiserie,
                ...fieldsVentilation,
                ...fieldsEmbelissement,
                ...fieldsEspaceExt,
                ...fieldsEquipementExt,
                ...fieldsEquipementDiv,
                ...fieldsProprete,
            ],
        };
        console.log("Données de la fiche :", ficheData);

        try {
            await createFicheqs(ficheData);
            setFicheValidated(true);
            setTimeout(() => {
                navigate("/dashboard");
                window.scrollTo(0, 0);
                setIsSubmitting(false);
            }, 3000);
        } catch (error) {
            console.error("Erreur lors de la création de la fiche :", error);
        }
    }

    const handleSendEmail = async (event: React.MouseEvent) => {
        event.preventDefault();

        try {
            // Tous les champs
            const allFields = [
                ...fieldsDaaf,
                ...fieldsGaz,
                ...fieldsElectrique,
                ...fieldsRisqueChute,
                ...fieldsBalcon,
                ...fieldsEvierLavabos,
                ...fieldsFaience,
                ...fieldsMeuble,
                ...fieldsCanalisation,
                ...fieldsMenuiserie,
                ...fieldsVentilation,
                ...fieldsEmbelissement,
                ...fieldsEspaceExt,
                ...fieldsEquipementExt,
                ...fieldsEquipementDiv,
                ...fieldsProprete,
            ];

            // Objet de données pour le PDF
            const pdfData = {
                idFiche,
                email,
                visiteDate,
                logement,
                fields: allFields,
            };

            // Génération du PDF côté serveur
            const response = await fetch("http://localhost:3001/pdf/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pdfData),
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la génération du PDF");
            }
            const data = await response.json();
            const attachmentBase64 = data.pdfBase64;

            // Création de l'objet pour l'API selon le format attendu dans email.routes.ts
            const emailData = {
                to: email, // Utiliser l'email du cookie
                subject: `FicheQS - ${logement}`,
                body: `Veuillez trouver ci-joint la fiche qualité sécurité pour le logement ${logement}.`,
                attachmentBase64: attachmentBase64, // Envoi direct du base64, pas d'un tableau
                filename: `FicheQS-${logement}.pdf`,
            };

            // Appel de la fonction de l'API qui gère l'envoi
            const result = await sendPDF(emailData);

            if (result.success) {
                console.log("Email envoyé avec succès !");
                setEmailSent(true);
            } else {
                throw new Error(result.message || "Erreur lors de l'envoi de l'email");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
            alert("Une erreur est survenue lors de l'envoi de l'email");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteFicheqs(idFiche);
            setFicheDeleted(true);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <form className="ficheqsForm" onSubmit={handleSubmit}>
            <div className="formHeader">
                <div>
                    <label>Date de visite :</label>
                    <input
                        type="date"
                        value={toInputDateValue(visiteDate)}
                        onChange={(e) => setVisiteDate(e.target.value)}
                        required
                        readOnly={readOnly}
                        style={{ WebkitAppearance: "none" }}
                    />
                </div>
                <div>
                    <label>Logement :</label>
                    <input
                        type="text"
                        value={logement}
                        onChange={(e) => setLogement(e.target.value)}
                        required
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label>Par :</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                    {ficheDeleted && (
                        <div className="ficheDeletedMessage">
                            <i className="far fa-trash-can"> </i> FicheQS supprimée
                        </div>
                    )}
                </div>
            </div>

            <hr />

            <div>
                <FieldSection
                    title="DAAF"
                    fields={fieldsDaaf}
                    onFieldChange={handleDaafFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Installations de gaz"
                    fields={fieldsGaz}
                    onFieldChange={handleGazFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Installations électriques"
                    fields={fieldsElectrique}
                    onFieldChange={handleElectriqueFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Risque de chute"
                    fields={fieldsRisqueChute}
                    onFieldChange={handleRisqueChuteFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Balcon"
                    fields={fieldsBalcon}
                    onFieldChange={handleBalconFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Éviers, lavabos, baignoires, bacs à douche"
                    fields={fieldsEvierLavabos}
                    onFieldChange={handleEvierLavabosFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Faiences murales"
                    fields={fieldsFaience}
                    onFieldChange={handleFaienceFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Meubles et placards"
                    fields={fieldsMeuble}
                    onFieldChange={handleMeubleFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Canaliations d'eau"
                    fields={fieldsCanalisation}
                    onFieldChange={handleCanalisationFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Menuiseries"
                    fields={fieldsMenuiserie}
                    onFieldChange={handleMenuiserieFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Ventilation sanitaire"
                    fields={fieldsVentilation}
                    onFieldChange={handleVentilationFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Embelissements"
                    fields={fieldsEmbelissement}
                    onFieldChange={handleEmbelissementFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Espaces extérieurs"
                    fields={fieldsEspaceExt}
                    onFieldChange={handleEspaceExtFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Équipements extérieurs"
                    fields={fieldsEquipementExt}
                    onFieldChange={handleEquipementExtFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Équipements divers"
                    fields={fieldsEquipementDiv}
                    onFieldChange={handleEquipementDivFieldChange}
                    readOnly={readOnly}
                />
            </div>
            <div>
                <FieldSection
                    title="Propreté"
                    fields={fieldsProprete}
                    onFieldChange={handlePropreteFieldChange}
                    readOnly={readOnly}
                />
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
                            <>
                                <i className="far fa-circle-check"></i>
                                Valider
                            </>
                        )}
                        {ficheValidated && (
                            <div className="ficheValidatedMessage">
                                <i className="fa-solid fa-check"></i> FicheQS validée
                            </div>
                        )}
                    </button>
                </div>
            )}

            {showEmailButton && (
                <div className="sendEmailContainer">
                    <button type="submit" className="buttonLogin" onClick={handleSendEmail}>
                        <i className="far fa-paper-plane"></i>
                        Envoyer par mail
                        {emailSent && (
                            <div className="emailSentMessage">
                                <i className="fa-solid fa-check"></i> Email envoyé
                            </div>
                        )}
                    </button>
                </div>
            )}
        </form>
    );
};

export default FicheqsForm;
