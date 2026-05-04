import { societyMembers } from "@/db"; // adjust
import { users } from "@/db";
import { db } from "@/db/client";
import { and, eq } from "drizzle-orm";

type SeedOptions = {
  societyId: string;
  userIds: string[];
  assignRoles?: boolean;
};

export async function seedSocietyMembers({
  societyId,
  userIds,
  assignRoles = true,
}: SeedOptions) {
  console.log("Seeding society members...");

  try {
    // 🔍 Step 1: fetch existing members (avoid duplicates)
    const existing = await db
      .select({
        userId: societyMembers.userId,
      })
      .from(societyMembers)
      .where(eq(societyMembers.societyId, societyId));

    const existingUserIds = new Set(existing.map((e) => e.userId));

    // 🚫 filter already existing users
    const newUsers = userIds.filter((id) => !existingUserIds.has(id));

    if (!newUsers.length) {
      console.log("No new users to insert");
      return;
    }

    // 🎯 Step 2: role assignment strategy
    let membersToInsert;

    if (assignRoles) {
      const shuffled = [...newUsers].sort(() => Math.random() - 0.5);

      const head = shuffled[0];
      const admins = shuffled.slice(1, 3); // 2 admins
      const members = shuffled.slice(3);

      membersToInsert = [
        {
          societyId,
          userId: head,
          role: "society_head" as const,
          status: "active" as const,
        },
        ...admins.map((id) => ({
          societyId,
          userId: id,
          role: "admin" as const,
          status: "active" as const,
        })),
        ...members.map((id) => ({
          societyId,
          userId: id,
          role: "member" as const,
          status: "active" as const,
        })),
      ];
    } else {
      membersToInsert = newUsers.map((id) => ({
        societyId,
        userId: id,
        role: "member" as const,
        status: "active" as const,
      }));
    }

    // 💾 Step 3: insert
    const inserted = await db
      .insert(societyMembers)
      .values(membersToInsert)
      .returning({
        id: societyMembers.id,
        userId: societyMembers.userId,
        role: societyMembers.role,
      });

    console.log(`Inserted ${inserted.length} members`);
    console.table(inserted);

    return inserted;
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}
