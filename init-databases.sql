-- Script d'initialisation pour créer les bases de données des différents clients
-- Ce script est exécuté automatiquement au démarrage du conteneur PostgreSQL

-- Créer les bases de données seulement si elles n'existent pas
SELECT 'CREATE DATABASE ficheqs_h76'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ficheqs_h76')\gexec

SELECT 'CREATE DATABASE ficheqs_demo'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ficheqs_demo')\gexec

-- Se connecter à ficheqs_h76 et créer les tables si elles n'existent pas
\c ficheqs_h76
\i /docker-entrypoint-initdb.d/02-database_script.sql

-- Se connecter à ficheqs_demo et créer les tables si elles n'existent pas
\c ficheqs_demo
\i /docker-entrypoint-initdb.d/02-database_script.sql