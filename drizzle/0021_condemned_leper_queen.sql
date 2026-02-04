ALTER TABLE "board_favorites" RENAME COLUMN "boardId" TO "board_id";--> statement-breakpoint
ALTER TABLE "board_favorites" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "board_favorites" DROP CONSTRAINT "board_favorites_boardId_boards_id_fk";
--> statement-breakpoint
ALTER TABLE "board_favorites" DROP CONSTRAINT "board_favorites_userId_users_id_fk";
--> statement-breakpoint
DROP INDEX "board_favorites_user_id";--> statement-breakpoint
ALTER TABLE "board_favorites" DROP CONSTRAINT "board_favorites_boardId_userId_pk";--> statement-breakpoint
ALTER TABLE "board_favorites" ADD CONSTRAINT "board_favorites_board_id_user_id_pk" PRIMARY KEY("board_id","user_id");--> statement-breakpoint
ALTER TABLE "board_favorites" ADD CONSTRAINT "board_favorites_board_id_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_favorites" ADD CONSTRAINT "board_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "board_favorites_user_id" ON "board_favorites" USING btree ("user_id");