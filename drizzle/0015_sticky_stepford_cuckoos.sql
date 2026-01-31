CREATE TABLE "workspace_favorites" (
	"workspace_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "workspace_favorites_workspace_id_user_id_pk" PRIMARY KEY("workspace_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "workspace_favorites" ADD CONSTRAINT "workspace_favorites_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_favorites" ADD CONSTRAINT "workspace_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workspace_favorites_user_id_idx" ON "workspace_favorites" USING btree ("user_id");