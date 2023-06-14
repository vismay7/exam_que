/*
  Warnings:

  - You are about to drop the column `Email` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `OTP` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otp` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `OTP_Email_key` ON `OTP`;

-- AlterTable
ALTER TABLE `OTP` DROP COLUMN `Email`,
    DROP COLUMN `OTP`,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `otp` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OTP_email_key` ON `OTP`(`email`);
