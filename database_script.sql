-- Création de la table users
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
);

-- Création de la table fields
CREATE TABLE fields (
    id_field SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Création de la table ficheqs
CREATE TABLE ficheqs (
    id_fiche SERIAL PRIMARY KEY,
    status INTEGER,
    visite_date DATE NOT NULL,
    logement VARCHAR(100) NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE RESTRICT
);

-- Création de la table ficheqs_has_field
CREATE TABLE ficheqs_has_field (
    id_fiche INTEGER,
    id_field INTEGER,
    valeur BOOLEAN, -- true=OK, false=pas opérationnel, null=non concerné
    description VARCHAR(255), -- Optionnel si valeur = false
    PRIMARY KEY (id_fiche, id_field),
    FOREIGN KEY (id_fiche) REFERENCES ficheqs(id_fiche) ON DELETE CASCADE,
    FOREIGN KEY (id_field) REFERENCES fields(id_field) ON DELETE RESTRICT,
    CHECK (description IS NULL OR valeur = false) -- Contrainte : description seulement si valeur = false
);

-- Insertion d'un utilisateur de test
INSERT INTO users (email, password, firstname, lastname)
VALUES ('test@gmail.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Jean', 'Dupont');

-- Insertion des champs prédéfinis dans fields
INSERT INTO fields (name) VALUES
    ('daaf_presence'),
    ('daaf_etat_proprete'),
    ('daaf_fonctionnement'),
    ('gaz_roai'),
    ('gaz_chaudiere'),
    ('gaz_canalisations'),
    ('electrique_cables'),
    ('electrique_prises_interrupteurs'),
    ('electrique_convecteur'),
    ('electrique_tableau'),
    ('risque_chute_sols'),
    ('risque_chute_marches'),
    ('risque_chute_gardes_corps'),
    ('balcon_fissure'),
    ('balcon_infiltration'),
    ('evier_douche_casse'),
    ('evier_douche_joints'),
    ('faience_casse'),
    ('faience_joints'),
    ('meuble_ouverture_fermeture'),
    ('meuble_ventilation_gaz'),
    ('meuble_ventilation_sanitaire'),
    ('meuble_fixation'),
    ('canalisation_fuyante'),
    ('canalisation_inodore'),
    ('menuiserie_ouverture_fermeture'),
    ('menuiserie_exterieure_etanche'),
    ('menuiserie_detalonnage_porte'),
    ('menuiserie_quincaillerie'),
    ('ventilation_sanitaire_fonctionnement'),
    ('embelissement_propre'),
    ('embelissement_plinthe'),
    ('embelissement_barre_seuil'),
    ('espace_exterieur_vegetation'),
    ('equipement_ext_fixation'),
    ('equipement_ext_cloture'),
    ('equipement_ext_portillon'),
    ('equipement_div_hotte'),
    ('equipement_div_fixation'),
    ('equipement_div_wc'),
    ('equipement_div_porte_douche'),
    ('equipement_div_brise_vue'),
    ('equipement_div_store'),
    ('proprete_toilette'),
    ('proprete_sdb'),
    ('proprete_cuisine'),
    ('proprete_grille'),
    ('proprete_calandre'),
    ('proprete_tuyauterie'),
    ('proprete_menuiserie'),
    ('proprete_vitrage'),
    ('proprete_chambranles'),
    ('proprete_interrupteur'),
    ('proprete_sol'),
    ('proprete_joint');

-- FicheQS démo
INSERT INTO ficheqs (status, visite_date, logement, id_user)
VALUES (1, '2025-07-20', 'Appartement 12B', 1);

-- Associer tous les champs à cette ficheqs (id_fiche = 1)
INSERT INTO ficheqs_has_field (id_fiche, id_field, valeur, description) VALUES
    (1, 1, true, NULL),
    (1, 2, false, 'À nettoyer'),
    (1, 3, NULL, NULL),
    (1, 4, true, NULL),
    (1, 5, true, NULL),
    (1, 6, false, 'Fuite détectée'),
    (1, 7, true, NULL),
    (1, 8, true, NULL),
    (1, 9, NULL, NULL),
    (1, 10, true, NULL),
    (1, 11, true, NULL),
    (1, 12, false, 'À réparer'),
    (1, 13, true, NULL),
    (1, 14, true, NULL),
    (1, 15, NULL, NULL),
    (1, 16, true, NULL),
    (1, 17, true, NULL),
    (1, 18, false, 'Cassée'),
    (1, 19, true, NULL),
    (1, 20, true, NULL),
    (1, 21, NULL, NULL),
    (1, 22, true, NULL),
    (1, 23, true, NULL),
    (1, 24, false, 'Fuite'),
    (1, 25, true, NULL),
    (1, 26, true, NULL),
    (1, 27, true, NULL),
    (1, 28, NULL, NULL),
    (1, 29, true, NULL),
    (1, 30, true, NULL),
    (1, 31, true, NULL),
    (1, 32, false, 'Plinthe manquante'),
    (1, 33, true, NULL),
    (1, 34, true, NULL),
    (1, 35, true, NULL),
    (1, 36, true, NULL),
    (1, 37, false, 'Portillon bloqué'),
    (1, 38, true, NULL),
    (1, 39, true, NULL),
    (1, 40, true, NULL),
    (1, 41, true, NULL),
    (1, 42, true, NULL),
    (1, 43, true, NULL),
    (1, 44, true, NULL),
    (1, 45, true, NULL),
    (1, 46, true, NULL),
    (1, 47, true, NULL),
    (1, 48, true, NULL),
    (1, 49, true, NULL),
    (1, 50, true, NULL),
    (1, 51, true, NULL),
    (1, 52, true, NULL),
    (1, 53, true, NULL),
    (1, 54, true, NULL),
    (1, 55, true, NULL);