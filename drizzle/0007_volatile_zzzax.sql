CREATE TABLE "cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"list_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"position" double precision NOT NULL,
	"created_at" timestamptz NOT NULL,
	"updated_at" timestamptz NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cards_list_id" ON "cards" USING btree ("list_id");--> statement-breakpoint
CREATE UNIQUE INDEX "cards_list_id_position_key" ON "cards" USING btree ("list_id","position");--> statement-breakpoint
CREATE INDEX "boards_workspace_id" ON "boards" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "lists_board_id" ON "lists" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "workspaces_owner_id_idx" ON "workspaces" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "workspaces_owner_id_name_idx" ON "workspaces" USING btree ("owner_id","name");