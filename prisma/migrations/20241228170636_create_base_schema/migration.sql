-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('Done', 'Error', 'Pending');

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "repo_url" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'Pending',
    "score" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "challenge_id" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
