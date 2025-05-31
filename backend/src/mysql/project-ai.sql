-- -------------------------------------------------------------
-- Simplified Database Schema for Node.js/React Admin Panel
-- Generation Time: 2025-05-13 (Adjusted for current interaction)
-- -------------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Drop tables in an order that respects foreign key constraints (or use IF EXISTS)
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `llm_user`;
DROP TABLE IF EXISTS `llm_models`;
DROP TABLE IF EXISTS `llms`;

-- User Table: Stores user information.
-- The YouTube-related columns are kept as they were in the original users table;
-- you can remove them if they are not relevant to your admin panel.
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- LLMs Table: Stores the Large Language Model providers (e.g., OpenAI, Anthropic).
CREATE TABLE `llms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `llms_name_unique` (`name`),
  UNIQUE KEY `llms_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- LLM Models Table: Stores specific models for each LLM provider (e.g., gpt-3.5-turbo for OpenAI).
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- LLM User Table (Pivot Table): Links users to LLMs and stores their API keys for each LLM.
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users`
(`name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `is_admin`)
VALUES
('Bahloul Admin', 'bahloul.admin@example.com', NOW(), '$2b$10$MiEB6D/rxPQl0dKYNng7/Oag4AIJ.0Lrl4YlwWXE97vu6APtEzgAy', NULL, NOW(), NOW(), 1),
('Guillaume Admin', 'guillaume.admin@example.com', NOW(), '$2b$10$MiEB6D/rxPQl0dKYNng7/Oag4AIJ.0Lrl4YlwWXE97vu6APtEzgAy', NULL, NOW(), NOW(), 1),
('Dan User', 'dan.user@example.com', NOW(), '$2b$10$54h6CgJXjtSPHeYUhpZk7OOuc.MSn64w4F0TDJ1FKl0JwJeHR7uJS', NULL, NOW(), NOW(), 0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;