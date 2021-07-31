-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 31 juil. 2021 à 20:41
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
  KEY `idUSERS` (`idUSERS`),
  KEY `idPOSTS` (`idPOSTS`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idUSERS`, `idPOSTS`, `comment`, `createdAt`, `updatedAt`) VALUES
(43, 15, 70, 'petit mais bien rusé', '2021-07-29 16:18:40', '2021-07-29 16:19:03'),
(44, 16, 70, 'Je le connais', '2021-07-29 16:20:11', '2021-07-30 13:32:29'),
(50, 15, 70, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In tempora aperiam reprehenderit amet! Voluptate, earum modi ab libero, assumenda suscipit, unde error nostrum ducimus laborum cupiditate vitae deleniti. Illum, debitis.', '2021-07-30 18:17:18', '2021-07-30 18:17:18'),
(53, 24, 72, 'C\'est très utile pour la déco!!!', '2021-07-31 18:54:17', '2021-07-31 18:54:17'),
(54, 24, 70, 'Question qui est le meilleur ami de l\'homme ?', '2021-07-31 18:55:19', '2021-07-31 18:55:19'),
(55, 53, 72, 'C\'est complètement démodé', '2021-07-31 19:06:50', '2021-07-31 19:06:50'),
(56, 17, 79, 'Il se peut qu\'il pleuve à l\'intérieur', '2021-07-31 19:21:31', '2021-07-31 19:21:31'),
(57, 17, 72, 'Attention au port des choses lourdes', '2021-07-31 19:26:45', '2021-07-31 19:26:45'),
(58, 17, 75, 'Qu\'il est brave', '2021-07-31 19:27:12', '2021-07-31 19:27:12'),
(59, 17, 76, 'On vit dans un drôle de monde...', '2021-07-31 19:27:48', '2021-07-31 19:27:48'),
(60, 17, 78, 'Ils sont inséparables', '2021-07-31 19:28:26', '2021-07-31 19:28:26'),
(61, 17, 70, 'Il y a tellement de choses à partager', '2021-07-31 19:28:59', '2021-07-31 19:29:43'),
(62, 17, 77, 'J\'ai une meilleure proposition pourquoi pas dans un petit village en Armorique???', '2021-07-31 19:30:43', '2021-07-31 19:30:43');

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
  KEY `idUSERS` (`idUSERS`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `idUSERS`, `title`, `content`, `attachement`, `createdAt`, `updatedAt`) VALUES
(70, 15, 'Il était une fois les amis', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In tempora aperiam reprehenderit amet! Voluptate, earum modi ab libero, assumenda suscipit, unde error nostrum ducimus laborum cupiditate vitae deleniti. Illum, debitis.', 'https://www.asterix.com/illus/asterix-de-a-a-z/les-personnages/perso/g09.gif', '2021-07-29 16:17:27', '2021-07-30 21:51:16'),
(72, 16, 'Vends Menhir', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In tempora aperiam reprehenderit amet! Voluptate, earum modi ab libero, assumenda suscipit, unde error nostrum ducimus laborum cupiditate vitae deleniti. Illum, debitis.', 'https://i.pinimg.com/474x/f6/b7/16/f6b716aa560ac9797828300d90118d25.jpg', '2021-07-30 10:29:41', '2021-07-31 19:12:24'),
(75, 24, 'J\'ai une bonne nouvelle', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In tempora aperiam reprehenderit amet! Voluptate, earum modi ab libero, assumenda suscipit, unde error nostrum ducimus laborum cupiditate vitae deleniti. Illum, debitis.', 'https://communautes.cultura.com/t5/image/serverpage/image-id/48376i5E743E99955B5BA3?v=v2', '2021-07-31 18:50:09', '2021-07-31 18:50:39'),
(76, 53, 'Parlons cinémas', 'C\'est un sacré évènement', 'https://resize-europe1.lanmedia.fr/img/var/europe1/storage/images/media/images/asterix-et-latraviata/53599779-1-fre-FR/Asterix-et-Latraviata.jpg', '2021-07-31 19:04:09', '2021-07-31 19:05:44'),
(77, 32, 'J\'ai une idée', 'Pourquoi pas organiser un séminaire à Rome', 'https://www.asterix.com/illus/asterix-de-a-a-z/les-personnages/perso/r06b.gif', '2021-07-31 19:11:17', '2021-07-31 19:11:17'),
(78, 20, 'Le meilleur ami de l\'homme', 'Je sais qui c\'est', 'https://i.pinimg.com/originals/35/3d/0c/353d0c4c335937f6bfdec09f853d8db6.png', '2021-07-31 19:14:58', '2021-07-31 19:14:58'),
(79, 19, 'Si on chantait', 'Rendez-vous à la taverne.', 'https://i.skyrock.net/4030/16074030/pics/433896047.gif', '2021-07-31 19:17:24', '2021-07-31 19:17:49'),
(80, 17, 'Rendez-vous pour déjeuner', 'C\'est une recette spéciale.', 'https://i1.sndcdn.com/artworks-000569985167-qx7x31-t500x500.jpg', '2021-07-31 19:20:39', '2021-07-31 19:20:39'),
(81, 18, 'Notre communauté', 'Petite photo', 'https://www.qualivie.fr/wp-content/uploads/2017/04/village-gaulois.jpg', '2021-07-31 19:33:48', '2021-07-31 19:33:48');

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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(15, 'sUoSRyndWK3HafNNSQaSVw==', 'Asterix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 1, '2021-07-13 19:53:33', '2021-07-13 19:53:33'),
(16, 'dkltT86kcJ8T1avUhPb4pw==', 'Obelix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-13 19:54:02', '2021-07-13 19:54:02'),
(17, 'f+LdzVt/FwgMd8CSYidXkrnEjtEvRpxodFLDRSSVofs=', 'Panoramix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-13 19:55:12', '2021-07-13 19:55:12'),
(18, '6yB60eaSbxjVdUID+tcHRXFq+85/U9saxgOwQgXt2Qg=', 'Abraracourcix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-13 19:56:03', '2021-07-13 19:56:03'),
(19, '7JhOdETvbhRJ3C5WxGNRvSX0EPxLbyDPefk4f2Wtvrg=', 'Assurancetourix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-13 19:56:54', '2021-07-13 19:56:54'),
(20, 'SDkwOSbLZyZv3qCREv2r/A==', 'Falbala', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-13 20:40:13', '2021-07-13 20:40:13'),
(21, '9fAcwa//2TYoY2355FJ19e/6BP+8oixymFVSrmxWpN0=', 'Bonemine', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-13 20:41:49', '2021-07-13 20:41:49'),
(24, 'gAPHxwmGxDtvqDBj+9SJmw==', 'Idefix', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-18 15:36:58', '2021-07-18 15:36:58'),
(32, 'NK1Q56lQ+AVXiSTE4bUnow==', 'Brutus', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-27 13:52:17', '2021-07-27 13:52:17'),
(53, 'ZS7QgRf3G997HSq+KrMyYg==', 'Cesar', '493751f047eda2b1d4fab014de66c322d8380b1764d608b46c2451a52c3f3d7e', 0, '2021-07-29 16:32:12', '2021-07-29 16:32:12');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`idPOSTS`) REFERENCES `posts` (`id`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
