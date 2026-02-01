ALTER TABLE "cards" ADD COLUMN "archived_by" uuid;--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "archived_at" timestamptz;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_archived_by_users_id_fk" FOREIGN KEY ("archived_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;