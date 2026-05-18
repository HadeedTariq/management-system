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
import { users } from "./users.schema";

export const societyStatusEnum = pgEnum("society_status", [
  "active",
  "inactive",
]);

export const memberRoleEnum = pgEnum("member_role", [
  "member",
  "admin",
  "society_head",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "upcoming",
  "ongoing",
  "completed",
  "cancelled",
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

export const societyPosts = pgTable("society_posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  societyId: uuid("society_id")
    .notNull()
    .references(() => societies.id, { onDelete: "cascade" }),

  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  image: varchar("image", { length: 500 }),

  isPublished: boolean("is_published").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const societyEvents = pgTable("society_events", {
  id: uuid("id").defaultRandom().primaryKey(),

  societyId: uuid("society_id")
    .notNull()
    .references(() => societies.id, { onDelete: "cascade" }),

  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  image: varchar("image", { length: 500 }),

  location: varchar("location", { length: 255 }),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),

  status: eventStatusEnum("status").default("upcoming").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// saved scoiety event and the post schema
export const savedSocietyPosts = pgTable(
  "saved_society_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    postId: uuid("post_id")
      .notNull()
      .references(() => societyPosts.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueSavedPost: uniqueIndex("unique_saved_post_idx").on(
      table.userId,
      table.postId,
    ),
  }),
);

export const savedSocietyEvents = pgTable(
  "saved_society_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    eventId: uuid("event_id")
      .notNull()
      .references(() => societyEvents.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueSavedEvent: uniqueIndex("unique_saved_event_idx").on(
      table.userId,
      table.eventId,
    ),
  }),
);
