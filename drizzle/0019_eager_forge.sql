ALTER TABLE "boards" ADD COLUMN "archived_by" uuid;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "archived_at" timestamptz;--> statement-breakpoint
ALTER TABLE "lists" ADD COLUMN "archived_by" uuid;--> statement-breakpoint
ALTER TABLE "lists" ADD COLUMN "archived_at" timestamptz;--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_archived_by_users_id_fk" FOREIGN KEY ("archived_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lists" ADD CONSTRAINT "lists_archived_by_users_id_fk" FOREIGN KEY ("archived_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;