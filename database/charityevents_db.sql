CREATE DATABASE  IF NOT EXISTS `charityevents_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `charityevents_db`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Fun Run','Charity running events'),(2,'Gala','Formal charity dinners'),(3,'Auction','Silent auction events'),(4,'Concert','Charity music concerts');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(150) NOT NULL,
  `description` text,
  `full_description` text,
  `event_date` datetime NOT NULL,
  `location` varchar(200) NOT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `ticket_price` decimal(10,2) DEFAULT '0.00',
  `goal_amount` decimal(12,2) DEFAULT NULL,
  `current_amount` decimal(12,2) DEFAULT '0.00',
  `image_url` varchar(300) DEFAULT NULL,
  `status` enum('active','suspended','past','upcoming') DEFAULT 'upcoming',
  `org_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `org_id` (`org_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'City Fun Run 2026','5km charity run','Join us for a 5km run to raise funds for children education.','2026-10-15 08:00:00','Sydney Olympic Park','Raise $50,000 for education',25.00,50000.00,15000.00,'images/funrun.jpg','upcoming',1,1),(2,'Hope Gala Dinner','Formal dinner event','An elegant evening with dinner and entertainment.','2026-11-20 19:00:00','Sydney Town Hall','Support medical research',150.00,100000.00,45000.00,'images/gala.jpg','upcoming',1,2),(3,'Silent Auction Night','Art auction','Bid on artworks and support charity.','2026-10-05 18:30:00','Melbourne Art Gallery','Fund environmental projects',50.00,30000.00,12000.00,'images/auction.jpg','upcoming',2,3),(4,'Charity Rock Concert','Live music night','Enjoy live bands and support a good cause.','2026-12-01 20:00:00','Brisbane Entertainment Centre','Raise funds for health research',80.00,80000.00,30000.00,'images/concert.jpg','upcoming',3,4),(5,'Beach Cleanup Run','Run and cleanup','Run along the beach and help clean up.','2026-10-25 07:00:00','Bondi Beach','Environmental awareness',0.00,20000.00,8000.00,'images/beachrun.jpg','upcoming',2,1),(6,'Winter Gala 2026','Formal winter dinner','A magical winter evening for charity.','2026-11-10 18:00:00','Perth Convention Centre','Support homeless shelters',120.00,60000.00,25000.00,'images/wintergala.jpg','upcoming',1,2),(7,'Art for Hope Auction','Online art auction','Bid on paintings from local artists.','2026-10-30 17:00:00','Online','Support children arts programs',30.00,25000.00,10000.00,'images/artauction.jpg','upcoming',1,3),(8,'Jazz for Health','Jazz concert','An evening of jazz music for health research.','2026-12-15 19:30:00','Adelaide Jazz Club','Fund cancer research',60.00,40000.00,18000.00,'images/jazz.jpg','upcoming',3,4);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisations`
--

DROP TABLE IF EXISTS `organisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisations` (
  `org_id` int NOT NULL AUTO_INCREMENT,
  `org_name` varchar(100) NOT NULL,
  `description` text,
  `contact_email` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisations`
--

LOCK TABLES `organisations` WRITE;
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
INSERT INTO `organisations` VALUES (1,'Hope Foundation','Helping children in need','info@hope.org','02-1111-2222','www.hope.org'),(2,'Green Future','Environmental charity','contact@green.org','02-3333-4444','www.green.org'),(3,'Health First','Medical research charity','hello@health.org','02-5555-6666','www.health.org');
/*!40000 ALTER TABLE `organisations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-24 15:03:45
