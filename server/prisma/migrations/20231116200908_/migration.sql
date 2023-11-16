-- CreateTable
CREATE TABLE "Tasker" (
    "id" SERIAL NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Tasker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskerReview" (
    "id" SERIAL NOT NULL,
    "taskerId" INTEGER NOT NULL,
    "reviewedBy" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskerReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taskee" (
    "id" SERIAL NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "tools" TEXT,
    "vehicles" TEXT,
    "facts" TEXT,
    "about" TEXT,

    CONSTRAINT "Taskee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "taskeeId" INTEGER NOT NULL,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskeeReview" (
    "id" SERIAL NOT NULL,
    "taskeeId" INTEGER NOT NULL,
    "reviewedBy" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskeeReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "subName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "taskeeId" INTEGER NOT NULL,
    "subcategoryId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "experience" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("taskeeId","subcategoryId")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskerId" INTEGER NOT NULL,
    "subcategoryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "vehicleRequired" BOOLEAN NOT NULL,
    "isAssigned" BOOLEAN NOT NULL,
    "assignedTo" INTEGER,
    "estTimeCommitment" INTEGER NOT NULL,
    "startTime" TEXT,
    "date" TEXT,
    "reviewTaskee" INTEGER,
    "reviewTasker" INTEGER,
    "startingStreet" TEXT NOT NULL,
    "startingCity" TEXT NOT NULL,
    "startingState" TEXT NOT NULL,
    "startingZip" TEXT NOT NULL,
    "startingSuite" TEXT NOT NULL,
    "endingStreet" TEXT NOT NULL,
    "endingCity" TEXT NOT NULL,
    "endingState" TEXT NOT NULL,
    "endingZip" TEXT NOT NULL,
    "endingSuite" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasker_email_key" ON "Tasker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Taskee_email_key" ON "Taskee"("email");

-- AddForeignKey
ALTER TABLE "TaskerReview" ADD CONSTRAINT "TaskerReview_taskerId_fkey" FOREIGN KEY ("taskerId") REFERENCES "Tasker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskerReview" ADD CONSTRAINT "TaskerReview_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "Taskee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSchedule" ADD CONSTRAINT "WorkSchedule_taskeeId_fkey" FOREIGN KEY ("taskeeId") REFERENCES "Taskee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskeeReview" ADD CONSTRAINT "TaskeeReview_taskeeId_fkey" FOREIGN KEY ("taskeeId") REFERENCES "Taskee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskeeReview" ADD CONSTRAINT "TaskeeReview_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "Tasker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_taskeeId_fkey" FOREIGN KEY ("taskeeId") REFERENCES "Taskee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskerId_fkey" FOREIGN KEY ("taskerId") REFERENCES "Tasker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "Taskee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_reviewTaskee_fkey" FOREIGN KEY ("reviewTaskee") REFERENCES "TaskeeReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_reviewTasker_fkey" FOREIGN KEY ("reviewTasker") REFERENCES "TaskerReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
