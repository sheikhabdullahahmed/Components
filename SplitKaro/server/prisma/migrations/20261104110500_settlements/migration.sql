-- CreateTable
CREATE TABLE "settlements" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payerId" TEXT NOT NULL,
    "payeeId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "groupId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settlements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "settlements_payerId_idx" ON "settlements"("payerId");

-- CreateIndex
CREATE INDEX "settlements_payeeId_idx" ON "settlements"("payeeId");

-- CreateIndex
CREATE INDEX "settlements_groupId_idx" ON "settlements"("groupId");

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
