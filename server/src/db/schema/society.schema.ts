import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const societyStatusEnum = pgEnum("society_status", [
  "active",
  "inactive",
]);

export const memberRoleEnum = pgEnum("member_role", [
  "member",
  "admin",
  "society_head",
]);

export const memberStatusEnum = pgEnum("member_status", ["active", "left"]);

export const societies = pgTable("societies", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  status: societyStatusEnum("status").default("active").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const societyMembers = pgTable(
  "society_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    societyId: uuid("society_id")
      .notNull()
      .references(() => societies.id, { onDelete: "cascade" }),

    userId: uuid("user_id").notNull(),

    role: memberRoleEnum("role").default("member").notNull(),

    status: memberStatusEnum("status").default("active").notNull(),

    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueMember: uniqueIndex("unique_member_idx").on(
      table.societyId,
      table.userId,
    ),
  }),
);
