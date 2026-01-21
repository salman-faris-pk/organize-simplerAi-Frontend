/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `CardStatement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CardStatement_id_userId_key" ON "CardStatement"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_userId_key" ON "Invoice"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_id_userId_key" ON "Receipt"("id", "userId");
