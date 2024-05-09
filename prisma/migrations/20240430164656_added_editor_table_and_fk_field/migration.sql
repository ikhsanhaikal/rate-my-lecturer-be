-- AlterTable
ALTER TABLE `classes` ADD COLUMN `editorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `labs` ADD COLUMN `editorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `lecturers` ADD COLUMN `editorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `editorId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Editor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Editor_email_key`(`email`),
    UNIQUE INDEX `Editor_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `Editor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labs` ADD CONSTRAINT `labs_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `Editor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `Editor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `Editor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
