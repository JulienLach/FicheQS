-- Script d'initialisation pour créer les bases de données des différents clients
-- Ce script est exécuté automatiquement au démarrage du conteneur PostgreSQL

-- Créer les bases de données pour chaque client
CREATE DATABASE ficheqs_h76;
CREATE DATABASE ficheqs_demo;

-- Créer des utilisateurs spécifiques par client avec des mots de passe différents
-- Ces utilisateurs seront configurés via les variables d'environnement Ansible

-- Note: Le script database_script.sql sera exécuté automatiquement après
-- grâce à l'ordre alphabétique des fichiers dans /docker-entrypoint-initdb.d/

-- Les permissions et mots de passe spécifiques seront gérés par Ansible
-- lors du déploiement de chaque client