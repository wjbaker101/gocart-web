/*
  Warnings:

  - Added the required column `is_checked` to the `shopping_list_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gocart"."shopping_list_item" ADD COLUMN     "is_checked" BOOLEAN NOT NULL;
