CREATE TABLE "saved_society_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_society_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saved_society_events" ADD CONSTRAINT "saved_society_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_society_events" ADD CONSTRAINT "saved_society_events_event_id_society_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."society_events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_society_posts" ADD CONSTRAINT "saved_society_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_society_posts" ADD CONSTRAINT "saved_society_posts_post_id_society_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."society_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_saved_event_idx" ON "saved_society_events" USING btree ("user_id","event_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_saved_post_idx" ON "saved_society_posts" USING btree ("user_id","post_id");