-- DropForeignKey
ALTER TABLE `lecturers` DROP FOREIGN KEY `lecturers_labId_fkey`;

-- AlterTable
ALTER TABLE `lecturers` MODIFY `labId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_labId_fkey` FOREIGN KEY (`labId`) REFERENCES `labs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
