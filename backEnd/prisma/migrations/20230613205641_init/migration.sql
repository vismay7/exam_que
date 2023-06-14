-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devotee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `photoURL` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `flatNumber` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `pinCode` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `devoteeId` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `initiationDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Devotee_userID_key`(`userID`),
    UNIQUE INDEX `Devotee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentID` INTEGER NOT NULL AUTO_INCREMENT,
    `devoteeID` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `paidDate` DATETIME(3) NULL,

    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OTP` (
    `otpID` INTEGER NOT NULL AUTO_INCREMENT,
    `devoteeID` INTEGER NOT NULL,
    `otpCode` VARCHAR(191) NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`otpID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_devoteeID_fkey` FOREIGN KEY (`devoteeID`) REFERENCES `Devotee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OTP` ADD CONSTRAINT `OTP_devoteeID_fkey` FOREIGN KEY (`devoteeID`) REFERENCES `Devotee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
