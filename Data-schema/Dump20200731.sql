CREATE DATABASE  IF NOT EXISTS `toll_blocks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `toll_blocks`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: toll_blocks
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add authority',7,'add_authority'),(26,'Can change authority',7,'change_authority'),(27,'Can delete authority',7,'delete_authority'),(28,'Can view authority',7,'view_authority'),(29,'Can add booth',8,'add_booth'),(30,'Can change booth',8,'change_booth'),(31,'Can delete booth',8,'delete_booth'),(32,'Can view booth',8,'view_booth'),(33,'Can add ministry',9,'add_ministry'),(34,'Can change ministry',9,'change_ministry'),(35,'Can delete ministry',9,'delete_ministry'),(36,'Can view ministry',9,'view_ministry'),(37,'Can add plaza',10,'add_plaza'),(38,'Can change plaza',10,'change_plaza'),(39,'Can delete plaza',10,'delete_plaza'),(40,'Can view plaza',10,'view_plaza'),(41,'Can add road',11,'add_road'),(42,'Can change road',11,'change_road'),(43,'Can delete road',11,'delete_road'),(44,'Can view road',11,'view_road'),(45,'Can add user profile',12,'add_userprofile'),(46,'Can change user profile',12,'change_userprofile'),(47,'Can delete user profile',12,'delete_userprofile'),(48,'Can view user profile',12,'view_userprofile'),(49,'Can add vehicle',13,'add_vehicle'),(50,'Can change vehicle',13,'change_vehicle'),(51,'Can delete vehicle',13,'delete_vehicle'),(52,'Can view vehicle',13,'view_vehicle'),(53,'Can add transaction',14,'add_transaction'),(54,'Can change transaction',14,'change_transaction'),(55,'Can delete transaction',14,'delete_transaction'),(56,'Can view transaction',14,'view_transaction'),(57,'Can add rate',15,'add_rate'),(58,'Can change rate',15,'change_rate'),(59,'Can delete rate',15,'delete_rate'),(60,'Can view rate',15,'view_rate');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(7,'testing','authority'),(8,'testing','booth'),(9,'testing','ministry'),(10,'testing','plaza'),(15,'testing','rate'),(11,'testing','road'),(14,'testing','transaction'),(12,'testing','userprofile'),(13,'testing','vehicle');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-07-31 13:59:45.995504'),(2,'auth','0001_initial','2020-07-31 13:59:52.716436'),(3,'admin','0001_initial','2020-07-31 14:00:18.350403'),(4,'admin','0002_logentry_remove_auto_add','2020-07-31 14:00:25.933578'),(5,'admin','0003_logentry_add_action_flag_choices','2020-07-31 14:00:26.350024'),(6,'contenttypes','0002_remove_content_type_name','2020-07-31 14:00:31.392564'),(7,'auth','0002_alter_permission_name_max_length','2020-07-31 14:00:33.797744'),(8,'auth','0003_alter_user_email_max_length','2020-07-31 14:00:34.469271'),(9,'auth','0004_alter_user_username_opts','2020-07-31 14:00:34.583667'),(10,'auth','0005_alter_user_last_login_null','2020-07-31 14:00:36.271839'),(11,'auth','0006_require_contenttypes_0002','2020-07-31 14:00:36.356530'),(12,'auth','0007_alter_validators_add_error_messages','2020-07-31 14:00:36.472516'),(13,'auth','0008_alter_user_username_max_length','2020-07-31 14:00:39.447519'),(14,'auth','0009_alter_user_last_name_max_length','2020-07-31 14:00:45.575269'),(15,'auth','0010_alter_group_name_max_length','2020-07-31 14:00:45.891444'),(16,'auth','0011_update_proxy_permissions','2020-07-31 14:00:45.976217'),(17,'sessions','0001_initial','2020-07-31 14:00:46.793622'),(18,'testing','0001_initial','2020-07-31 14:01:01.080690');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_authority`
--

DROP TABLE IF EXISTS `testing_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_authority` (
  `name` varchar(100) NOT NULL,
  `authority_id` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(350) NOT NULL,
  `token` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`authority_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_authority`
--

LOCK TABLES `testing_authority` WRITE;
/*!40000 ALTER TABLE `testing_authority` DISABLE KEYS */;
INSERT INTO `testing_authority` VALUES ('NRAI','ATH10','nrai@gmail.com','f6a4d95e926b9d2777baa97b99d231b320e3a90d189ee76a2ccbb092a54e481b','b\'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Im5yYWlAZ21haWwuY29tIiwidXNlcl90eXBlIjoiYXV0aG9yaXR5In0.tMvMdSxiM_KruQdcpteqp3qdal-LlMCRlPcGHphyfg0\'',1),('NHAI','ATH11','nhai@gmail.com','0a6f9b82d0eb0a4d41c574ea66f821d180e0cd79fa02017f735101a2bd6890d2','',1);
/*!40000 ALTER TABLE `testing_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_booth`
--

DROP TABLE IF EXISTS `testing_booth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_booth` (
  `name` varchar(100) NOT NULL,
  `booth_id` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(350) NOT NULL,
  `total_collection` varchar(100) NOT NULL,
  `token` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `authority_id_id` varchar(100) NOT NULL,
  `plaza_id_id` varchar(100) NOT NULL,
  `road_id_id` varchar(100) NOT NULL,
  PRIMARY KEY (`booth_id`),
  UNIQUE KEY `email` (`email`),
  KEY `testing_booth_authority_id_id_6987b3ea_fk_testing_a` (`authority_id_id`),
  KEY `testing_booth_plaza_id_id_a97712c5_fk_testing_plaza_plaza_id` (`plaza_id_id`),
  KEY `testing_booth_road_id_id_122fd068_fk_testing_road_road_id` (`road_id_id`),
  CONSTRAINT `testing_booth_authority_id_id_6987b3ea_fk_testing_a` FOREIGN KEY (`authority_id_id`) REFERENCES `testing_authority` (`authority_id`),
  CONSTRAINT `testing_booth_plaza_id_id_a97712c5_fk_testing_plaza_plaza_id` FOREIGN KEY (`plaza_id_id`) REFERENCES `testing_plaza` (`plaza_id`),
  CONSTRAINT `testing_booth_road_id_id_122fd068_fk_testing_road_road_id` FOREIGN KEY (`road_id_id`) REFERENCES `testing_road` (`road_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_booth`
--

LOCK TABLES `testing_booth` WRITE;
/*!40000 ALTER TABLE `testing_booth` DISABLE KEYS */;
INSERT INTO `testing_booth` VALUES ('booth1','RD12-ATH11-PL11-BTH10','booth1@gmail.com','3dd915acf179ec9358b79c9903aff6a17e9ed65657a71d0428bd1b4ca18bfb36','215.0','',1,'ATH11','RD12-ATH11-PL11','RD12'),('booth2','RD12-ATH11-PL11-BTH11','booth2@gmail.com','6d2b42826ea89ac4f59fd55b16ea3641a9e05dea7ac9e767315bff991c9a4f39','0','b\'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImJvb3RoMkBnbWFpbC5jb20iLCJ1c2VyX3R5cGUiOiJwbGF6YSJ9.xFuIlgVY-K0ODKJ_YXKqnUd9OzDC6q_kkJ-_kh1ZzLQ\'',1,'ATH11','RD12-ATH11-PL11','RD12');
/*!40000 ALTER TABLE `testing_booth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_ministry`
--

DROP TABLE IF EXISTS `testing_ministry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_ministry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(350) NOT NULL,
  `token` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_ministry`
--

LOCK TABLES `testing_ministry` WRITE;
/*!40000 ALTER TABLE `testing_ministry` DISABLE KEYS */;
INSERT INTO `testing_ministry` VALUES (1,'MHRD','ministry@gmail.com','0ec99078e538c33050f7902064f3c203eac239077dddd511d2274ebdbd8962b4','',1);
/*!40000 ALTER TABLE `testing_ministry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_plaza`
--

DROP TABLE IF EXISTS `testing_plaza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_plaza` (
  `name` varchar(100) NOT NULL,
  `plaza_id` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(350) NOT NULL,
  `location` varchar(100) NOT NULL,
  `total_collection` varchar(100) NOT NULL,
  `token` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `authority_id_id` varchar(100) NOT NULL,
  `road_id_id` varchar(100) NOT NULL,
  PRIMARY KEY (`plaza_id`),
  UNIQUE KEY `email` (`email`),
  KEY `testing_plaza_authority_id_id_091b3f71_fk_testing_a` (`authority_id_id`),
  KEY `testing_plaza_road_id_id_0254fe5b_fk_testing_road_road_id` (`road_id_id`),
  CONSTRAINT `testing_plaza_authority_id_id_091b3f71_fk_testing_a` FOREIGN KEY (`authority_id_id`) REFERENCES `testing_authority` (`authority_id`),
  CONSTRAINT `testing_plaza_road_id_id_0254fe5b_fk_testing_road_road_id` FOREIGN KEY (`road_id_id`) REFERENCES `testing_road` (`road_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_plaza`
--

LOCK TABLES `testing_plaza` WRITE;
/*!40000 ALTER TABLE `testing_plaza` DISABLE KEYS */;
INSERT INTO `testing_plaza` VALUES ('khed','RD12-ATH11-PL10','khed@gmail.com','6622b8400846098e8521d35763eb93eb9553e1c595dcd0668ad09941306299b6','bangalore hwy','0','b\'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImtoZWRAZ21haWwuY29tIiwidXNlcl90eXBlIjoicGxhemEifQ.dhlfhVX1bt9d_xnM7SkRmWkFqK0-N4gKKnv9sSeV5Tk\'',1,'ATH11','RD12'),('ooty','RD12-ATH11-PL11','ooty@gmail.com','4d9ed5d2733c6843169a1506c9a6c25d2f3088db8dbe047eb337c10c30078b0f','ooty east highway','215.0','',1,'ATH11','RD12');
/*!40000 ALTER TABLE `testing_plaza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_rate`
--

DROP TABLE IF EXISTS `testing_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_rate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `car_rate` double NOT NULL,
  `lcv_rate` double NOT NULL,
  `truck_rate` double NOT NULL,
  `bus_rate` double NOT NULL,
  `plaza_id_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plaza_id_id` (`plaza_id_id`),
  CONSTRAINT `testing_rate_plaza_id_id_fd3418b8_fk_testing_plaza_plaza_id` FOREIGN KEY (`plaza_id_id`) REFERENCES `testing_plaza` (`plaza_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_rate`
--

LOCK TABLES `testing_rate` WRITE;
/*!40000 ALTER TABLE `testing_rate` DISABLE KEYS */;
INSERT INTO `testing_rate` VALUES (1,35,180,120,55,'RD12-ATH11-PL11');
/*!40000 ALTER TABLE `testing_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_road`
--

DROP TABLE IF EXISTS `testing_road`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_road` (
  `start` varchar(100) NOT NULL,
  `end` varchar(100) NOT NULL,
  `contract_duration` varchar(100) NOT NULL,
  `contract_amount` double NOT NULL,
  `collected_amount` double NOT NULL,
  `road_id` varchar(100) NOT NULL,
  `authority_id` varchar(100) NOT NULL,
  PRIMARY KEY (`road_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_road`
--

LOCK TABLES `testing_road` WRITE;
/*!40000 ALTER TABLE `testing_road` DISABLE KEYS */;
INSERT INTO `testing_road` VALUES ('pune','mumbai','3,7',45112,0,'RD10',''),('Ahmedabad','Vapi','4,6',601124,0,'RD11',''),('chennai','trivandrum','5,6',559237,215,'RD12','ATH11'),('ladakh','shimla','2,9',57673,0,'RD13','ATH10');
/*!40000 ALTER TABLE `testing_road` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_transaction`
--

DROP TABLE IF EXISTS `testing_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` varchar(100) NOT NULL,
  `vehicle_type` varchar(100) NOT NULL,
  `amount` double NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `authority_id_id` varchar(100) NOT NULL,
  `booth_id_id` varchar(100) NOT NULL,
  `plaza_id_id` varchar(100) NOT NULL,
  `road_id_id` varchar(100) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `testing_transaction_authority_id_id_f5ea89b2_fk_testing_a` (`authority_id_id`),
  KEY `testing_transaction_booth_id_id_9e5a679d_fk_testing_b` (`booth_id_id`),
  KEY `testing_transaction_plaza_id_id_1d7ccf04_fk_testing_p` (`plaza_id_id`),
  KEY `testing_transaction_road_id_id_2292c9b6_fk_testing_road_road_id` (`road_id_id`),
  CONSTRAINT `testing_transaction_authority_id_id_f5ea89b2_fk_testing_a` FOREIGN KEY (`authority_id_id`) REFERENCES `testing_authority` (`authority_id`),
  CONSTRAINT `testing_transaction_booth_id_id_9e5a679d_fk_testing_b` FOREIGN KEY (`booth_id_id`) REFERENCES `testing_booth` (`booth_id`),
  CONSTRAINT `testing_transaction_plaza_id_id_1d7ccf04_fk_testing_p` FOREIGN KEY (`plaza_id_id`) REFERENCES `testing_plaza` (`plaza_id`),
  CONSTRAINT `testing_transaction_road_id_id_2292c9b6_fk_testing_road_road_id` FOREIGN KEY (`road_id_id`) REFERENCES `testing_road` (`road_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_transaction`
--

LOCK TABLES `testing_transaction` WRITE;
/*!40000 ALTER TABLE `testing_transaction` DISABLE KEYS */;
INSERT INTO `testing_transaction` VALUES (1,'MH 12 EN 1234','car',35,'2020-07-31 17:20:48.746690','ATH11','RD12-ATH11-PL11-BTH10','RD12-ATH11-PL11','RD12'),(2,'MH 12 EN 5678','LCV',180,'2020-07-31 17:21:06.089287','ATH11','RD12-ATH11-PL11-BTH10','RD12-ATH11-PL11','RD12');
/*!40000 ALTER TABLE `testing_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_userprofile`
--

DROP TABLE IF EXISTS `testing_userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_userprofile` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `mobile_number` varchar(12) NOT NULL,
  `password` varchar(350) NOT NULL,
  `token` varchar(300) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`mobile_number`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_userprofile`
--

LOCK TABLES `testing_userprofile` WRITE;
/*!40000 ALTER TABLE `testing_userprofile` DISABLE KEYS */;
INSERT INTO `testing_userprofile` VALUES ('ninad','manjaramkar','ninad@gmail.com','customer','8983012308','dbda18f3f9daef0f786a4c0c1a444c40764806b3cce1cbcf45dfb45d9abb6273','',1);
/*!40000 ALTER TABLE `testing_userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_vehicle`
--

DROP TABLE IF EXISTS `testing_vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing_vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicle_name` varchar(100) NOT NULL,
  `vehicle_id` varchar(100) NOT NULL,
  `vehicle_type` varchar(100) NOT NULL,
  `balance` double NOT NULL,
  `mobile_number_id` varchar(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicle_id` (`vehicle_id`),
  KEY `testing_vehicle_mobile_number_id_e5719b40_fk_testing_u` (`mobile_number_id`),
  CONSTRAINT `testing_vehicle_mobile_number_id_e5719b40_fk_testing_u` FOREIGN KEY (`mobile_number_id`) REFERENCES `testing_userprofile` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_vehicle`
--

LOCK TABLES `testing_vehicle` WRITE;
/*!40000 ALTER TABLE `testing_vehicle` DISABLE KEYS */;
INSERT INTO `testing_vehicle` VALUES (1,'maruti baleno','MH 12 EN 1234','car',465,'8983012308'),(2,'tata ace','MH 12 EN 5678','LCV',220,'8983012308');
/*!40000 ALTER TABLE `testing_vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-31 22:59:16
