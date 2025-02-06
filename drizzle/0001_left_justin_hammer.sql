CREATE TABLE IF NOT EXISTS "todo_apps_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "todo_apps_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo_apps_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DROP TABLE "verification";--> statement-breakpoint
ALTER TABLE "account" RENAME TO "todo_apps_account";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "todo_apps_session";--> statement-breakpoint
ALTER TABLE "todo_apps_session" DROP CONSTRAINT "session_token_unique";--> statement-breakpoint
ALTER TABLE "todo_apps_account" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "todo_apps_session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_apps_account" ADD CONSTRAINT "todo_apps_account_user_id_todo_apps_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."todo_apps_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_apps_session" ADD CONSTRAINT "todo_apps_session_user_id_todo_apps_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."todo_apps_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "todo_apps_session" ADD CONSTRAINT "todo_apps_session_token_unique" UNIQUE("token");