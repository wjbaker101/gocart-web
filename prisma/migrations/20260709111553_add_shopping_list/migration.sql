-- CreateTable
CREATE TABLE "gocart"."shopping_list_item" (
    "id" BIGSERIAL NOT NULL,
    "reference" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "list_order" TEXT NOT NULL,

    CONSTRAINT "shopping_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gocart"."product" (
    "id" BIGSERIAL NOT NULL,
    "tpnc" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopping_list_item_reference_key" ON "gocart"."shopping_list_item"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "product_tpnc_key" ON "gocart"."product"("tpnc");

-- AddForeignKey
ALTER TABLE "gocart"."shopping_list_item" ADD CONSTRAINT "shopping_list_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "gocart"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gocart"."shopping_list_item" ADD CONSTRAINT "shopping_list_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "gocart"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
