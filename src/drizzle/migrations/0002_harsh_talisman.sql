ALTER TABLE "transactions" ADD COLUMN "catecory_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_catecory_id_transaction_categories_id_fk" FOREIGN KEY ("catecory_id") REFERENCES "public"."transaction_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "category";