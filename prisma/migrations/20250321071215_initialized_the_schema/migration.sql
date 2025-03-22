-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "ownerWalletAddress" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "tokenomics" JSONB NOT NULL DEFAULT '{}',
    "socials" JSONB NOT NULL DEFAULT '[]',
    "templateId" TEXT NOT NULL,
    "templateData" JSONB NOT NULL DEFAULT '{}',
    "customDomain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userWalletAddress" TEXT NOT NULL,
    "siteId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "txSignature" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Site_subdomain_key" ON "Site"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "Site_customDomain_key" ON "Site"("customDomain");

-- CreateIndex
CREATE INDEX "Site_subdomain_idx" ON "Site"("subdomain");

-- CreateIndex
CREATE INDEX "Site_ownerWalletAddress_idx" ON "Site"("ownerWalletAddress");

-- CreateIndex
CREATE INDEX "Site_templateId_idx" ON "Site"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txSignature_key" ON "Transaction"("txSignature");

-- CreateIndex
CREATE INDEX "Transaction_txSignature_idx" ON "Transaction"("txSignature");

-- CreateIndex
CREATE INDEX "Transaction_userWalletAddress_idx" ON "Transaction"("userWalletAddress");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_ownerWalletAddress_fkey" FOREIGN KEY ("ownerWalletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userWalletAddress_fkey" FOREIGN KEY ("userWalletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
