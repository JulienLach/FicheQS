CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    role INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE questions (
    id_question SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    section VARCHAR(50) NOT NULL
);

CREATE TABLE audits (
    id_audit SERIAL PRIMARY KEY,
    status INTEGER,
    audit_date DATE NOT NULL,
    site VARCHAR(100) NOT NULL,
    auditeur VARCHAR(100) NOT NULL,
    nature_audit VARCHAR(100),
    audites VARCHAR(255),
    observation_generale TEXT,
    signature TEXT,
    signature_timestamp TIMESTAMPTZ,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE RESTRICT
);

CREATE TABLE audits_has_question (
    id_audit INTEGER,
    id_question INTEGER,
    valeur VARCHAR(2),
    observation VARCHAR(255),
    PRIMARY KEY (id_audit, id_question),
    FOREIGN KEY (id_audit) REFERENCES audits(id_audit) ON DELETE CASCADE,
    FOREIGN KEY (id_question) REFERENCES questions(id_question) ON DELETE RESTRICT
);

CREATE TABLE actions_correctives (
    id_action SERIAL PRIMARY KEY,
    id_audit INTEGER NOT NULL,
    nature VARCHAR(255),
    delai DATE,
    responsable VARCHAR(100),
    FOREIGN KEY (id_audit) REFERENCES audits(id_audit) ON DELETE CASCADE
);

INSERT INTO users (email, password, firstname, lastname, role)
VALUES ('test@gmail.com', 'bc94077a47a4f4aceaf7d69686efa25a:46be8651aafe73b8060c2ffcaa7b1be6aeaca46a6a6b793388298380c5fca099fc18b99afdcf640b1e57b7e222dfbaf2faf4c857cf0018c51af1ecc1fcd2ef8a', 'Jean', 'Dupont', 2);

INSERT INTO questions (name, section) VALUES
    ('sse_ordre_rangement', 'SSE'),
    ('sse_conditions_travail', 'SSE'),
    ('sse_acces', 'SSE'),
    ('sse_conformite_materiel', 'SSE'),
    ('sse_pdp', 'SSE'),
    ('sse_habilitations', 'SSE'),
    ('sse_causerie', 'SSE'),
    ('sse_confinement', 'SSE'),
    ('sse_permis_conduire', 'SSE'),
    ('sse_classeur_sse', 'SSE'),
    ('sse_premier_secours', 'SSE'),
    ('sse_cpshe', 'SSE'),
    ('sse_consignes_alertes', 'SSE'),
    ('sse_lancement_travail', 'SSE'),
    ('sse_lsa', 'SSE'),
    ('sse_lps', 'SSE'),
    ('sse_mpp', 'SSE'),
    ('sse_regles_vie', 'SSE'),
    ('sse_duree_travail', 'SSE'),
    ('sse_numero_urgence', 'SSE'),
    ('epi_chaussures', 'EPI'),
    ('epi_vetement', 'EPI'),
    ('epi_gants', 'EPI'),
    ('epi_lunettes', 'EPI'),
    ('epi_casque', 'EPI'),
    ('epi_protections_auditives', 'EPI'),
    ('sante_aptitude_medicale', 'SANTE'),
    ('sante_politique_alcool', 'SANTE'),
    ('culture_lancement_travail', 'CULTURE_SECURITE'),
    ('env_empreinte_carbone', 'ENVIRONNEMENT'),
    ('env_tri_dechets', 'ENVIRONNEMENT'),
    ('env_ecoconduite', 'ENVIRONNEMENT');

-- Audit démo
INSERT INTO audits (status, audit_date, site, auditeur, nature_audit, audites, id_user)
VALUES (2, '2025-08-20', 'Site A', 'Jean Dupont', 'Audit terrain', 'Martin Pierre, Dubois Marie', 1);

INSERT INTO audits_has_question (id_audit, id_question, valeur, observation) VALUES
    (1, 1, 'J', NULL),
    (1, 2, 'J', NULL),
    (1, 3, 'L', 'Couloir partiellement encombré'),
    (1, 4, 'J', NULL),
    (1, 5, 'J', NULL),
    (1, 6, 'J', NULL),
    (1, 7, 'J', NULL),
    (1, 8, 'J', NULL),
    (1, 9, 'NC', NULL),
    (1, 10, 'J', NULL),
    (1, 11, 'J', NULL),
    (1, 12, 'J', NULL),
    (1, 13, 'J', NULL),
    (1, 14, 'J', NULL),
    (1, 15, 'J', NULL),
    (1, 16, 'J', NULL),
    (1, 17, 'J', NULL),
    (1, 18, 'J', NULL),
    (1, 19, 'J', NULL),
    (1, 20, 'J', NULL),
    (1, 21, 'J', NULL),
    (1, 22, 'J', NULL),
    (1, 23, 'NC', NULL),
    (1, 24, 'J', NULL),
    (1, 25, 'J', NULL),
    (1, 26, 'NC', NULL),
    (1, 27, 'J', NULL),
    (1, 28, 'J', NULL),
    (1, 29, 'J', NULL),
    (1, 30, 'J', NULL),
    (1, 31, 'J', NULL),
    (1, 32, 'J', NULL);

INSERT INTO actions_correctives (id_audit, nature, delai, responsable) VALUES
    (1, 'Dégager le couloir d''accès', '2025-09-01', 'Martin Pierre');
