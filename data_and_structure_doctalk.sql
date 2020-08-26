-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: doctalk
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_lastname` varchar(45) NOT NULL,
  `doc_firstname` varchar(45) NOT NULL,
  `doc_city` varchar(45) NOT NULL,
  `profession_id` int(11) NOT NULL,
  `doc_profesionnal_code` varchar(45) NOT NULL,
  `doc_email` varchar(45) DEFAULT NULL,
  `do_password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `do_email_UNIQUE` (`doc_email`),
  KEY `fk_doctor_profession_idx` (`profession_id`),
  CONSTRAINT `fk_doctor_profession` FOREIGN KEY (`profession_id`) REFERENCES `profession` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES
(23,'Alicia','Barthélemy','Bordeaux',16,'399 826 981','alicia-bart@gmail.com','456youcantfindme'),
(24,'Dubost','Emmanuel','Toulon',4,'399 826 981','dubostemma@gmail.com','dontopentthedoor'),
(25,'Monique','Ménard','Montpellier',5,'399 826 981','momomeme@gmail.com','.montpel'),
(26,'Joëlle','Moreau','Paris',4,'399 826 981','jomoreau@gmail.com','.noyeuxjoel'),
(27,'Colin','Touchard','Rennes',8,'399 826 981','colintouch@gmail.com','.filetdecolin'),
(28,'Hachette','Emmanuel','Dijon',1,'399 826 981','emmahachette@gmail.com','.cartebleue'),
(29,'Jacquier','Valéry','Paris',18,'399 826 981','valjacquier@gmail.com','.okchevre'),
(30,'Damien','Baugé','Paris',12,'399 826 981','dambau@gmail.com','.youtube');

/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitation`
--

DROP TABLE IF EXISTS `invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `subject` varchar(30) NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invitation_patient_idx` (`patient_id`),
  KEY `fk_invitation_doctor_idx` (`doctor_id`),
  CONSTRAINT `fk_invitation_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_invitation_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitation`
--

LOCK TABLES `invitation` WRITE;
/*!40000 ALTER TABLE `invitation` DISABLE KEYS */;
INSERT INTO `invitation` VALUES (1,1,1,'Mal à la tête','Bonjour j\'ai mal à la tête depuis quelque temps'),(2,2,2,'Nosée','Pouvez vous me refaire une ordonnance comme prévu ?');
/*!40000 ALTER TABLE `invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pa_lastname` varchar(45) NOT NULL,
  `pa_firstname` varchar(45) NOT NULL,
  `pa_city` varchar(45) DEFAULT NULL,
  `pa_mail` varchar(45) NOT NULL,
  `pa_password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Blondel','Auxence',NULL,'ablondel@gmail.com','.ablondel'),
(2,'Wallart','Aurélien',NULL,'awallart@gmail.com','.awallard'),
(3,'Nogur','Mamed',NULL,'mnogur@gmail.com','.mnogur'),
(4,'Kha','Yasmine',NULL,'yaskha@gmail.com','.ykha');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_doctor`
--

DROP TABLE IF EXISTS `patient_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_doctor` (
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  PRIMARY KEY (`patient_id`,`doctor_id`),
  KEY `fk_patient_has_doctor_patient1_idx` (`patient_id`),
  KEY `fk_patient_has_doctor_doctor1_idx` (`doctor_id`),
  CONSTRAINT `fk_patient_has_doctor_doctor1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_has_doctor_patient1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_doctor`
--

LOCK TABLES `patient_doctor` WRITE;
/*!40000 ALTER TABLE `patient_doctor` DISABLE KEYS */;
INSERT INTO `patient_doctor` VALUES (1,1);
/*!40000 ALTER TABLE `patient_doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profession`
--

DROP TABLE IF EXISTS `profession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profession` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profession`
--

LOCK TABLES `profession` WRITE;
/*!40000 ALTER TABLE `profession` DISABLE KEYS */;
INSERT INTO `profession` VALUES (1,'Neurologist'),
(2,'Generalist doctor'),
(3,'Pediatrician'),
(4,'Endocrinologist'),
(5,'Epidemiologist'),
(6,'Gastroenterologist'),
(7,'Geriatrician'),
(8,'Neurosurgeon'),
(9,'Medical Geneticist'),
(10,'Parasitologist'),
(11,'Urologist'),
(12,'Pathologist'),
(13,'Periodontist'),
(14,'Physiatrist'),
(15,'Plastic Surgeon'),
(16,'Pulmonologist'),
(17,'Radiologist'),
(18,'Surgeon')
;
/*!40000 ALTER TABLE `profession` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-25  0:18:13
