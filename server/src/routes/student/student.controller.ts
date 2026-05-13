import { NextFunction, Request, Response } from "express";

import { env } from "@/common/utils/envConfig";
import { errorParser, uuidErrorHandler } from "@/utils/errorParser.util";
import { logger } from "@/common/middleware/requestLogger";
import { db } from "@/db/client";
import {
  emailOtps,
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

      const posts = await db
        .select({
          id: societyPosts.id,

          title: societyPosts.title,
          description: societyPosts.description,

          image: societyPosts.image,

          isPublished: societyPosts.isPublished,

          createdAt: societyPosts.createdAt,
          updatedAt: societyPosts.updatedAt,
        })
        .from(societyPosts)
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

          createdAt: societyEvents.createdAt,
          updatedAt: societyEvents.updatedAt,
        })
        .from(societyEvents)
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
}

export const studentController = new StudentController();
