ALTER TABLE "boards" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "short_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "short_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "lists" ADD COLUMN "short_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "short_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "board_short_id_idx" ON "boards" USING btree ("short_id");--> statement-breakpoint
CREATE INDEX "board_slug_idx" ON "boards" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "cards_short_id_idx" ON "cards" USING btree ("short_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lists_short_id_idx" ON "lists" USING btree ("short_id");--> statement-breakpoint
CREATE UNIQUE INDEX "workspaces_short_id_idx" ON "workspaces" USING btree ("short_id");--> statement-breakpoint
CREATE INDEX "workspaces_slug_idx" ON "workspaces" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_short_id_unique" UNIQUE("short_id");--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_short_id_unique" UNIQUE("short_id");--> statement-breakpoint
ALTER TABLE "lists" ADD CONSTRAINT "lists_short_id_unique" UNIQUE("short_id");--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_short_id_unique" UNIQUE("short_id");