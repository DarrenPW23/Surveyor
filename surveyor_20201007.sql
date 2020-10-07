-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.28-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for surveyor
CREATE DATABASE IF NOT EXISTS `surveyor` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `surveyor`;

-- Dumping structure for table surveyor.entries
CREATE TABLE IF NOT EXISTS `entries` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `entries_competition` (`survey_id`),
  CONSTRAINT `entries_surveys` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.entries: ~2 rows (approximately)
DELETE FROM `entries`;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` (`ID`, `survey_id`, `date_created`, `date_updated`) VALUES
	(1, 1, '2020-09-22 16:22:42', '2020-09-22 16:22:42'),
	(2, 1, '2020-09-30 22:09:50', '2020-09-30 22:09:50');
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;

-- Dumping structure for table surveyor.entry_data
CREATE TABLE IF NOT EXISTS `entry_data` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `data` longtext NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `field` (`field_id`),
  KEY `entry_data_entries` (`entry_id`),
  CONSTRAINT `entry_data_entries` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`ID`),
  CONSTRAINT `entry_data_fields` FOREIGN KEY (`field_id`) REFERENCES `fields` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.entry_data: ~6 rows (approximately)
DELETE FROM `entry_data`;
/*!40000 ALTER TABLE `entry_data` DISABLE KEYS */;
INSERT INTO `entry_data` (`ID`, `field_id`, `entry_id`, `data`, `date_created`, `date_updated`) VALUES
	(1, 1, 1, 'Darren', '2020-09-22 16:23:07', '2020-09-22 16:23:07'),
	(2, 2, 1, 'darren@g2design.co.za', '2020-09-22 16:23:24', '2020-09-22 16:23:24'),
	(3, 1, 2, 'Muffin', '2020-09-30 22:10:07', '2020-09-30 22:10:07'),
	(4, 2, 2, 'darren.muffin@gmail.com', '2020-09-30 22:10:23', '2020-09-30 22:10:23'),
	(5, 3, 1, 'Wildschut', '2020-09-30 22:56:01', '2020-09-30 22:56:01'),
	(6, 3, 2, 'Tester', '2020-09-30 22:56:20', '2020-09-30 22:56:28');
/*!40000 ALTER TABLE `entry_data` ENABLE KEYS */;

-- Dumping structure for table surveyor.fields
CREATE TABLE IF NOT EXISTS `fields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `survey_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `fields_competition` (`survey_id`),
  CONSTRAINT `fields_surveys` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.fields: ~4 rows (approximately)
DELETE FROM `fields`;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` (`ID`, `label`, `slug`, `description`, `survey_id`, `date_created`, `date_updated`) VALUES
	(1, 'Name', 'name', 'Enter your name', 1, '2020-09-14 15:18:32', '2020-09-14 15:18:32'),
	(2, 'Email', 'email', 'Enter your email address', 1, '2020-09-14 15:20:39', '2020-09-14 15:20:46'),
	(3, 'Surname', 'surname', 'Enter your surname', 1, '2020-09-30 22:55:36', '2020-09-30 22:55:36');
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;

-- Dumping structure for table surveyor.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.roles: ~0 rows (approximately)
DELETE FROM `roles`;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`ID`, `name`, `date_created`, `date_updated`) VALUES
	(1, 'Admin', '2020-09-11 11:26:44', '2020-09-11 11:26:44');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table surveyor.surveys
CREATE TABLE IF NOT EXISTS `surveys` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `uses_codes` tinyint(4) NOT NULL DEFAULT '0',
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.surveys: ~2 rows (approximately)
DELETE FROM `surveys`;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` (`ID`, `name`, `slug`, `uses_codes`, `start_date`, `end_date`, `date_created`, `date_updated`) VALUES
	(1, 'G2 QA Survey', 'g2-qa-survey', 0, '2020-01-01 00:00:00', '2020-12-31 23:59:59', '2020-09-14 15:16:15', '2020-09-14 15:17:01'),
	(2, 'New Survey', 'new-survey', 0, '2020-10-07 12:34:11', '2020-12-31 23:59:59', '2020-10-07 12:34:11', '2020-10-07 12:34:13');
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;

-- Dumping structure for table surveyor.users
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `users_roles` (`role`),
  CONSTRAINT `users_roles` FOREIGN KEY (`role`) REFERENCES `roles` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.users: ~0 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID`, `email`, `role`, `username`, `password`, `date_created`, `date_updated`) VALUES
	(1, 'darren@g2design.co.za', 1, 'darrenpw23', 'robotech9', '2020-09-11 15:02:32', '2020-09-11 15:02:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table surveyor.user_surveys
CREATE TABLE IF NOT EXISTS `user_surveys` (
  `user` int(11) NOT NULL,
  `survey` int(11) NOT NULL,
  KEY `user_surveys_survey` (`survey`),
  KEY `user_surveys_users` (`user`),
  CONSTRAINT `user_surveys_survey` FOREIGN KEY (`survey`) REFERENCES `surveys` (`ID`),
  CONSTRAINT `user_surveys_users` FOREIGN KEY (`user`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table surveyor.user_surveys: ~1 rows (approximately)
DELETE FROM `user_surveys`;
/*!40000 ALTER TABLE `user_surveys` DISABLE KEYS */;
INSERT INTO `user_surveys` (`user`, `survey`) VALUES
	(1, 1);
/*!40000 ALTER TABLE `user_surveys` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
