ALTER TABLE "society_members" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "society_members" ALTER COLUMN "role" SET DEFAULT 'member'::text;--> statement-breakpoint
DROP TYPE "public"."member_role";--> statement-breakpoint
CREATE TYPE "public"."member_role" AS ENUM('member', 'admin', 'society_head');--> statement-breakpoint
ALTER TABLE "society_members" ALTER COLUMN "role" SET DEFAULT 'member'::"public"."member_role";--> statement-breakpoint
ALTER TABLE "society_members" ALTER COLUMN "role" SET DATA TYPE "public"."member_role" USING "role"::"public"."member_role";