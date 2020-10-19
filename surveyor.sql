-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table surveyor.fields
CREATE TABLE IF NOT EXISTS `fields` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `field_data` mediumtext NOT NULL,
  `survey_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `fields_competition` (`survey_id`),
  CONSTRAINT `fields_surveys` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table surveyor.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table surveyor.user_surveys
CREATE TABLE IF NOT EXISTS `user_surveys` (
  `user` int(11) NOT NULL,
  `survey` int(11) NOT NULL,
  KEY `user_surveys_survey` (`survey`),
  KEY `user_surveys_users` (`user`),
  CONSTRAINT `user_surveys_survey` FOREIGN KEY (`survey`) REFERENCES `surveys` (`ID`),
  CONSTRAINT `user_surveys_users` FOREIGN KEY (`user`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
