import { users } from "@/db";
import { db } from "@/db/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const TOTAL_USERS = 50;
const PASSWORD = "Sam#12908";
const SALT_ROUNDS = 10;

export async function seedUsers() {
  console.log("Seeding users...");

  const hashedPassword = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  const fakeUsers = Array.from({ length: TOTAL_USERS }).map(() => ({
    userName: faker.person.fullName(),

    email: faker.internet.email().toLowerCase(),

    password: hashedPassword,

    role: "student" as const,

    source: "general" as const,

    isActive: true,
    isVerified: true,

    gender: faker.helpers.arrayElement(["male", "female", "other"]) as
      | "male"
      | "female"
      | "other",

    refreshToken: null,
  }));

  try {
    const inserted = await db.insert(users).values(fakeUsers).returning({
      id: users.id,
      email: users.email,
    });

    console.log(`Inserted ${inserted.length} users`);
    console.table(inserted.slice(0, 5));
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}
