CREATE TABLE IF NOT EXISTS "todo_apps_todos" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "todo_apps_todos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" varchar(1024),
	"isDone" boolean DEFAULT false,
	"createdBy" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "todo_apps_post";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_apps_todos" ADD CONSTRAINT "todo_apps_todos_createdBy_todo_apps_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."todo_apps_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
