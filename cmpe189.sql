CREATE DATABASE  IF NOT EXISTS `cmpe189` /*!40100 DEFAULT CHARACTER SET latin1 */;
-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2017 at 08:26 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cmpe189`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
`categoryId` int(12) NOT NULL,
  `categoryName` varchar(120) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'TV'),
(2, 'Tablet'),
(3, 'Laptop'),
(4, 'Smart Phone');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
`productId` int(12) NOT NULL,
  `categoryId` int(12) NOT NULL,
  `name` varchar(120) NOT NULL,
  `description` text,
  `price` decimal(12,2) NOT NULL,
  `quantity` int(12) DEFAULT NULL,
  `image1URL` varchar(6000) DEFAULT NULL,
  `image2URL` varchar(6000) DEFAULT NULL,
  `image3URL` varchar(6000) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `categoryId`, `name`, `description`, `price`, `quantity`, `image1URL`, `image2URL`, `image3URL`) VALUES
(20, 1, 'Samsung 55"', 'Flash LDE Guarantee 2 years', '500.00', 5, 'http://www.samsung.com/au/consumer-images/product/television/2013/UA55ES7500MXXY/features/UA55ES7500MXXY-11-0.jpg', NULL, NULL),
(21, 1, 'Samsung 60"', 'Flash LDE Guarantee 2 years', '700.00', 5, 'http://img.techmagnifier.com/uploads/2013/03/Samsung-D8000-Smart-TV-3.jpg', NULL, NULL),
(22, 1, 'Sony 60"', 'Flash LDE Guarantee 2 years', '700.00', 5, 'http://img.bbystatic.com/BestBuy_US/images/products/4801/4801600_rd.jpg', NULL, NULL),
(23, 1, 'LG 55"', 'Flash LDE Guarantee 2 years', '700.00', 5, 'https://s.s-bol.com/imgbase0/imagebase3/regular/FC/6/9/5/9/9200000031839596.jpg', NULL, NULL),
(24, 2, 'Apple Tablet', '12.9- Inch iPad Pro with Wi-Fi - 128GB - Silver', '700.00', 10, 'http://www.mokodirect.com/wp-content/uploads/2015/03/71wpMFLqHGL._SL1500_-1024x1024.jpg', NULL, NULL),
(25, 2, 'Android Tablet', '12.9- Inch iPad Pro with Wi-Fi - 128GB - Silver', '700.00', 10, 'http://www.kirkskooltech.com/wp-content/uploads/2016/05/CHUWI-Hi8-PRO-WINDOWS-10-ANDROID-TABLET-PC-05.jpg', NULL, NULL),
(26, 3, 'HP Laptop', '12.9- Inch', '700.00', 10, 'http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c04462268.png', NULL, NULL),
(27, 3, 'Apple Laptop', '12.9- Inch', '700.00', 10, 'https://images-na.ssl-images-amazon.com/images/I/51DYHR2tLnL._SL1024_.jpg', NULL, NULL),
(28, 4, 'Samsung galaxy', '12.9- Inch', '600.00', 10, 'http://drop.ndtv.com/TECH/product_database/images/1127201522025PM_635_yamada_denki_every_phone.jpeg', NULL, NULL),
(29, 4, 'Iphone XX', '12.9- Inch', '800.00', 10, 'https://blogs-images.forbes.com/anthonykosner/files/2014/02/iPhone-6-06-cd.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shoppingcart`
--

CREATE TABLE IF NOT EXISTS `shoppingcart` (
  `accountId` int(12) NOT NULL,
  `productId` int(12) NOT NULL,
  `name` varchar(120) NOT NULL,
  `quantity` int(12) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `image` varchar(6000) DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deliveryDistance` varchar(100) DEFAULT NULL,
  `deliveryTime` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE IF NOT EXISTS `transaction` (
`transactionId` int(12) NOT NULL,
  `amount` int(12) DEFAULT NULL,
  `accountId` int(12) NOT NULL,
  `transactionDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deliveryTime` varchar(100) DEFAULT NULL,
  `deliveryDistance` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transactionId`, `amount`, `accountId`, `transactionDate`, `deliveryTime`, `deliveryDistance`) VALUES
(12, 700, 3, '2017-04-26 04:12:00', '14 mins', '6.7 mi'),
(13, 700, 3, '2017-04-26 04:12:23', '14 mins', '6.7 mi'),
(14, 1400, 6, '2017-04-26 04:13:04', '45 mins', '36.8 mi'),
(15, 1400, 7, '2017-04-27 02:41:27', '5 hours 11 mins', '332 mi'),
(16, 700, 8, '2017-04-27 02:46:41', '5 hours 11 mins', '332 mi');

-- --------------------------------------------------------

--
-- Table structure for table `transactionfact`
--

CREATE TABLE IF NOT EXISTS `transactionfact` (
  `transactionId` int(12) NOT NULL,
  `productId` int(12) NOT NULL,
  `quantity` int(12) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `accountId` int(12) NOT NULL,
  `name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactionfact`
--

INSERT INTO `transactionfact` (`transactionId`, `productId`, `quantity`, `price`, `accountId`, `name`) VALUES
(12, 22, 1, '700.00', 3, 'Sony 60"'),
(13, 23, 1, '700.00', 3, 'LG 55"'),
(14, 24, 2, '700.00', 6, 'Apple Tablet'),
(15, 22, 2, '700.00', 7, 'Sony 60"'),
(16, 22, 1, '700.00', 8, 'Sony 60"');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userName` varchar(120) DEFAULT NULL,
  `lastName` varchar(120) DEFAULT NULL,
  `firstName` varchar(120) DEFAULT NULL,
  `hash` varchar(140) DEFAULT NULL,
  `salt` varchar(120) DEFAULT NULL,
  `address` varchar(120) DEFAULT NULL,
  `city` varchar(110) DEFAULT NULL,
  `state` varchar(110) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
`accountID` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `profileImage` varchar(6000) DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userName`, `lastName`, `firstName`, `hash`, `salt`, `address`, `city`, `state`, `zipcode`, `accountID`, `email`, `profileImage`, `lat`, `lng`) VALUES
('khanh', NULL, NULL, '2c06ecdc6c39ef7a13fb23ada6c70ddc7c3d0a9c35c751f90648184cbebfeb207e873f45b7c3fb63ffe9cd75e24f43a8061e592fa85c3e7cddf658ed57d4d87d', 'dbc4b81029026271e94ea97fd4697e90', NULL, NULL, NULL, NULL, 2, 'khanhnguyen1123@gmail.com', NULL, NULL, NULL),
('duc', NULL, NULL, '9054efa6daf92debabdcd94935eaa1c29b0ca6647a5a1efed4898c6fac9d830f0f5aee9ba03b655226023501cb8d8232c6a022836e0532f3207f788b108d0c0d', '7b9bc00a1b132548a26214f250712e73', '1442 peaceful glen court', 'san jose', 'CA', '95121', 3, 'duc@gmail.com', NULL, '37.30048800', '-121.81184500'),
('tran', NULL, NULL, '7ca8baa96b0ef648ae4ecdcc6fb9694f3234c19258e87b08cc79297f7483e16a24c90dad87548ccd29c3fefe5495df71032ca398ede1c70429134b8c05665faa', '5346ef2ea3dbd8c9bc47f2c90a9cc660', NULL, NULL, NULL, NULL, 4, 'tran@gmail.com', NULL, NULL, NULL),
('hoang', NULL, NULL, 'aa0e2ed73048e164f3f6c05885924f5c111a241d1c7bac4e294b259e392792463d5ccbcdbfb6d1fe8e149f3c5f343df6a81cd6937ff58b7cda642e1119a810d9', '852beff46e9ba7b926c645f193b90203', NULL, NULL, NULL, NULL, 5, 'hoang@gmail.com', NULL, NULL, NULL),
('ho', NULL, NULL, '7174efe5e9b5c2005f885fe087da20ba430d4c65ee0deaff5380d34735106c262d6076d696bd63097e7dcde364c097e815dcbb543551f31aae30e36d5da70727', 'e2e450000039ffc096bbebeaf82f9239', '18459 clifton way', 'castro valley', 'California', '94546', 6, 'ho@gmail.com', NULL, '37.71216510', '-122.09189760'),
('Foo', NULL, NULL, 'fb7f0993e466efa50a3104a8f852dbf47a40d7d238a9cde3cb2ffacb63c40362600a1986d895a0b553979191fa98f730b49418893675ad418da538e1f4ba1def', 'dd19e75ac284cc7d4c854932cd73c637', '212 Donnick ave', 'thousand oaks', 'ca', '91360', 7, 'none@given.com', NULL, '34.20290370', '-118.88149450'),
('Foo', NULL, NULL, '869219f042f9a2a50929bd895d92b251416674789317aea4982920cadb78d30a91b6ecd9d5cd58cea81c61c181b99bd6056abd90d329c9a30caa7117c3900d37', 'cebca0a0997075636f0dc8e391ceb4cc', '212 Donnick Ave', 'Thousand Oaks', 'CA', '91360', 8, 'no@na.com', NULL, '34.20290370', '-118.88149450');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
 ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
 ADD PRIMARY KEY (`productId`), ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `shoppingcart`
--
ALTER TABLE `shoppingcart`
 ADD KEY `accountId` (`accountId`), ADD KEY `productId` (`productId`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
 ADD PRIMARY KEY (`transactionId`), ADD KEY `accountId` (`accountId`);

--
-- Indexes for table `transactionfact`
--
ALTER TABLE `transactionfact`
 ADD KEY `transactionId` (`transactionId`), ADD KEY `productId` (`productId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`accountID`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
MODIFY `categoryId` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
MODIFY `productId` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
MODIFY `transactionId` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
ADD CONSTRAINT `product_category_fk` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `shoppingcart`
--
ALTER TABLE `shoppingcart`
ADD CONSTRAINT `productId_fk` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `shoppingCart_accountId_fk` FOREIGN KEY (`accountId`) REFERENCES `user` (`accountID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
ADD CONSTRAINT `accountId_fk` FOREIGN KEY (`accountId`) REFERENCES `user` (`accountID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transactionfact`
--
ALTER TABLE `transactionfact`
ADD CONSTRAINT `transaction_fk` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`transactionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `transaction_productId_fk` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
