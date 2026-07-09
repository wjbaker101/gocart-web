/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id]` on the table `shopping_list_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shopping_list_item_user_id_product_id_key" ON "gocart"."shopping_list_item"("user_id", "product_id");
