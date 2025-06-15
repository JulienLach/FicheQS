-- Création de la table Users
CREATE TABLE Users (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
);

-- Création de la table Fields
CREATE TABLE Fields (
    id_field SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Création de la table Ficheqs
CREATE TABLE Ficheqs (
    id_fiche SERIAL PRIMARY KEY,
    status INTEGER,
    visite_date DATE NOT NULL,
    logement VARCHAR(100) NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE RESTRICT
);

-- Création de la table ficheqs_has_field
CREATE TABLE ficheqs_has_field (
    id_fiche INTEGER,
    id_field INTEGER,
    valeur BOOLEAN, -- true=OK, false=pas opérationnel, null=non concerné
    description VARCHAR(255), -- Optionnel si valeur = false
    PRIMARY KEY (id_fiche, id_field),
    FOREIGN KEY (id_fiche) REFERENCES Ficheqs(id_fiche) ON DELETE CASCADE,
    FOREIGN KEY (id_field) REFERENCES Fields(id_field) ON DELETE RESTRICT,
    CHECK (description IS NULL OR valeur = false) -- Contrainte : description seulement si valeur = false
);

-- Insertion d'un utilisateur de test
INSERT INTO Users (email, password, firstname, lastname)
VALUES ('test@gmail.com', 'test', 'Jean', 'Dupont');

-- Insertion des champs prédéfinis dans Fields
INSERT INTO Fields (name) VALUES
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