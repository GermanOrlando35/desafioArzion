CREATE DATABASE  IF NOT EXISTS `desafioarzion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `desafioarzion`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: desafioarzion
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateArmed` datetime NOT NULL,
  `minimartId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_686e18ebfefd4f55e338e16dc6` (`minimartId`),
  CONSTRAINT `FK_686e18ebfefd4f55e338e16dc60` FOREIGN KEY (`minimartId`) REFERENCES `minimart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,'2020-01-30 17:18:20',2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartproduct`
--

DROP TABLE IF EXISTS `cartproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartproduct` (
  `cartproduct_id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `cartId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`cartproduct_id`),
  KEY `FK_5e4f80a39116bd2d55da3c1c00b` (`cartId`),
  KEY `FK_cdba0847768d6d6ae1cd5e3302a` (`productId`),
  CONSTRAINT `FK_5e4f80a39116bd2d55da3c1c00b` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`),
  CONSTRAINT `FK_cdba0847768d6d6ae1cd5e3302a` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartproduct`
--

LOCK TABLES `cartproduct` WRITE;
/*!40000 ALTER TABLE `cartproduct` DISABLE KEYS */;
INSERT INTO `cartproduct` VALUES (1,1,2,1),(2,1,2,15);
/*!40000 ALTER TABLE `cartproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Sodas'),(2,'Food'),(3,'Cleaning'),(4,'Bathroom');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minimart`
--

DROP TABLE IF EXISTS `minimart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minimart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `workDays` enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo') NOT NULL,
  `openingTime` int NOT NULL,
  `closingTime` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minimart`
--

LOCK TABLES `minimart` WRITE;
/*!40000 ALTER TABLE `minimart` DISABLE KEYS */;
INSERT INTO `minimart` VALUES (1,'COCO Downtown','49 y 12','-','',8,22),(2,'COCO Bay','Punta Lara','-','',9,24),(3,'COCO Mall','57 555','-','',0,24);
/*!40000 ALTER TABLE `minimart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minimartproduct`
--

DROP TABLE IF EXISTS `minimartproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minimartproduct` (
  `minimartproduct_id` int NOT NULL AUTO_INCREMENT,
  `stock` int NOT NULL,
  `minimartId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`minimartproduct_id`),
  KEY `FK_a36e7a79fedbe85267db517f855` (`minimartId`),
  KEY `FK_238dcd0827a4e160100ae526453` (`productId`),
  CONSTRAINT `FK_238dcd0827a4e160100ae526453` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_a36e7a79fedbe85267db517f855` FOREIGN KEY (`minimartId`) REFERENCES `minimart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minimartproduct`
--

LOCK TABLES `minimartproduct` WRITE;
/*!40000 ALTER TABLE `minimartproduct` DISABLE KEYS */;
INSERT INTO `minimartproduct` VALUES (1,15,1,1),(2,23,1,2),(3,22,1,3),(4,18,1,6),(5,20,1,8),(6,19,1,10),(7,18,1,11),(8,18,1,20),(9,15,1,21),(10,20,2,1),(11,21,2,2),(12,14,2,4),(13,16,2,5),(14,18,2,7),(15,19,2,10),(16,20,2,19),(17,17,2,20),(18,16,2,21),(19,14,3,1),(20,14,3,2),(21,15,3,3),(22,20,3,5),(23,22,3,7),(24,7,3,8),(25,12,3,10),(26,11,3,15),(27,10,3,16);
/*!40000 ALTER TABLE `minimartproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pricing` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ff0c0301a95e517153df97f6812` (`categoryId`),
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Cold Ice Tea',70,'Cold Ice Tea',1),(2,'Coffee flavoured milk',75,'Coffee flavoured milk',1),(3,'Nuka-Cola',83,'Nuka-Cola',1),(4,'Sprute',80,'Sprute',1),(5,'Slurm',95,'Slurm',1),(6,'Diet Slurm',100,'Diet Slurm',1),(7,'Salsa Cookies',103,'Salsa Cookies',2),(8,'Windmill Cookies',110,'Windmill Cookies',2),(9,'Garlic-o-bread 2000',90,'Garlic-o-bread 2000',2),(10,'LACTEL bread',80,'LACTEL bread',2),(11,'Ravioloches x12',50,'Ravioloches x12',2),(12,'Ravioloches x48',70,'Ravioloches x48',2),(13,'Milanga ganga',120,'Milanga ganga',2),(14,'Milanga ganga napo',135,'Milanga ganga napo',2),(15,'Atlantis detergent',75,'Atlantis detergent',3),(16,'Virulanita',30,'Virulanita',3),(17,'Sponge, Bob',40,'Sponge, Bob',3),(18,'Generic mop',45,'Generic mop',3),(19,'Pure steel toilet paper',150,'Pure steel toilet paper',4),(20,'Generic soap',90,'Generic soap',4),(21,'PANTONE shampoo',120,'PANTONE shampoo',4),(22,'Hang-yourself toothpaste',110,'Hang-yourself toothpaste',4);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_voucher`
--

DROP TABLE IF EXISTS `products_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_voucher` (
  `product` int NOT NULL,
  `voucher` int NOT NULL,
  PRIMARY KEY (`voucher`,`product`),
  KEY `IDX_ab63feefb0ad89dc2a873b2e22` (`product`),
  KEY `IDX_2e818c2a11abea6f40cf4b19e8` (`voucher`),
  CONSTRAINT `FK_2e818c2a11abea6f40cf4b19e80` FOREIGN KEY (`voucher`) REFERENCES `voucher` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ab63feefb0ad89dc2a873b2e22a` FOREIGN KEY (`product`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_voucher`
--

LOCK TABLES `products_voucher` WRITE;
/*!40000 ALTER TABLE `products_voucher` DISABLE KEYS */;
INSERT INTO `products_voucher` VALUES (15,1),(16,1),(17,1),(18,1);
/*!40000 ALTER TABLE `products_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `validityPeriodFrom` datetime NOT NULL,
  `validityPeriodUntil` datetime NOT NULL,
  `discountRate` int DEFAULT NULL,
  `pay` int DEFAULT NULL,
  `make` int DEFAULT NULL,
  `maximumQuantity` int DEFAULT NULL,
  `discountedUnit` int DEFAULT NULL,
  `days` enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo') DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `minimartId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_e0ba3e96c9c76c159dd45a8582` (`type`),
  KEY `FK_a9944810fb27fb5c554759182d6` (`minimartId`),
  CONSTRAINT `FK_a9944810fb27fb5c554759182d6` FOREIGN KEY (`minimartId`) REFERENCES `minimart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,'COCO1V1F8XOG1MZZ','2020-01-27 23:46:05','2020-02-13 23:46:05',20,NULL,NULL,NULL,NULL,'Martes','Perday',2);
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-10  3:22:03
