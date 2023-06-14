/*
  Warnings:

  - The primary key for the `OTP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `devoteeID` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `otpCode` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `otpID` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OTP` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OTP` DROP FOREIGN KEY `OTP_devoteeID_fkey`;

-- AlterTable
ALTER TABLE `OTP` DROP PRIMARY KEY,
    DROP COLUMN `devoteeID`,
    DROP COLUMN `expiryDate`,
    DROP COLUMN `otpCode`,
    DROP COLUMN `otpID`,
    ADD COLUMN `Email` VARCHAR(255) NOT NULL,
    ADD COLUMN `OTP` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OTP_Email_key` ON `OTP`(`Email`);
