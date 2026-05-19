import { NextFunction, Request, Response } from "express";

import { env } from "@/common/utils/envConfig";
import { errorParser, uuidErrorHandler } from "@/utils/errorParser.util";
import { logger } from "@/common/middleware/requestLogger";
import { db } from "@/db/client";
import {
  emailOtps,
  savedSocietyEvents,
  savedSocietyPosts,
  societies,
  societyEvents,
  societyMembers,
  societyPosts,
  users,
} from "@/db";
import { and, desc, eq, sql } from "drizzle-orm";

class StudentController {
  constructor() {
    this.getAllSocieites = this.getAllSocieites.bind(this);
  }

  async getAllSocieites(req: Request, res: Response, next: NextFunction) {
    const controller = "getAllSocieites";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_all_societies_initiated",
        requestId,
      });

      const values = {
        id: societies.id,
        title: societies.title,
        description: societies.description,
        status: societies.status,
        createdAt: societies.createdAt,
        updatedAt: societies.updatedAt,
      };

      const result = await db
        .select({
          ...values,
          memberCount: sql<number>`count(${societyMembers.id})`,
        })
        .from(societies)
        .leftJoin(
          societyMembers,
          and(
            eq(societyMembers.societyId, societies.id),
            eq(societyMembers.status, "active"),
          ),
        )
        .groupBy(societies.id);

      logger.info({
        controller,
        event: "get_all_societies_success",
        requestId,
        metadata: {
          count: result.length,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_all_societies_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    const controller = "getAllEvents";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_all_events_initiated",
        requestId,
      });

      const result = await db
        .select({
          id: societyEvents.id,

          title: societyEvents.title,
          description: societyEvents.description,

          image: societyEvents.image,

          location: societyEvents.location,

          startTime: societyEvents.startTime,
          endTime: societyEvents.endTime,

          status: societyEvents.status,

          createdAt: societyEvents.createdAt,
          updatedAt: societyEvents.updatedAt,

          society: {
            id: societies.id,
            title: societies.title,
            description: societies.description,
            status: societies.status,
          },
        })
        .from(societyEvents)
        .innerJoin(societies, eq(societyEvents.societyId, societies.id))
        .orderBy(desc(societyEvents.createdAt));

      logger.info({
        controller,
        event: "get_all_events_success",
        requestId,
        metadata: {
          count: result.length,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_all_events_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getSocietyDetails(req: Request, res: Response, next: NextFunction) {
    const controller = "getSocietyDetails";
    const requestId = req.id;

    const user = req?.body?.user;

    console.log(user);

    try {
      logger.info({
        controller,
        event: "get_society_details_initiated",
        requestId,
      });

      const { id } = req.params;

      if (!id || !uuidErrorHandler(id)) {
        logger.warn({
          controller,
          event: "invalid_society_id",
          requestId,
          metadata: {
            societyId: id,
          },
        });

        return res.status(400).json({
          message: "Invalid society id provided.",
        });
      }

      const societyResult = await db
        .select({
          id: societies.id,

          title: societies.title,
          description: societies.description,

          status: societies.status,

          createdAt: societies.createdAt,
          updatedAt: societies.updatedAt,
        })
        .from(societies)
        .where(eq(societies.id, id))
        .limit(1);

      const society = societyResult[0];

      if (!society) {
        logger.warn({
          controller,
          event: "society_not_found",
          requestId,
          metadata: {
            societyId: id,
          },
        });

        return res.status(404).json({
          message: "Society not found.",
        });
      }

      const members = await db
        .select({
          id: societyMembers.id,

          role: societyMembers.role,
          status: societyMembers.status,

          joinedAt: societyMembers.joinedAt,

          user: {
            userName: users.userName,
            userId: users.id,
          },
        })
        .from(societyMembers)
        .innerJoin(users, eq(societyMembers.userId, users.id))
        .where(eq(societyMembers.societyId, id))
        .orderBy(desc(societyMembers.joinedAt));

      const userId = user?.id;

      const posts = await db
        .select({
          id: societyPosts.id,

          title: societyPosts.title,
          description: societyPosts.description,

          image: societyPosts.image,

          isPublished: societyPosts.isPublished,

          isSaved: sql<boolean>`
      CASE
        WHEN ${savedSocietyPosts.id} IS NOT NULL THEN true
        ELSE false
      END
    `,

          createdAt: societyPosts.createdAt,
          updatedAt: societyPosts.updatedAt,
        })
        .from(societyPosts)
        .leftJoin(
          savedSocietyPosts,
          and(
            eq(savedSocietyPosts.postId, societyPosts.id),
            eq(savedSocietyPosts.userId, userId),
          ),
        )
        .where(
          and(
            eq(societyPosts.societyId, id),
            eq(societyPosts.isPublished, true),
          ),
        )
        .orderBy(desc(societyPosts.createdAt));

      const events = await db
        .select({
          id: societyEvents.id,

          title: societyEvents.title,
          description: societyEvents.description,

          image: societyEvents.image,

          location: societyEvents.location,

          startTime: societyEvents.startTime,
          endTime: societyEvents.endTime,

          status: societyEvents.status,

          isSaved: sql<boolean>`
      CASE
        WHEN ${savedSocietyEvents.id} IS NOT NULL THEN true
        ELSE false
      END
    `,

          createdAt: societyEvents.createdAt,
          updatedAt: societyEvents.updatedAt,
        })
        .from(societyEvents)
        .leftJoin(
          savedSocietyEvents,
          and(
            eq(savedSocietyEvents.eventId, societyEvents.id),
            eq(savedSocietyEvents.userId, userId),
          ),
        )
        .where(eq(societyEvents.societyId, id))
        .orderBy(desc(societyEvents.createdAt));

      const societyData = {
        ...society,
        members,
        posts,
        events,
      };

      logger.info({
        controller,
        event: "get_society_details_success",
        requestId,
        metadata: {
          societyId: id,
          membersCount: members.length,
          postsCount: posts.length,
          eventsCount: events.length,
        },
      });

      return res.status(200).json(societyData);
    } catch (error) {
      logger.error({
        controller,
        event: "get_society_details_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async getEventDetails(req: Request, res: Response, next: NextFunction) {
    const controller = "getEventDetails";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_event_details_initiated",
        requestId,
      });

      const { id } = req.params;

      if (!id || !uuidErrorHandler(id)) {
        logger.warn({
          controller,
          event: "invalid_event_id",
          requestId,
          metadata: {
            eventId: id,
          },
        });

        return res.status(400).json({
          message: "Invalid event id provided.",
        });
      }

      const result = await db
        .select({
          id: societyEvents.id,

          title: societyEvents.title,
          description: societyEvents.description,

          image: societyEvents.image,

          location: societyEvents.location,

          startTime: societyEvents.startTime,
          endTime: societyEvents.endTime,

          status: societyEvents.status,

          createdAt: societyEvents.createdAt,
          updatedAt: societyEvents.updatedAt,

          society: {
            id: societies.id,
            title: societies.title,
            description: societies.description,
            status: societies.status,

            createdAt: societies.createdAt,
            updatedAt: societies.updatedAt,
          },
        })
        .from(societyEvents)
        .innerJoin(societies, eq(societyEvents.societyId, societies.id))
        .where(eq(societyEvents.id, id))
        .limit(1);

      if (!result.length) {
        logger.warn({
          controller,
          event: "event_not_found",
          requestId,
          metadata: {
            eventId: id,
          },
        });

        return res.status(404).json({
          message: "Event not found.",
        });
      }

      logger.info({
        controller,
        event: "get_event_details_success",
        requestId,
        metadata: {
          eventId: id,
        },
      });

      return res.status(200).json(result[0]);
    } catch (error) {
      logger.error({
        controller,
        event: "get_event_details_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async joinSociety(req: Request, res: Response, next: NextFunction) {
    const controller = "joinSociety";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "join_society_initiated",
        requestId,
      });

      const { id } = req.params;

      if (!id || !uuidErrorHandler(id)) {
        logger.warn({
          controller,
          event: "invalid_society_id",
          requestId,
          metadata: {
            societyId: id,
          },
        });

        return res.status(400).json({
          message: "Invalid society id provided.",
        });
      }

      const userId = req.body.user.id;

      const society = await db
        .select({
          id: societies.id,
          title: societies.title,
          status: societies.status,
        })
        .from(societies)
        .where(eq(societies.id, id))
        .limit(1);

      if (!society.length) {
        logger.warn({
          controller,
          event: "society_not_found",
          requestId,
          metadata: {
            societyId: id,
          },
        });

        return res.status(404).json({
          message: "Society not found.",
        });
      }

      const existingMember = await db
        .select({
          id: societyMembers.id,
          status: societyMembers.status,
        })
        .from(societyMembers)
        .where(
          and(
            eq(societyMembers.societyId, id),
            eq(societyMembers.userId, userId),
          ),
        )
        .limit(1);

      if (existingMember.length) {
        logger.warn({
          controller,
          event: "user_already_joined_society",
          requestId,
          metadata: {
            societyId: id,
            userId,
          },
        });

        return res.status(409).json({
          message: "You are already a member of this society.",
        });
      }

      const result = await db
        .insert(societyMembers)
        .values({
          societyId: id,
          userId,
          role: "member",
          status: "active",
        })
        .returning({
          id: societyMembers.id,

          societyId: societyMembers.societyId,
          userId: societyMembers.userId,

          role: societyMembers.role,
          status: societyMembers.status,

          joinedAt: societyMembers.joinedAt,
        });

      logger.info({
        controller,
        event: "join_society_success",
        requestId,
        metadata: {
          societyId: id,
          userId,
          membershipId: result[0].id,
        },
      });

      return res.status(201).json({
        message: "Successfully joined the society.",
      });
    } catch (error) {
      logger.error({
        controller,
        event: "join_society_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async leaveSociety(req: Request, res: Response, next: NextFunction) {
    const controller = "leaveSociety";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "leave_society_initiated",
        requestId,
      });

      const { id } = req.params;

      if (!id || !uuidErrorHandler(id)) {
        logger.warn({
          controller,
          event: "invalid_society_id",
          requestId,
          metadata: {
            societyId: id,
          },
        });

        return res.status(400).json({
          message: "Invalid society id provided.",
        });
      }

      const userId = req.body.user.id;

      const society = await db
        .select({
          id: societies.id,
          title: societies.title,
          status: societies.status,
        })
        .from(societies)
        .where(eq(societies.id, id))
        .limit(1);

      if (!society.length) {
        logger.warn({
          controller,
          event: "society_not_found",
          requestId,
          metadata: {
            societyId: id,
          },
        });

        return res.status(404).json({
          message: "Society not found.",
        });
      }

      const existingMember = await db
        .select({
          id: societyMembers.id,
          role: societyMembers.role,
          status: societyMembers.status,
        })
        .from(societyMembers)
        .where(
          and(
            eq(societyMembers.societyId, id),
            eq(societyMembers.userId, userId),
          ),
        )
        .limit(1);

      if (!existingMember.length) {
        logger.warn({
          controller,
          event: "membership_not_found",
          requestId,
          metadata: {
            societyId: id,
            userId,
          },
        });

        return res.status(404).json({
          message: "You are not a member of this society.",
        });
      }

      await db
        .delete(societyMembers)
        .where(eq(societyMembers.id, existingMember[0].id));

      logger.info({
        controller,
        event: "leave_society_success",
        requestId,
        metadata: {
          societyId: id,
          userId,
          membershipId: existingMember[0].id,
        },
      });

      return res.status(200).json({
        message: "Successfully left the society.",
      });
    } catch (error) {
      logger.error({
        controller,
        event: "leave_society_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async savePost(req: Request, res: Response, next: NextFunction) {
    const controller = "savePost";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "save_post_initiated",
        requestId,
      });

      const { user } = req.body;

      const userId = user?.id;
      const { postId } = req.params;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      if (!postId || !uuidErrorHandler(postId)) {
        logger.warn({
          controller,
          event: "invalid_post_id",
          requestId,
          metadata: {
            postId,
          },
        });

        return res.status(400).json({
          message: "Invalid post id",
        });
      }

      const existingSavedPost = await db
        .select({
          id: savedSocietyPosts.id,
        })
        .from(savedSocietyPosts)
        .where(
          and(
            eq(savedSocietyPosts.userId, userId),
            eq(savedSocietyPosts.postId, postId),
          ),
        )
        .limit(1);

      if (existingSavedPost.length > 0) {
        await db
          .delete(savedSocietyPosts)
          .where(eq(savedSocietyPosts.id, existingSavedPost[0].id));

        logger.info({
          controller,
          event: "post_unsaved_success",
          requestId,
          metadata: {
            userId,
            postId,
          },
        });

        return res.status(200).json({
          saved: false,
          message: "Post removed from saved list",
        });
      }

      await db.insert(savedSocietyPosts).values({
        userId,
        postId,
      });

      logger.info({
        controller,
        event: "post_saved_success",
        requestId,
        metadata: {
          userId,
          postId,
        },
      });

      return res.status(200).json({
        saved: true,
        message: "Post saved successfully",
      });
    } catch (error) {
      logger.error({
        controller,
        event: "save_post_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async saveEvent(req: Request, res: Response, next: NextFunction) {
    const controller = "saveEvent";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "save_event_initiated",
        requestId,
      });

      const { user } = req.body;

      const userId = user?.id;
      const { eventId } = req.params;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      if (!eventId || !uuidErrorHandler(eventId)) {
        logger.warn({
          controller,
          event: "invalid_event_id",
          requestId,
          metadata: {
            eventId,
          },
        });

        return res.status(400).json({
          message: "Invalid event id",
        });
      }

      const existingSavedEvent = await db
        .select({
          id: savedSocietyEvents.id,
        })
        .from(savedSocietyEvents)
        .where(
          and(
            eq(savedSocietyEvents.userId, userId),
            eq(savedSocietyEvents.eventId, eventId),
          ),
        )
        .limit(1);

      if (existingSavedEvent.length > 0) {
        await db
          .delete(savedSocietyEvents)
          .where(eq(savedSocietyEvents.id, existingSavedEvent[0].id));

        logger.info({
          controller,
          event: "event_unsaved_success",
          requestId,
          metadata: {
            userId,
            eventId,
          },
        });

        return res.status(200).json({
          saved: false,
          message: "Event removed from saved list",
        });
      }

      await db.insert(savedSocietyEvents).values({
        userId,
        eventId,
      });

      logger.info({
        controller,
        event: "event_saved_success",
        requestId,
        metadata: {
          userId,
          eventId,
        },
      });

      return res.status(200).json({
        saved: true,
        message: "Event saved successfully",
      });
    } catch (error) {
      logger.error({
        controller,
        event: "save_event_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async studentDetails(req: Request, res: Response, next: NextFunction) {
    const controller = "studentDetails";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "student_details_initiated",
        requestId,
      });

      const { user } = req.body;

      const userId = user?.id;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      const student = await db
        .select({
          id: users.id,

          userName: users.userName,
          email: users.email,

          role: users.role,
          source: users.source,

          gender: users.gender,

          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (student.length === 0) {
        logger.warn({
          controller,
          event: "student_not_found",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(404).json({
          message: "Student not found",
        });
      }

      const joinedSocieties = await db
        .select({
          membershipId: societyMembers.id,

          role: societyMembers.role,
          status: societyMembers.status,

          joinedAt: societyMembers.joinedAt,

          society: {
            id: societies.id,

            title: societies.title,
            description: societies.description,

            status: societies.status,

            createdAt: societies.createdAt,
          },
        })
        .from(societyMembers)
        .innerJoin(societies, eq(societyMembers.societyId, societies.id))
        .where(eq(societyMembers.userId, userId))
        .orderBy(desc(societyMembers.joinedAt));

      const savedPosts = await db
        .select({
          savedId: savedSocietyPosts.id,

          savedAt: savedSocietyPosts.createdAt,

          post: {
            id: societyPosts.id,

            title: societyPosts.title,
            description: societyPosts.description,

            image: societyPosts.image,

            isPublished: societyPosts.isPublished,

            createdAt: societyPosts.createdAt,
          },

          society: {
            id: societies.id,

            title: societies.title,
          },
        })
        .from(savedSocietyPosts)
        .innerJoin(societyPosts, eq(savedSocietyPosts.postId, societyPosts.id))
        .innerJoin(societies, eq(societyPosts.societyId, societies.id))
        .where(eq(savedSocietyPosts.userId, userId))
        .orderBy(desc(savedSocietyPosts.createdAt));

      const savedEvents = await db
        .select({
          savedId: savedSocietyEvents.id,

          savedAt: savedSocietyEvents.createdAt,

          event: {
            id: societyEvents.id,

            title: societyEvents.title,
            description: societyEvents.description,

            image: societyEvents.image,

            location: societyEvents.location,

            startTime: societyEvents.startTime,
            endTime: societyEvents.endTime,

            status: societyEvents.status,

            createdAt: societyEvents.createdAt,
          },

          society: {
            id: societies.id,

            title: societies.title,
          },
        })
        .from(savedSocietyEvents)
        .innerJoin(
          societyEvents,
          eq(savedSocietyEvents.eventId, societyEvents.id),
        )
        .innerJoin(societies, eq(societyEvents.societyId, societies.id))
        .where(eq(savedSocietyEvents.userId, userId))
        .orderBy(desc(savedSocietyEvents.createdAt));

      const response = {
        student: student[0],

        analytics: {
          joinedSocieties: joinedSocieties.length,
          savedPosts: savedPosts.length,
          savedEvents: savedEvents.length,
        },

        joinedSocieties,
        savedPosts,
        savedEvents,
      };

      logger.info({
        controller,
        event: "student_details_success",
        requestId,
        metadata: {
          userId,
          joinedSocietiesCount: joinedSocieties.length,
          savedPostsCount: savedPosts.length,
          savedEventsCount: savedEvents.length,
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      logger.error({
        controller,
        event: "student_details_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async joinedSocieties(req: Request, res: Response, next: NextFunction) {
    const controller = "joinedSocieties";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "joined_societies_initiated",
        requestId,
      });

      const { user } = req.body;

      const userId = user?.id;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      const result = await db
        .select({
          membershipId: societyMembers.id,

          role: societyMembers.role,
          memberStatus: societyMembers.status,
          joinedAt: societyMembers.joinedAt,

          society: {
            id: societies.id,

            title: societies.title,
            description: societies.description,

            status: societies.status,

            createdAt: societies.createdAt,
            updatedAt: societies.updatedAt,
          },
        })
        .from(societyMembers)
        .innerJoin(societies, eq(societyMembers.societyId, societies.id))
        .where(eq(societyMembers.userId, userId))
        .orderBy(desc(societyMembers.joinedAt));

      logger.info({
        controller,
        event: "joined_societies_success",
        requestId,
        metadata: {
          count: result.length,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "joined_societies_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async savedPosts(req: Request, res: Response, next: NextFunction) {
    const controller = "savedPosts";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "saved_posts_initiated",
        requestId,
      });

      const { user } = req.body;

      const userId = user?.id;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      const result = await db
        .select({
          savedId: savedSocietyPosts.id,

          savedAt: savedSocietyPosts.createdAt,

          post: {
            id: societyPosts.id,

            title: societyPosts.title,
            description: societyPosts.description,

            image: societyPosts.image,

            isPublished: societyPosts.isPublished,

            createdAt: societyPosts.createdAt,
            updatedAt: societyPosts.updatedAt,
          },

          society: {
            id: societies.id,

            title: societies.title,
            description: societies.description,

            status: societies.status,
          },

          author: {
            id: users.id,

            userName: users.userName,
            email: users.email,
          },
        })
        .from(savedSocietyPosts)
        .innerJoin(societyPosts, eq(savedSocietyPosts.postId, societyPosts.id))
        .innerJoin(societies, eq(societyPosts.societyId, societies.id))
        .innerJoin(users, eq(societyPosts.authorId, users.id))
        .where(eq(savedSocietyPosts.userId, userId))
        .orderBy(desc(savedSocietyPosts.createdAt));

      logger.info({
        controller,
        event: "saved_posts_success",
        requestId,
        metadata: {
          count: result.length,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "saved_posts_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }

  async savedEvents(req: Request, res: Response, next: NextFunction) {
    const controller = "savedEvents";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "saved_events_initiated",
        requestId,
      });

      const { user } = req.body;

      const userId = user?.id;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: {
            userId,
          },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      const result = await db
        .select({
          savedId: savedSocietyEvents.id,

          savedAt: savedSocietyEvents.createdAt,

          event: {
            id: societyEvents.id,

            title: societyEvents.title,
            description: societyEvents.description,

            image: societyEvents.image,

            location: societyEvents.location,

            startTime: societyEvents.startTime,
            endTime: societyEvents.endTime,

            status: societyEvents.status,

            createdAt: societyEvents.createdAt,
            updatedAt: societyEvents.updatedAt,
          },

          society: {
            id: societies.id,

            title: societies.title,
            description: societies.description,

            status: societies.status,
          },

          author: {
            id: users.id,

            userName: users.userName,
            email: users.email,
          },
        })
        .from(savedSocietyEvents)
        .innerJoin(
          societyEvents,
          eq(savedSocietyEvents.eventId, societyEvents.id),
        )
        .innerJoin(societies, eq(societyEvents.societyId, societies.id))
        .innerJoin(users, eq(societyEvents.authorId, users.id))
        .where(eq(savedSocietyEvents.userId, userId))
        .orderBy(desc(savedSocietyEvents.createdAt));

      logger.info({
        controller,
        event: "saved_events_success",
        requestId,
        metadata: {
          count: result.length,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "saved_events_failed",
        requestId,
        metadata: {
          error,
        },
      });

      return next(error);
    }
  }
}

export const studentController = new StudentController();
