import { societyEvents } from "@/db";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";

type SeedEventsOptions = {
  societyId: string;
  authorId: string;
};

export async function seedSocietyEvents({
  societyId,
  authorId,
}: SeedEventsOptions) {
  console.log("Seeding society events...");

  try {
    const existing = await db
      .select({
        title: societyEvents.title,
        startTime: societyEvents.startTime,
      })
      .from(societyEvents)
      .where(eq(societyEvents.societyId, societyId));

    const existingSet = new Set(
      existing.map((e) => `${e.title}-${new Date(e.startTime).toISOString()}`),
    );

    const now = new Date();

    const dummyEvents = [
      {
        title: "Orientation Session",
        description: "Introduction session for new members.",
        location: "Main Hall",
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          now.getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        ),
      },
      {
        title: "Tech Talk",
        description: "A session on modern web development trends.",
        location: "Auditorium",
        startTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          now.getTime() + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
        ),
      },
      {
        title: "Networking Meetup",
        description: "Meet and connect with fellow members.",
        location: "Conference Room",
        startTime: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          now.getTime() + 6 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        ),
      },
      {
        title: "Workshop: Backend Scaling",
        description: "Hands-on workshop on scaling backend systems.",
        location: "Lab 2",
        startTime: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          now.getTime() + 8 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
        ),
      },
      {
        title: "Annual Meetup",
        description: "Biggest gathering of the year.",
        location: "Grand Hall",
        startTime: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          now.getTime() + 15 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000,
        ),
      },
    ];

    const newEvents = dummyEvents.filter((event) => {
      const key = `${event.title}-${event.startTime.toISOString()}`;
      return !existingSet.has(key);
    });

    if (!newEvents.length) {
      console.log("No new events to insert");
      return;
    }

    const eventsToInsert = newEvents.map((event) => ({
      societyId,
      authorId,
      title: event.title,
      description: event.description,
      location: event.location,
      startTime: event.startTime,
      endTime: event.endTime,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9Np45yaS3VLxFNVvrk59BkpxgfqmmUE86w&s",
      status: "upcoming" as const,
    }));

    const inserted = await db
      .insert(societyEvents)
      .values(eventsToInsert)
      .returning({
        id: societyEvents.id,
        title: societyEvents.title,
      });

    console.log(`Inserted ${inserted.length} events`);
    console.table(inserted);

    return inserted;
  } catch (error) {
    console.error("Seeding events failed:", error);
    throw error;
  }
}
