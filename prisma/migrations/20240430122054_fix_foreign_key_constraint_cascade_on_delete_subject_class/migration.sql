-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `classes_subjectId_fkey`;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
