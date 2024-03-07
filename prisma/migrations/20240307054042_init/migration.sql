-- CreateTable
CREATE TABLE "UserTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "wa" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_hp_key" ON "UserTb"("hp");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_wa_key" ON "UserTb"("wa");
