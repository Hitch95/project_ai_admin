-- -------------------------------------------------------------
-- Base de données AI Factory - Laravel + Node.js Admin
-- Compatible avec Laravel (frontend users) + Better-Auth (admin)
-- Version finale avec Better-Auth fonctionnel
-- -------------------------------------------------------------

/* 🗄️ Créer la base de données */
DROP DATABASE IF EXISTS `AiFactory`;
CREATE DATABASE `AiFactory` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `AiFactory`;

SET FOREIGN_KEY_CHECKS = 0;

/* 🗑️ Supprimer toutes les tables si elles existent */
DROP TABLE IF EXISTS `llm_user`;
DROP TABLE IF EXISTS `llm_models`;
DROP TABLE IF EXISTS `llms`;
DROP TABLE IF EXISTS `users`;
/* Tables Laravel */
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `password_reset_tokens`;
DROP TABLE IF EXISTS `migrations`;
/* Tables Better-Auth */
DROP TABLE IF EXISTS `session`;
DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `verification`;
DROP TABLE IF EXISTS `user`;
DROP VIEW IF EXISTS `user`;

/* 👥 Table Users (structure Laravel + colonne is_admin pour admin) */
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` boolean NOT NULL DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* 🔧 Table Better-Auth User (séparée pour l'admin Node.js) */
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `is_admin` boolean DEFAULT true,
  `emailVerified` boolean DEFAULT false,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* 🔧 Table Better-Auth Session */
CREATE TABLE `session` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `token` varchar(255) NOT NULL,
  `ipAddress` varchar(255) DEFAULT NULL,
  `userAgent` text DEFAULT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token_unique` (`token`),
  KEY `session_userId_foreign` (`userId`),
  CONSTRAINT `session_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* 🔧 Table Better-Auth Account */
CREATE TABLE `account` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `accountId` varchar(255) NOT NULL,
  `providerId` varchar(255) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessToken` text,
  `refreshToken` text,
  `expiresAt` timestamp NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `account_userId_foreign` (`userId`),
  CONSTRAINT `account_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* 🔧 Table Better-Auth Verification */
CREATE TABLE `verification` (
  `id` varchar(255) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* 🌐 Tables Laravel (pour ton collègue frontend) */
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* 🤖 Tables Métier LLMs */
CREATE TABLE `llms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `llms_name_unique` (`name`),
  UNIQUE KEY `llms_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `llm_models` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `llm_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `llm_models_name_unique` (`name`),
  UNIQUE KEY `llm_models_slug_unique` (`slug`),
  KEY `llm_models_llm_id_foreign` (`llm_id`),
  CONSTRAINT `llm_models_llm_id_foreign` FOREIGN KEY (`llm_id`) REFERENCES `llms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `llm_user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `llm_id` bigint unsigned NOT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `llm_user_user_id_foreign` (`user_id`),
  KEY `llm_user_llm_id_foreign` (`llm_id`),
  CONSTRAINT `llm_user_llm_id_foreign` FOREIGN KEY (`llm_id`) REFERENCES `llms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `llm_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* Réactiver les vérifications */
SET FOREIGN_KEY_CHECKS = 1;

/* 📊 Données de test */
INSERT INTO `users` (`name`, `email`, `password`, `is_admin`) VALUES
('Bahloul Admin', 'bahloul.admin@example.com', '$2b$10$MiEB6D/rxPQl0dKYNng7/Oag4AIJ.0Lrl4YlwWXE97vu6APtEzgAy', true),
('Guillaume Admin', 'guillaume.admin@example.com', '$2b$10$MiEB6D/rxPQl0dKYNng7/Oag4AIJ.0Lrl4YlwWXE97vu6APtEzgAy', true),
('Dan User', 'dan.user@example.com', '$2b$10$54h6CgJXjtSPHeYUhpZk7OOuc.MSn64w4F0TDJ1FKl0JwJeHR7uJS', false),
('Test User Laravel', 'test.laravel@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', false);

INSERT INTO `llms` (`name`, `slug`, `created_at`, `updated_at`) VALUES
('OpenAI', 'openai', NOW(), NOW()),
('Anthropic', 'anthropic', NOW(), NOW()),
('Google', 'google', NOW(), NOW()),
('Meta', 'meta', NOW(), NOW());
-- Ajout Gemini, ChatGPT, Mistral
INSERT INTO `llms` (`name`, `slug`, `created_at`, `updated_at`) VALUES
('Gemini', 'gemini', NOW(), NOW()),
('ChatGPT', 'chatgpt', NOW(), NOW()),
('Mistral', 'mistral', NOW(), NOW());

INSERT INTO `llm_models` (`llm_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'GPT-4', 'gpt-4', NOW(), NOW()),
(1, 'GPT-4 Turbo', 'gpt-4-turbo', NOW(), NOW()),
(1, 'GPT-3.5 Turbo', 'gpt-3-5-turbo', NOW(), NOW()),
(2, 'Claude 3.5 Sonnet', 'claude-3-5-sonnet', NOW(), NOW()),
(2, 'Claude 3 Opus', 'claude-3-opus', NOW(), NOW()),
(2, 'Claude 3 Haiku', 'claude-3-haiku', NOW(), NOW()),
(3, 'Gemini Pro', 'gemini-pro', NOW(), NOW()),
(3, 'Gemini Flash', 'gemini-flash', NOW(), NOW()),
(4, 'Llama 3.1', 'llama-3-1', NOW(), NOW());

-- Modèles pour Gemini (llm_id à adapter selon la table llms)
INSERT INTO `llm_models` (`llm_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(5, 'Google: Gemini 2.5 Flash', 'google/gemini-2.5-flash', NOW(), NOW()),
(5, 'Google: Gemini 2.5 Pro', 'google/gemini-2.5-pro', NOW(), NOW()),
(5, 'Google: Gemma 3 27B (free)', 'google/gemma-3-27b-it:free', NOW(), NOW());

-- Modèles pour ChatGPT (llm_id à adapter selon la table llms)
INSERT INTO `llm_models` (`llm_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(6, 'GPT-4.1', 'gpt-4-1-2025-04-14', NOW(), NOW()),
(6, 'GPT-4o', 'gpt-4o-2025-11-20', NOW(), NOW());

-- Modèles pour Mistral (llm_id à adapter selon la table llms)
INSERT INTO `llm_models` (`llm_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(7, 'Mistral: Mistral Small 3.2 24B (free)', 'mistralai/mistral-small-3.2-24b-instruct:free', NOW(), NOW());

INSERT INTO `llm_user` (`user_id`, `llm_id`, `api_key`, `created_at`, `updated_at`) VALUES
(1, 1, 'sk-test-openai-key-admin-bahloul', NOW(), NOW()),
(1, 2, 'sk-ant-test-anthropic-key-admin', NOW(), NOW()),
(3, 1, 'sk-test-openai-key-dan-user', NOW(), NOW());

/* 🎯 Vérifications finales */
SELECT '🎉 Base de données AiFactory créée avec Better-Auth fonctionnel!' AS status;

SELECT '📊 Résumé des tables créées:' AS info;
SELECT 
  TABLE_NAME as 'Table',
  TABLE_ROWS as 'Lignes',
  TABLE_COMMENT as 'Commentaire'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'AiFactory' 
ORDER BY TABLE_NAME;

SELECT '✅ Système dual prêt: Laravel (users) + Better-Auth (user) + Node.js Admin!' AS final_status;