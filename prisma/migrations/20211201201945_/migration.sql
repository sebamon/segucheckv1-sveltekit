-- CreateTable
CREATE TABLE `checkitem` (
    `checkItem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`checkItem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checkcategory` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verifyItem` (
    `verifyItem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkItem_id` INTEGER NOT NULL,
    `checked` BOOLEAN NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `verifyVerify_id` INTEGER NULL,

    PRIMARY KEY (`verifyItem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verify` (
    `verify_id` INTEGER NOT NULL AUTO_INCREMENT,
    `checklist_id` INTEGER NOT NULL,

    PRIMARY KEY (`verify_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist` (
    `checklist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkListName` VARCHAR(191) NOT NULL,
    `verify_id` INTEGER NOT NULL,

    PRIMARY KEY (`checklist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `businessName` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentation` (
    `documentation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `documentType_id` INTEGER NOT NULL,
    `urlPdf` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `expirated_at` DATETIME(3) NULL,

    INDEX `Documentation_documentType_id_fkey`(`documentType_id`),
    PRIMARY KEY (`documentation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documenttype` (
    `documentType_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`documentType_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `folder` (
    `operator_id` INTEGER NOT NULL,
    `documentation_id` INTEGER NOT NULL,

    INDEX `Folder_documentation_id_fkey`(`documentation_id`),
    PRIMARY KEY (`operator_id`, `documentation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `job_id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `finishDate` DATETIME(3) NOT NULL,
    `statusJob` VARCHAR(191) NOT NULL,
    `riskAnalysis_id` INTEGER NULL,
    `location_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `vehicle_id` INTEGER NULL,
    `requiredDocumentation_id` INTEGER NULL,
    `checklist_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `Jobs_customer_id_fkey`(`customer_id`),
    INDEX `Jobs_location_id_fkey`(`location_id`),
    INDEX `Jobs_requiredDocumentation_id_fkey`(`requiredDocumentation_id`),
    INDEX `Jobs_riskAnalysis_id_fkey`(`riskAnalysis_id`),
    INDEX `Jobs_vehicle_id_fkey`(`vehicle_id`),
    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `locationName` VARCHAR(191) NOT NULL,
    `coordinates` VARCHAR(191) NULL,
    `customer_id` INTEGER NOT NULL,
    `province` VARCHAR(191) NOT NULL,

    INDEX `Location_customer_id_fkey`(`customer_id`),
    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operator` (
    `operator_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Operator_user_id_key`(`user_id`),
    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operatoronjobs` (
    `job_id` INTEGER NOT NULL,
    `operator_id` INTEGER NOT NULL,

    INDEX `OperatorOnJobs_operator_id_fkey`(`operator_id`),
    PRIMARY KEY (`job_id`, `operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requierddocumentationitem` (
    `requiredDocumentationItem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `requiredDocumentation_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `RequierdDocumentationItem_requiredDocumentation_id_fkey`(`requiredDocumentation_id`),
    PRIMARY KEY (`requiredDocumentationItem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requiereddocumentation` (
    `requiredDocumentation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,

    INDEX `RequieredDocumentation_customer_id_fkey`(`customer_id`),
    PRIMARY KEY (`requiredDocumentation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riskanalysis` (
    `riskAnalysis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `riskName` VARCHAR(191) NOT NULL,
    `riskUrl` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`riskAnalysis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `rol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rolDescription` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `useraddress` (
    `operator_id` INTEGER NOT NULL,
    `countryOfOrigin` VARCHAR(191) NOT NULL,
    `stateOfOrigin` VARCHAR(191) NOT NULL,
    `cityOfOrigin` VARCHAR(191) NOT NULL,
    `zipCodeOfOrigin` VARCHAR(191) NOT NULL,
    `addressOfOrigin` VARCHAR(191) NOT NULL,
    `phoneOfOrigin` VARCHAR(191) NOT NULL,
    `countryOfResidence` VARCHAR(191) NOT NULL,
    `stateOfResidence` VARCHAR(191) NOT NULL,
    `cityOfResidence` VARCHAR(191) NOT NULL,
    `zipCodeOfResidence` VARCHAR(191) NOT NULL,
    `addressOfResidence` VARCHAR(191) NOT NULL,
    `phoneOfResidence` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userhealthinfo` (
    `operator_id` INTEGER NOT NULL,
    `bloodType` VARCHAR(191) NOT NULL,
    `rh` BOOLEAN NOT NULL,
    `allergies` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `cuit` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `studyLevel` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_cuit_key`(`cuit`),
    UNIQUE INDEX `users_cuit_password_key`(`cuit`, `password`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersonroles` (
    `user_id` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    INDEX `UsersOnRoles_rol_id_fkey`(`rol_id`),
    PRIMARY KEY (`user_id`, `rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userworkinfo` (
    `operator_id` INTEGER NOT NULL,
    `dischargeDate` DATETIME(3) NOT NULL,
    `employementRel` VARCHAR(191) NOT NULL,
    `hiringMode` VARCHAR(191) NOT NULL,
    `unionAgreement` VARCHAR(191) NOT NULL,
    `job` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `vehicle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `domain` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `internNumber` INTEGER NOT NULL,
    `chasisNumber` VARCHAR(191) NULL,
    `motorNumber` VARCHAR(191) NULL,
    `frontPicUrl` VARCHAR(191) NULL,
    `leftSidePicUrl` VARCHAR(191) NULL,
    `rightSidePicUrl` VARCHAR(191) NULL,
    `backPicUrl` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `vehicle_domain_key`(`domain`),
    PRIMARY KEY (`vehicle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicleonvehiclerequirement` (
    `vehicle_id` INTEGER NOT NULL,
    `vehicleRequiriment_id` INTEGER NOT NULL,

    INDEX `VehicleOnVehicleRequirement_vehicleRequiriment_id_fkey`(`vehicleRequiriment_id`),
    PRIMARY KEY (`vehicle_id`, `vehicleRequiriment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehiclerequirements` (
    `vehicleRequiriment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirimentName` VARCHAR(191) NOT NULL,
    `requirementDescription` VARCHAR(191) NOT NULL,
    `urlPdf` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expirated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`vehicleRequiriment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_checkcategoryTocheckitem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_checkcategoryTocheckitem_AB_unique`(`A`, `B`),
    INDEX `_checkcategoryTocheckitem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `verifyItem` ADD CONSTRAINT `verifyItem_checkItem_id_fkey` FOREIGN KEY (`checkItem_id`) REFERENCES `checkitem`(`checkItem_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verifyItem` ADD CONSTRAINT `verifyItem_verifyVerify_id_fkey` FOREIGN KEY (`verifyVerify_id`) REFERENCES `verify`(`verify_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist` ADD CONSTRAINT `checklist_verify_id_fkey` FOREIGN KEY (`verify_id`) REFERENCES `verify`(`verify_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentation` ADD CONSTRAINT `Documentation_documentType_id_fkey` FOREIGN KEY (`documentType_id`) REFERENCES `documenttype`(`documentType_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `folder` ADD CONSTRAINT `Folder_documentation_id_fkey` FOREIGN KEY (`documentation_id`) REFERENCES `documentation`(`documentation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `folder` ADD CONSTRAINT `Folder_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `Jobs_checklist_id_id_fkey` FOREIGN KEY (`checklist_id`) REFERENCES `checklist`(`checklist_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `Jobs_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `Jobs_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `Jobs_requiredDocumentation_id_fkey` FOREIGN KEY (`requiredDocumentation_id`) REFERENCES `requiereddocumentation`(`requiredDocumentation_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `Jobs_riskAnalysis_id_fkey` FOREIGN KEY (`riskAnalysis_id`) REFERENCES `riskanalysis`(`riskAnalysis_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `Jobs_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle`(`vehicle_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `Location_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operator` ADD CONSTRAINT `Operator_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operatoronjobs` ADD CONSTRAINT `OperatorOnJobs_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operatoronjobs` ADD CONSTRAINT `OperatorOnJobs_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requierddocumentationitem` ADD CONSTRAINT `RequierdDocumentationItem_requiredDocumentation_id_fkey` FOREIGN KEY (`requiredDocumentation_id`) REFERENCES `requiereddocumentation`(`requiredDocumentation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requiereddocumentation` ADD CONSTRAINT `RequieredDocumentation_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `useraddress` ADD CONSTRAINT `UserAddress_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userhealthinfo` ADD CONSTRAINT `UserHealthInfo_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonroles` ADD CONSTRAINT `UsersOnRoles_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `roles`(`rol_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersonroles` ADD CONSTRAINT `UsersOnRoles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userworkinfo` ADD CONSTRAINT `UserWorkInfo_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleonvehiclerequirement` ADD CONSTRAINT `VehicleOnVehicleRequirement_vehicleRequiriment_id_fkey` FOREIGN KEY (`vehicleRequiriment_id`) REFERENCES `vehiclerequirements`(`vehicleRequiriment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleonvehiclerequirement` ADD CONSTRAINT `VehicleOnVehicleRequirement_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle`(`vehicle_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_checkcategoryTocheckitem` ADD FOREIGN KEY (`A`) REFERENCES `checkcategory`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_checkcategoryTocheckitem` ADD FOREIGN KEY (`B`) REFERENCES `checkitem`(`checkItem_id`) ON DELETE CASCADE ON UPDATE CASCADE;
