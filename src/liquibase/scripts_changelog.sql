--liquibase formatted sql

INSERT INTO plt.public.roles(id, value, label, "createdAt", "updatedAt")
VALUES (1, 'admin', 'Administrator', now(), now());

INSERT INTO plt.public.roles(id, value, label, "createdAt", "updatedAt")
VALUES (2, 'user', 'User', now(), now());