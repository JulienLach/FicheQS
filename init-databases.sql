SELECT 'CREATE DATABASE auditqs'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'auditqs')\gexec

\c auditqs
\i /docker-entrypoint-initdb.d/02-database_script.sql
