/*
Navicat MySQL Data Transfer

Source Server         : Hello
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : schoolbuy

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2017-12-26 16:55:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productid` int(40) NOT NULL AUTO_INCREMENT,
  `imgpath` varchar(40) NOT NULL,
  `price` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `product_type` varchar(10) NOT NULL,
  `uploadtime` date NOT NULL,
  `detail` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`productid`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=16610399 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('16610300', '78829998-8037-489f-9c52-3fa10fc9216c.jpg', '456', '1', '0', '2017-03-16', '1111');
INSERT INTO `product` VALUES ('16610302', '2259e0c7-79b0-4538-9cd1-647347a8a6b2.jpg', '456', '1', '0', '2017-03-16', '222');
INSERT INTO `product` VALUES ('16610303', '0e9fc4e0-ab3a-423d-a8ab-c0a150848446.jpg', '456', '1', '0', '2017-03-16', '333');
INSERT INTO `product` VALUES ('16610305', '9da17b74-2e6c-4942-9079-20cc7b8411b7.jpg', '456', '1', '0', '2017-03-16', '5555');
INSERT INTO `product` VALUES ('16610306', '804f9211-314a-4475-ac3c-7f9b2f94c575.jpg', '78954', '1', '0', '2017-03-16', '6666');
INSERT INTO `product` VALUES ('16610309', 'c1349a69-b3a5-456d-b760-8d9ad29f67de.png', '111', '1', '1', '2017-03-16', '66666');
INSERT INTO `product` VALUES ('16610310', '22b9b18c-cbd8-48e3-a5e9-c359b4eea636.png', '111', '1', '1', '2017-03-16', '77777');
INSERT INTO `product` VALUES ('16610311', '77284aee-4068-4443-a0a3-697308156c94.png', '111', '1', '1', '2017-03-16', '88888');
INSERT INTO `product` VALUES ('16610312', 'c7ab4d46-c34b-45ab-a5d9-050673006046.png', '123', '1', '1', '2017-03-16', '99999');
INSERT INTO `product` VALUES ('16610313', '54b6cf6c-9e4e-4140-a674-2f63088d8385.png', '11', '1', '1', '2017-03-16', '1010101');
INSERT INTO `product` VALUES ('16610319', '6a669baa-3520-44dd-bab6-f984b4b2ee96.jpg', '456', '1', '0', '2017-03-17', '78954');
INSERT INTO `product` VALUES ('16610320', '2b993ca4-f275-420d-85e0-a11a62f7f011.jpg', '1234567', '1', '0', '2017-03-17', '7456');
INSERT INTO `product` VALUES ('16610321', 'd4d66054-3ae0-474e-b156-729e4f562bf5.jpg', '8745', '1', '1', '2017-03-17', '995');
INSERT INTO `product` VALUES ('16610322', '516b3034-394f-4c84-9750-0c53856ce870.jpg', '784', '1', '0', '2017-03-17', '567');
INSERT INTO `product` VALUES ('16610323', '68832618-a23d-4be0-96b0-86a4b9ebc2eb.jpg', '1111', '1', '1', '2017-03-17', '反反复复');
INSERT INTO `product` VALUES ('16610324', '942065c8-a5d9-4dcb-a329-ef91b3731ba3.png', '998', '1', '1', '2017-03-19', '呆萌');
INSERT INTO `product` VALUES ('16610325', '6c0eee68-e533-4588-9090-f95bf8f29d31.png', '123', '1', '0', '2017-03-19', '12311!!!!!');
INSERT INTO `product` VALUES ('16610326', '709159f9-1cab-4e9a-bf30-d22a44d856da.jpg', '998', '1', '0', '2017-03-20', '手套');
INSERT INTO `product` VALUES ('16610327', 'e52dbea3-de9e-4ea3-87da-dedfa71196d5.png', '123', '1', '0', '2017-03-23', '7765');
INSERT INTO `product` VALUES ('16610328', '6a548384-d729-4452-b480-5e05f9553a28.png', '123', '1', '1', '2017-03-28', '23444dddddd');
INSERT INTO `product` VALUES ('16610329', '277702f1-0832-458b-8d64-fa4c64fddb8f.png', '234', '1', '1', '2017-03-28', 'ffffffffffffffff');
INSERT INTO `product` VALUES ('16610330', '61dc01e3-22c1-4c1c-8e65-6234707a38f6.png', '234', '1', '1', '2017-03-28', 'fflllllll');
INSERT INTO `product` VALUES ('16610331', '0aa8f89e-8c79-41d8-9f12-d555ebe879be.png', '123', '1', '0', '2017-03-28', '345222222');
INSERT INTO `product` VALUES ('16610332', 'b3b1f332-b5cf-4fdc-83eb-b2ef85cbd8c2.png', '788', '1', '0', '2017-03-28', '这是一个好东西啊');
INSERT INTO `product` VALUES ('16610333', 'eb7af94b-700e-4270-9e5c-3c81f78d1c00.png', '456', '1', '0', '2017-03-28', '好东西。。。。yes');
INSERT INTO `product` VALUES ('16610334', 'f3a6108e-db2b-4979-8609-5f02e2c2f43f.png', '110', '1', '0', '2017-03-28', '345');
INSERT INTO `product` VALUES ('16610335', 'c04319ea-a50a-4a0d-98be-9caef6815634.png', '1109', '1', '1', '2017-03-28', '你好。。。。。');
INSERT INTO `product` VALUES ('16610336', '0f131f1c-9529-4790-88f3-0943865884c3.png', '123', '1', '0', '2017-03-28', '00000000');
INSERT INTO `product` VALUES ('16610337', 'ac0556c5-1166-4049-a77e-cf02650ac1ab.png', '233', '1', '0', '2017-03-28', '徐嘉诚');
INSERT INTO `product` VALUES ('16610338', '52a0d5b5-9f3a-4001-b69a-afcd4a630a90.png', '322', '1', '1', '2017-03-28', '请求请求群群群群群群群群群');
INSERT INTO `product` VALUES ('16610339', '5fdf184c-b947-4d3e-acf3-be0d55f74570.png', '11045', '1', '1', '2017-03-28', '3456吞吞吐吐拖拖拖拖拖拖拖');
INSERT INTO `product` VALUES ('16610340', 'd4ee9283-778f-4c7f-9685-57080cdfd0ef.png', '123', '1', '0', '2017-03-28', '3456');
INSERT INTO `product` VALUES ('16610341', '3499e596-0d02-4937-af75-fa2910b5a796.png', '234', '1', '1', '2017-03-28', '');
INSERT INTO `product` VALUES ('16610342', 'f5140e54-29fa-4d38-9cfe-2fe10b1b164b.png', '123', '1', '1', '2017-03-28', 'wwwwwwwwwwwwwww');
INSERT INTO `product` VALUES ('16610343', '307e5cbf-3c83-4183-a01c-112810855840.png', '0', '1', '1', '2017-03-28', '3455555555555555');
INSERT INTO `product` VALUES ('16610344', '1124aa80-7507-4546-8976-cb39408cc389.png', '12', '1', '1', '2017-03-28', '2334');
INSERT INTO `product` VALUES ('16610345', '3eb8114e-633b-47f1-a109-04ce70627e4c.png', '12', '1', '1', '2017-03-28', '234');
INSERT INTO `product` VALUES ('16610346', '5711b3d6-1814-4bc1-bfa0-16f4cdcc9904.png', '12', '1', '0', '2017-03-29', '好可怕啊');
INSERT INTO `product` VALUES ('16610347', 'd599bb29-1a77-46a1-97ce-a3d3bc3b45e5.jpg', '123', '1', '0', '2017-03-29', '456');
INSERT INTO `product` VALUES ('16610371', 'd8b60b54-0535-4f05-bd28-3de97f35248e.jpg', '120', '1e35827b13f74ca683ca57f05c30ffc7', '1', '2017-04-14', '这是一张极其54大的床单，我的床单，沸点');
INSERT INTO `product` VALUES ('16610380', '7fc60093-04d1-4678-b1c2-4094203342ff.png', '166', '1e35827b13f74ca683ca57f05c30ffc7', '0', '2017-04-15', '好东西');
INSERT INTO `product` VALUES ('16610385', 'ac7a0fe8-7fb7-44ef-ae5e-a6f0a5369c7e.png', '123', '157264d1c8e543ddbbf6184436d0ceba', '0', '2017-04-24', '345');
INSERT INTO `product` VALUES ('16610386', '5008881e-10e6-4070-a3f1-91b754647641.png', '123', '157264d1c8e543ddbbf6184436d0ceba', '0', '2017-04-24', '456');
INSERT INTO `product` VALUES ('16610387', 'f346a06c-3f04-47db-9091-1572a66d7cf7.png', '12', '157264d1c8e543ddbbf6184436d0ceba', '0', '2017-04-24', 'www');
INSERT INTO `product` VALUES ('16610388', 'f76f55e1-2b20-4159-8e6e-d8d8df1e8794.png', '12', '157264d1c8e543ddbbf6184436d0ceba', '0', '2017-04-24', '66');
INSERT INTO `product` VALUES ('16610389', '11aa1aff-19a6-4a0f-9ce9-4301a49d4363.png', '12', '157264d1c8e543ddbbf6184436d0ceba', '1', '2017-04-24', 'we');
INSERT INTO `product` VALUES ('16610390', 'b855a8f4-89b2-4172-9b5e-476f48d28e30.png', '123', '157264d1c8e543ddbbf6184436d0ceba', '1', '2017-04-24', '234');
INSERT INTO `product` VALUES ('16610391', '963c6da1-be2a-4908-8acb-4c6f1b764e81.png', '123', '157264d1c8e543ddbbf6184436d0ceba', '0', '2017-04-24', '省道');
INSERT INTO `product` VALUES ('16610392', 'b38ea8f3-5ed2-469e-a978-a7d37b61b4ac.png', '12', '157264d1c8e543ddbbf6184436d0ceba', '1', '2017-04-24', '1');
INSERT INTO `product` VALUES ('16610393', '7ba767dc-587e-47c6-ad58-9fc9e7117d17.png', '123', '157264d1c8e543ddbbf6184436d0ceba', '1', '2017-04-24', '345');
INSERT INTO `product` VALUES ('16610394', '85c56bc9-e221-4ee9-8649-43247df7f210.png', '1', '157264d1c8e543ddbbf6184436d0ceba', '1', '2017-04-24', '2');
INSERT INTO `product` VALUES ('16610395', '57e44c9e-71e1-4ebe-b7a9-a4bb25f5e660.png', '1', '7b1620e5c06044a79e1847a85083a3ff', '1', '2017-04-24', '2');
INSERT INTO `product` VALUES ('16610396', 'f0bec2fa-4daa-492c-9c8e-9326c468c030.png', '1', '7b1620e5c06044a79e1847a85083a3ff', '0', '2017-04-24', '2');
INSERT INTO `product` VALUES ('16610397', 'ac9dd624-8344-4734-8a3f-5b25820cd4d2.png', '12', '7b1620e5c06044a79e1847a85083a3ff', '1', '2017-04-24', '好东西啊 乱码解决');
INSERT INTO `product` VALUES ('16610398', 'ef07865e-b110-4b6e-955a-c36fea6eb594.png', '12', '7b1620e5c06044a79e1847a85083a3ff', '0', '2017-04-24', '好东西啊');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` varchar(40) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `tel` varchar(15) NOT NULL,
  `head_path` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123', '南五', '10086', '');
INSERT INTO `user` VALUES ('157264d1c8e543ddbbf6184436d0ceba', 'helot', 'xujiacheng', '夜微凉', '18760917897', 'fa3889fb-2e46-4e31-9613-431dee56d81d.png');
INSERT INTO `user` VALUES ('1e35827b13f74ca683ca57f05c30ffc7', 'Tom', '123', '南五330', '18770917887', 'fbbc83d4-d56d-4563-8ce5-d63bc779b576.png');
INSERT INTO `user` VALUES ('2287caffb9364b7e949f17cc95fe2d60', '夜微凉', '123', '南五330', '15770917897', '8e71af5f-1f4a-41a0-8e08-3324aa32755b.png');
INSERT INTO `user` VALUES ('7b1620e5c06044a79e1847a85083a3ff', '夜半钟声', 'root', '南五', '10770917897', 'ece58018-6c18-4860-baea-c5a40c01b18d.png');
INSERT INTO `user` VALUES ('85ef7062643c45d7aacd13807b6f7f6b', '夜微凉', 'xjc', '南五330', '18700917897', 'mruserhead.png');
INSERT INTO `user` VALUES ('d4257d3b50d8442d845308c706f8de06', 'tom', '123', '南五330', '18770917899', 'mruserhead.png');
INSERT INTO `user` VALUES ('d87aec5b736941f0a4555cead326dcb8', 'jack', 'w', 'nan五', '18770907897', '98a0c04d-716f-424a-ab4c-c99f00e4a169.png');
INSERT INTO `user` VALUES ('eed2392f256443c1a0b722825943ab6c', 'ThinkGis', 'xjc', '南五330', '18770917897', 'mruserhead.png');
INSERT INTO `user` VALUES ('efc3fb500e5649988bb1b5addc6f0754', 'kkkk', 'liyuan19950215', '西二413', '18770918221', 'mruserhead.png');
