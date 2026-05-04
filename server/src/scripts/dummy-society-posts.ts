import { societyPosts } from "@/db"; // adjust path
import { db } from "@/db/client";
import { eq } from "drizzle-orm";

type SeedPostsOptions = {
  societyId: string;
  authorId: string;
};

export async function seedSocietyPosts({
  societyId,
  authorId,
}: SeedPostsOptions) {
  console.log("Seeding society posts...");

  try {
    const existing = await db
      .select({
        title: societyPosts.title,
      })
      .from(societyPosts)
      .where(eq(societyPosts.societyId, societyId));

    const existingTitles = new Set(existing.map((e) => e.title));

    // 🧠 Step 2: dummy dataset
    const dummyPosts = [
      {
        title: "Welcome to the Society",
        description:
          "This is the first post welcoming all members to the society.",
      },
      {
        title: "Weekly Meetup Announcement",
        description:
          "Join us this week for an engaging discussion and networking session.",
      },
      {
        title: "New Event Coming Soon",
        description:
          "Stay tuned for our upcoming event. Details will be shared shortly.",
      },
      {
        title: "Community Guidelines",
        description:
          "Please follow the community guidelines to maintain a healthy environment.",
      },
      {
        title: "Achievement Highlight",
        description: "Celebrating the achievements of our members this month.",
      },
    ];

    // 🚫 filter duplicates
    const newPosts = dummyPosts.filter(
      (post) => !existingTitles.has(post.title),
    );

    if (!newPosts.length) {
      console.log("No new posts to insert");
      return;
    }

    // 🧱 Step 3: prepare insert payload
    const postsToInsert = newPosts.map((post) => ({
      societyId,
      authorId,
      title: post.title,
      description: post.description,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9Np45yaS3VLxFNVvrk59BkpxgfqmmUE86w&s",
      isPublished: true,
    }));

    // 💾 Step 4: insert
    const inserted = await db
      .insert(societyPosts)
      .values(postsToInsert)
      .returning({
        id: societyPosts.id,
        title: societyPosts.title,
      });

    console.log(`Inserted ${inserted.length} posts`);
    console.table(inserted);

    return inserted;
  } catch (error) {
    console.error("Seeding posts failed:", error);
    throw error;
  }
}
