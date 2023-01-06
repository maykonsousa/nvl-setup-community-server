-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT DEFAULT 'USER',
    "githubProfile" TEXT,
    "linkedinProfile" TEXT,
    "rocketseatProfile" TEXT,
    "countIndication" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_githubProfile_key" ON "users"("githubProfile");

-- CreateIndex
CREATE UNIQUE INDEX "users_linkedinProfile_key" ON "users"("linkedinProfile");

-- CreateIndex
CREATE UNIQUE INDEX "users_rocketseatProfile_key" ON "users"("rocketseatProfile");
