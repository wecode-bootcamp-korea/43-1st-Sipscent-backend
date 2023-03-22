-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: sipscent
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `user_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_id` (`item_id`,`user_id`),
  KEY `carts_user_id_fkey` (`user_id`),
  CONSTRAINT `carts_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Floral'),(2,'Herbal'),(3,'Citrus'),(4,'Fruity'),(5,'Green'),(6,'Spicy');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_description`
--

DROP TABLE IF EXISTS `category_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_description` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_title` varchar(1000) NOT NULL,
  `category_description` varchar(1000) NOT NULL,
  `item_type_id` int DEFAULT NULL,
  `categories_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_description_item_type_id` (`item_type_id`),
  KEY `category_description_categories_id` (`categories_id`),
  CONSTRAINT `category_description_categories_id` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `category_description_item_type_id` FOREIGN KEY (`item_type_id`) REFERENCES `item_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_description`
--

LOCK TABLES `category_description` WRITE;
/*!40000 ALTER TABLE `category_description` DISABLE KEYS */;
INSERT INTO `category_description` VALUES (1,'우리 선조들은 계절마다 피고 지는 꽃을 이용해 만든 꽃차를 곁에 두고 삶의 멋을 노래했다.','꽃은 가정의 입맛을 돋워주는 먹을거리의 재료로, 혹은 피로를 풀어주고 마음을 안정시켜 주는 향기로운 꽃차로 변주되고 있다.',1,1),(2,'테이블 위에 소박하게 놓인 찻잔이 차를 마시는 사람을 기다린다.','티타임에 따라 찻잔의 재질은 달라질 수 있는데, 화려한 꽃무늬에서 심플한 디자인과 금박무늬까지 종류도 다양하다. 영국에서는 아침에 머그컵에 간편하게 밀크티를 즐기기도 한다.',2,1),(3,'향기로운 삶을 연출하는 허브 & 아로마 라이프','허브 티는 분위기와 몸의 컨디션에 따라 2, 3종류를 섞어 마시면 다양한 맛과 향을 즐기면서 효과도 배가할 수 있다.',1,2),(4,'오늘날의 홍차용 찻잔은 대개 잔과 받침인 소서(saucer)가 결합된 형태로, 초기의 찻잔과는 다른 모양이다.','차의 고운 빛깔을 유지할 수 있도록 깨끗한 도자기 재질로 만들어져야 하고, 뜨거운 찻잔을 안전하게 들 수 있도록 손잡이가 붙어 있어야 한다.',2,2),(5,'상상만으로도 눈이 찡긋 감기고 침이 고이는 상큼한 향','영국에서는 레몬티를 \'러시안 티\'라고도 부른다. 빅토리아 여왕이 러시아를 방문했을 때 레몬이 든 홍차를 대접받고 귀국하여 \'러시아의 홍차 속에는 레몬이 들어 있었다\'고 전한 것이 유래가 되었다.',1,3),(6,'기본적으로 차는 뜨거운 음료이기 때문에 100℃의 온도에 견딜 수 있도록 되어 있다.','낮고 벌어진 형태의 찻잔, 입술 닿는 부분이 얇고 가벼운 본차이나 재질의 찻잔이 선호된다.',2,3);
/*!40000 ALTER TABLE `category_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_sizes`
--

DROP TABLE IF EXISTS `item_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teabag_size` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_sizes`
--

LOCK TABLES `item_sizes` WRITE;
/*!40000 ALTER TABLE `item_sizes` DISABLE KEYS */;
INSERT INTO `item_sizes` VALUES (1,'15'),(2,'18'),(3,'21'),(4,'22'),(5,'23');
/*!40000 ALTER TABLE `item_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_types`
--

DROP TABLE IF EXISTS `item_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_types`
--

LOCK TABLES `item_types` WRITE;
/*!40000 ALTER TABLE `item_types` DISABLE KEYS */;
INSERT INTO `item_types` VALUES (1,'티백'),(2,'찻잔');
/*!40000 ALTER TABLE `item_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `item_type_id` int NOT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(1000) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `description` varchar(100) NOT NULL,
  `size_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `items_item_types_id_fkey` (`item_type_id`),
  KEY `items_category_id_fkey` (`category_id`),
  KEY `items_size_id_fkey` (`size_id`),
  CONSTRAINT `items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `items_item_types_id_fkey` FOREIGN KEY (`item_type_id`) REFERENCES `item_types` (`id`),
  CONSTRAINT `items_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `item_sizes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'로즈',1,1,'https://images.unsplash.com/photo-1608036586781-26f0d5debbee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',29000.00,'오월에 장미가 꽃필 무렵 마을에 퍼지는 화려하고 그윽한 향을 선사하는 차',1,'2023-03-08 07:59:31',NULL),(2,'자스민',1,1,'https://images.unsplash.com/photo-1467164616789-ce7ae65ab4c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',31000.00,'비 내린 뒤의 풍경처럼 차분하고 안개처럼 은은함을 선물하는 차',2,'2023-03-08 08:01:15',NULL),(3,'은방울꽃',1,1,'https://images.unsplash.com/photo-1597620141633-81170e16af34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',33000.00,'하늘 속 구름처럼 우아하고 종이 울리는 소리가 들리는 듯한 차',3,'2023-03-08 08:02:12',NULL),(4,'라일락',1,1,'https://images.unsplash.com/photo-1454678993613-d4fc4bd5f496?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',35000.00,'보랏빛 향이 길가에 퍼지는 기분을 느낄 수 있는 차',4,'2023-03-08 08:06:05',NULL),(5,'벚꽃',1,1,'https://images.unsplash.com/photo-1553276045-1b0d2bb2ef1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80',38000.00,'꽃잎처럼 부드럽고 달콤한 향이 감도는 차',5,'2023-03-08 08:07:04',NULL),(6,'라벤더',1,2,'https://images.unsplash.com/photo-1591471624776-ae54770a84b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',27000.00,'차분하게 집중이 필요하거나 깊은 생각이 필요할 때 어우러지는 차',1,'2023-03-08 08:08:22',NULL),(7,'로즈마리',1,2,'https://images.unsplash.com/photo-1623170396104-e3e13545423c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',30000.00,'은은한 로즈마리 향과 열매의 향으로 화사한 오후를 보낼 수 있는 차 한 잔',2,'2023-03-08 08:09:27',NULL),(8,'페퍼민트',1,2,'https://images.unsplash.com/photo-1530536306355-1bd7a4113d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',34000.00,'은은한 민트와 리프레시 할 수 있는 상쾌감을 주는 고급스러움',3,'2023-03-08 08:10:46',NULL),(9,'루이보스',1,2,'https://images.unsplash.com/photo-1620490448396-d03342d5f352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',36000.00,'남아프리카의 루이보스에 상큼한 열대과일과 은은한 커피향을 더한 풍부한 향',4,'2023-03-08 08:11:54',NULL),(10,'히비스커스',1,2,'https://images.unsplash.com/photo-1596710629144-6f6abf933384?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',37000.00,'상큼한 히비스커스에 열매가 더해져 화사한 기분을 선사하는 차',5,'2023-03-08 08:13:00',NULL),(11,'레몬',1,3,'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',28000.00,'입안에 햇빛이 머무는 듯한 예쁜 노란색의 차',1,'2023-03-08 08:13:49',NULL),(12,'자몽',1,3,'https://images.unsplash.com/photo-1556804335-2fa563e93aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',29000.00,'자몽의 싱그러움에 달콤쌉싸름한 맛을 더한 차',2,'2023-03-08 08:14:37',NULL),(13,'만다린',1,3,'https://images.unsplash.com/photo-1668603486663-5fd96b778391?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',31000.00,'나무와 숙성하여 더욱 부드럽고 귤의 싱그러움을 더한 차',3,'2023-03-08 08:15:21',NULL),(14,'오렌지',1,3,'https://images.unsplash.com/photo-1604298520021-9819622d0704?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',33000.00,'싱그러운 아침을 맞이할 때 오렌지의 상큼함을 더한 차',4,'2023-03-08 08:16:05','2023-03-08 08:17:16'),(15,'베르가못',1,3,'https://images.unsplash.com/photo-1589881132856-bd1a4af0ce4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80',34000.00,'열대과일의 향긋함을 품은 차',5,'2023-03-08 08:19:08',NULL),(16,'화이트도티드',2,1,'https://images.unsplash.com/photo-1610292897006-8b46ac00bca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',49000.00,'흰 바탕에 점무늬가 반복되는 심플함을 담은 찻잔',NULL,'2023-03-08 08:29:07',NULL),(17,'블루로벨리아',2,1,'https://images.unsplash.com/photo-1580666622398-d5bffc4c9051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',52000.00,'로벨리아 꽃이 연상되는 푸른색 바탕의 찻잔',NULL,'2023-03-08 08:30:53',NULL),(18,'펌킨플라이',2,1,'https://images.unsplash.com/photo-1616371041303-a468ea826828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',47000.00,'호박색 나비가 날아가는 듯한 모습의 찻잔',NULL,'2023-03-08 08:31:49',NULL),(19,'윈드리스',2,2,'https://images.unsplash.com/photo-1583531840065-c67079d47136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',59000.00,'잔잔한 꽃무늬가 편안함을 주는 찻잔',NULL,'2023-03-08 08:32:47',NULL),(20,'터키웨이브',2,2,'https://images.unsplash.com/photo-1619633385996-439ab98ddd79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',51000.00,'터키색의 화려한 물결 무늬가 있는 찻잔\n',NULL,'2023-03-08 08:33:37',NULL),(21,'컨트래스트',2,2,'https://images.unsplash.com/photo-1630543378528-10043e324452?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',55000.00,'빨강, 초록의 대비되는 색상이 선명한 찻잔',NULL,'2023-03-08 08:34:29',NULL),(22,'패시내이트',2,3,'https://images.unsplash.com/photo-1421986872218-300a0fea5895?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',53000.00,'눈길을 사로잡는 강렬한 매력의 찻잔',NULL,'2023-03-08 08:35:19',NULL),(23,'잉글리시하트',2,3,'https://images.unsplash.com/photo-1447949122973-9711a09951d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',43000.00,'오후에 잉글랜드 애프터눈 티를 하기에 적합한 찻잔',NULL,'2023-03-08 08:36:07',NULL),(24,'우드인센스',2,3,'https://images.unsplash.com/photo-1517241165176-52610c81d064?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',48000.00,'갈색 나무 테이블에 잘 어울리는 찻잔',NULL,'2023-03-08 08:36:55',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_tasting_notes`
--

DROP TABLE IF EXISTS `items_tasting_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_tasting_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `tasting_note_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `items_tasting_notes_item_id_fkey` (`item_id`),
  KEY `items_tasting_notes_tasting_note_id_fkey` (`tasting_note_id`),
  CONSTRAINT `items_tasting_notes_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `items_tasting_notes_tasting_note_id_fkey` FOREIGN KEY (`tasting_note_id`) REFERENCES `tasting_notes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_tasting_notes`
--

LOCK TABLES `items_tasting_notes` WRITE;
/*!40000 ALTER TABLE `items_tasting_notes` DISABLE KEYS */;
INSERT INTO `items_tasting_notes` VALUES (1,1,3),(2,1,8),(3,2,4),(4,2,9),(5,3,6),(6,3,7),(7,4,2),(8,4,6),(9,5,1),(10,5,10),(11,6,8),(12,6,9),(13,7,4),(14,7,6),(15,8,4),(16,8,7),(17,9,4),(18,9,5),(19,10,5),(20,10,6),(21,11,5),(22,11,6),(23,12,2),(24,12,5),(25,13,1),(26,13,10),(27,14,1),(28,14,2),(29,15,3),(30,15,5);
/*!40000 ALTER TABLE `items_tasting_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `item_quantity` int NOT NULL,
  `order_id` int NOT NULL,
  `order_status_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_items_item_id_fkey` (`item_id`),
  KEY `order_items_order_id_fkey` (`order_id`),
  KEY `orders_items_order_status_id_fkey` (`order_status_id`),
  CONSTRAINT `order_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orders_items_order_status_id_fkey` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'결제완료'),(2,'상품준비중'),(3,'배송대기중'),(4,'출고완료'),(5,'배송중'),(6,'배송완료');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `user_phone_number` varchar(30) NOT NULL,
  `user_address` varchar(100) NOT NULL,
  `total_price` decimal(8,2) NOT NULL,
  `order_number` varchar(100) NOT NULL,
  `order_status_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_fkey` (`user_id`),
  KEY `orders_order_status_id_fkey` (`order_status_id`),
  CONSTRAINT `orders_order_status_id_fkey` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`),
  CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20230308061835'),('20230308061953'),('20230308062032'),('20230308062106'),('20230308062316'),('20230308064316'),('20230308064347'),('20230308064417'),('20230308064437'),('20230308064503'),('20230308064525'),('20230313021254');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasting_notes`
--

DROP TABLE IF EXISTS `tasting_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasting_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasting_notes`
--

LOCK TABLES `tasting_notes` WRITE;
/*!40000 ALTER TABLE `tasting_notes` DISABLE KEYS */;
INSERT INTO `tasting_notes` VALUES (1,'달콤한'),(2,'싱그러운'),(3,'화려한'),(4,'은은한'),(5,'상큼한'),(6,'화사한'),(7,'우아한'),(8,'그윽한'),(9,'차분한'),(10,'부드러운');
/*!40000 ALTER TABLE `tasting_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `point` decimal(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-20 17:21:17
