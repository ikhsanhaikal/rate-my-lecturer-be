/*
  Warnings:

  - You are about to alter the column `code` on the `labs` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Made the column `semester` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `year` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `classes_lecturerId_fkey`;

-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `classes_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_classId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_reviewerId_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_traitId_fkey`;

-- AlterTable
ALTER TABLE `classes` MODIFY `lecturerId` INTEGER NULL,
    MODIFY `subjectId` INTEGER NULL,
    MODIFY `semester` VARCHAR(191) NOT NULL,
    DROP COLUMN `year`,
    ADD COLUMN `year` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `labs` MODIFY `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `reviewerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tags` MODIFY `traitId` INTEGER NULL,
    MODIFY `reviewId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `lecturers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_traitId_fkey` FOREIGN KEY (`traitId`) REFERENCES `traits`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `reviews`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
