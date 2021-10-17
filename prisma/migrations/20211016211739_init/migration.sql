-- CreateTable
CREATE TABLE `Users` (
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
    `profilePic` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `rol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rolDescription` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnRoles` (
    `user_id` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`, `rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operator` (
    `operator_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Operator_user_id_key`(`user_id`),
    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserHealthInfo` (
    `operator_id` INTEGER NOT NULL,
    `bloodType` VARCHAR(191) NOT NULL,
    `rh` BOOLEAN NOT NULL,
    `allergies` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `operator_id` INTEGER NOT NULL,
    `countryOfOrigin` VARCHAR(191) NOT NULL,
    `stateOfOrigin` VARCHAR(191) NOT NULL,
    `cityOfOrigin` VARCHAR(191) NOT NULL,
    `zipCodeOfOrigin` INTEGER NOT NULL,
    `addressOfOrigin` VARCHAR(191) NOT NULL,
    `phoneOfOrigin` VARCHAR(191) NOT NULL,
    `countryOfResidence` VARCHAR(191) NOT NULL,
    `stateOfResidence` VARCHAR(191) NOT NULL,
    `cityOfResidence` VARCHAR(191) NOT NULL,
    `zipCodeOfResidence` INTEGER NOT NULL,
    `addressOfResidence` VARCHAR(191) NOT NULL,
    `phoneOfResidence` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWorkInfo` (
    `operator_id` INTEGER NOT NULL,
    `dischargeDate` DATETIME(3) NOT NULL,
    `employementRel` VARCHAR(191) NOT NULL,
    `hiringMode` VARCHAR(191) NOT NULL,
    `unionAgreement` VARCHAR(191) NOT NULL,
    `job` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentType` (
    `documentType_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`documentType_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documentation` (
    `documentation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `documentType_id` INTEGER NOT NULL,
    `urlPdf` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),
    `expirated_at` DATETIME(3),

    PRIMARY KEY (`documentation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Folder` (
    `operator_id` INTEGER NOT NULL,
    `documentation_id` INTEGER NOT NULL,

    PRIMARY KEY (`operator_id`, `documentation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiskAnalysis` (
    `riskAnalysis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `riskName` VARCHAR(191) NOT NULL,
    `riskUrl` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),

    PRIMARY KEY (`riskAnalysis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bussinesName` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `locationName` VARCHAR(191) NOT NULL,
    `coordenates` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `vehicle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `domain` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `model` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `chasisNumber` VARCHAR(191),
    `motorNumber` VARCHAR(191),
    `frontPicUrl` VARCHAR(191),
    `leftSidePicUrl` VARCHAR(191),
    `rigthSidePicUrl` VARCHAR(191),
    `backPicUrl` VARCHAR(191),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),

    PRIMARY KEY (`vehicle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleRequirements` (
    `vehicleRequiriment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirimentName` VARCHAR(191) NOT NULL,
    `requirementDescription` VARCHAR(191) NOT NULL,
    `urlPdf` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expirated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`vehicleRequiriment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleOnVehicleRequirement` (
    `vehicle_id` INTEGER NOT NULL,
    `vehicleRequiriment_id` INTEGER NOT NULL,

    PRIMARY KEY (`vehicle_id`, `vehicleRequiriment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequieredDocumentation` (
    `requiredDocumentation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`requiredDocumentation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequierdDocumentationItem` (
    `requiredDocumentationItem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `requiredDocumentation_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),

    PRIMARY KEY (`requiredDocumentationItem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckItem` (
    `checkItem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`checkItem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckItemGroup` (
    `checkItemGroup_id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupName` VARCHAR(191) NOT NULL,
    `checkItem_id` INTEGER NOT NULL,

    PRIMARY KEY (`checkItemGroup_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jobs` (
    `job_id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `finishDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `riskAnalysis_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `checkItemGroup_id` INTEGER NOT NULL,
    `requiredDocumentation_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3),

    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperatorOnJobs` (
    `job_id` INTEGER NOT NULL,
    `operator_id` INTEGER NOT NULL,

    PRIMARY KEY (`job_id`, `operator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnRoles` ADD CONSTRAINT `UsersOnRoles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnRoles` ADD CONSTRAINT `UsersOnRoles_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Roles`(`rol_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operator` ADD CONSTRAINT `Operator_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHealthInfo` ADD CONSTRAINT `UserHealthInfo_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `Operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `Operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWorkInfo` ADD CONSTRAINT `UserWorkInfo_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `Operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documentation` ADD CONSTRAINT `Documentation_documentType_id_fkey` FOREIGN KEY (`documentType_id`) REFERENCES `DocumentType`(`documentType_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `Operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_documentation_id_fkey` FOREIGN KEY (`documentation_id`) REFERENCES `Documentation`(`documentation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleOnVehicleRequirement` ADD CONSTRAINT `VehicleOnVehicleRequirement_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicle`(`vehicle_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleOnVehicleRequirement` ADD CONSTRAINT `VehicleOnVehicleRequirement_vehicleRequiriment_id_fkey` FOREIGN KEY (`vehicleRequiriment_id`) REFERENCES `VehicleRequirements`(`vehicleRequiriment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequieredDocumentation` ADD CONSTRAINT `RequieredDocumentation_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequierdDocumentationItem` ADD CONSTRAINT `RequierdDocumentationItem_requiredDocumentation_id_fkey` FOREIGN KEY (`requiredDocumentation_id`) REFERENCES `RequieredDocumentation`(`requiredDocumentation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckItemGroup` ADD CONSTRAINT `CheckItemGroup_checkItem_id_fkey` FOREIGN KEY (`checkItem_id`) REFERENCES `CheckItem`(`checkItem_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_riskAnalysis_id_fkey` FOREIGN KEY (`riskAnalysis_id`) REFERENCES `RiskAnalysis`(`riskAnalysis_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicle`(`vehicle_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_checkItemGroup_id_fkey` FOREIGN KEY (`checkItemGroup_id`) REFERENCES `CheckItemGroup`(`checkItemGroup_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_requiredDocumentation_id_fkey` FOREIGN KEY (`requiredDocumentation_id`) REFERENCES `RequieredDocumentation`(`requiredDocumentation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OperatorOnJobs` ADD CONSTRAINT `OperatorOnJobs_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Jobs`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OperatorOnJobs` ADD CONSTRAINT `OperatorOnJobs_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `Operator`(`operator_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
