-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 août 2021 à 16:51
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUSERS` int(11) NOT NULL,
  `idPOSTS` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_ibfk_1` (`idUSERS`),
  KEY `comments_ibfk_2` (`idPOSTS`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idUSERS`, `idPOSTS`, `comment`, `createdAt`, `updatedAt`) VALUES
(19, 29, 88, 'Coucou', '2021-08-03 16:45:39', '2021-08-03 16:45:39'),
(20, 30, 88, 'Super', '2021-08-03 16:46:14', '2021-08-03 16:46:14'),
(21, 30, 89, 'Oui ca va', '2021-08-03 16:47:13', '2021-08-03 16:47:13'),
(22, 32, 90, 'Très Bien', '2021-08-03 16:49:34', '2021-08-03 16:49:55');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUSERS` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachement` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`idUSERS`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `idUSERS`, `title`, `content`, `attachement`, `createdAt`, `updatedAt`) VALUES
(88, 29, 'Hello', 'Ca va ', 'https://static.actu.fr/uploads/2017/09/Asterix-37eme-album-2017.jpg-Galerie-de-photos.jpg', '2021-08-03 16:45:23', '2021-08-03 16:45:23'),
(89, 30, 'Histoire', 'Commentaire', 'https://static.cnews.fr/sites/default/files/styles/image_640_360/public/menhirdorrestauree2_5ea6af140a626_0.jpg?itok=x2XfdC4S', '2021-08-03 16:46:47', '2021-08-03 16:46:47'),
(90, 32, 'Histoire', 'Contenu', 'https://www.wearecom.fr/wp-content/uploads/2017/11/asterix.jpg', '2021-08-03 16:48:45', '2021-08-03 16:49:16');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210707121250-create-user.js'),
('20210707122046-create-post.js'),
('20210707122757-create-comment.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(29, 'sUoSRyndWK3HafNNSQaSVw==', 'Asterix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 1, '2021-08-03 15:57:05', '2021-08-03 15:57:05'),
(30, 'dkltT86kcJ8T1avUhPb4pw==', 'Obelix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-08-03 15:59:17', '2021-08-03 15:59:17'),
(32, 'gAPHxwmGxDtvqDBj+9SJmw==', 'Idefix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-08-03 16:48:13', '2021-08-03 16:48:13');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`idPOSTS`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
