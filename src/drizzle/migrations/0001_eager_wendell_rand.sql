ALTER TABLE "transactions" DROP CONSTRAINT "transactions_installment_id_installments_id_fk";
--> statement-breakpoint
ALTER TABLE "installments" DROP CONSTRAINT "installments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "installments" DROP CONSTRAINT "installments_category_id_transaction_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "installments" ADD COLUMN "transaction_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "installments" ADD COLUMN "number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "installments" ADD COLUMN "amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "installments" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "installments" ADD COLUMN "due_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "installments" ADD COLUMN "paid_at" date;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "installment_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "installment_number";--> statement-breakpoint
ALTER TABLE "installments" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "installments" DROP COLUMN "category_id";--> statement-breakpoint
ALTER TABLE "installments" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "installments" DROP COLUMN "total_amount";--> statement-breakpoint
ALTER TABLE "installments" DROP COLUMN "installments";--> statement-breakpoint
ALTER TABLE "installments" DROP COLUMN "start_date";