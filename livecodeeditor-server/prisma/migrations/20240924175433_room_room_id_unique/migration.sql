/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Room_roomId_key` ON `Room`(`roomId`);
