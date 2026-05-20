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
import {
  multerConfig,
  streamUploadToCloudinary,
} from "@/utils/cloudinary.util";
import {
  createSocietyEventSchema,
  createSocietyPostSchema,
} from "./societyHead.validator";

const upload = multerConfig.single("image");

class SocietyHeadController {
  constructor() {
    this.getMySocieties = this.getMySocieties.bind(this);
  }
  async societyHeadAnalytics(req: Request, res: Response, next: NextFunction) {
    const controller = "societyHeadAnalytics";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "society_head_analytics_initiated",
        requestId,
      });

      const userId = req.body.user?.id;

      if (!userId) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: { userId },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      const [societiesHeadCount, totalPosts, totalEvents, topEvents] =
        await Promise.all([
          db
            .select({
              count: sql<number>`count(*)`,
            })
            .from(societyMembers)
            .where(
              and(
                eq(societyMembers.userId, userId),
                eq(societyMembers.role, "society_head"),
                eq(societyMembers.status, "active"),
              ),
            ),

          db
            .select({
              count: sql<number>`count(*)`,
            })
            .from(societyPosts)
            .where(eq(societyPosts.authorId, userId)),

          db
            .select({
              count: sql<number>`count(*)`,
            })
            .from(societyEvents)
            .where(eq(societyEvents.authorId, userId)),

          db
            .select({
              id: societyEvents.id,
              title: societyEvents.title,
              description: societyEvents.description,
              image: societyEvents.image,
              location: societyEvents.location,
              status: societyEvents.status,
              startTime: societyEvents.startTime,
              endTime: societyEvents.endTime,
              createdAt: societyEvents.createdAt,

              society: {
                id: societies.id,
                title: societies.title,
              },
            })
            .from(societyEvents)
            .innerJoin(societies, eq(societyEvents.societyId, societies.id))
            .where(eq(societyEvents.authorId, userId))
            .orderBy(desc(societyEvents.createdAt))
            .limit(3),
        ]);

      const analytics = {
        societiesHeadCount: Number(societiesHeadCount[0]?.count) || 0,

        totalPosts: Number(totalPosts[0]?.count) || 0,

        totalEvents: Number(totalEvents[0]?.count) || 0,

        topEvents,
      };

      logger.info({
        controller,
        event: "society_head_analytics_success",
        requestId,
        metadata: analytics,
      });

      return res.status(200).json(analytics);
    } catch (error) {
      logger.error({
        controller,
        event: "society_head_analytics_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }
  async getMySocieties(req: Request, res: Response, next: NextFunction) {
    const controller = "getMySocieties";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_my_societies_initiated",
        requestId,
      });

      const userId = req.body.user.id;

      if (!userId) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: { userId },
        });

        return res.status(400).json({
          message: "Invalid user id",
        });
      }

      const values: any = {
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
        .from(societyMembers)
        .innerJoin(societies, eq(societyMembers.societyId, societies.id))
        .where(
          and(
            eq(societyMembers.userId, userId),
            eq(societyMembers.role, "society_head"),
            eq(societyMembers.status, "active"),
          ),
        )
        .groupBy(societies.id);

      logger.info({
        controller,
        event: "get_my_societies_success",
        requestId,
        metadata: { count: result.length },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_my_societies_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getMyPosts(req: Request, res: Response, next: NextFunction) {
    const controller = "getMyPosts";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_my_posts_initiated",
        requestId,
      });

      const userId = req.body.user?.id;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: { userId },
        });

        return res.status(400).json({
          message: "Valid user id is required.",
        });
      }

      const values = {
        id: societyPosts.id,
        title: societyPosts.title,
        description: societyPosts.description,
        image: societyPosts.image,
        createdAt: societyPosts.createdAt,
        societyId: societyPosts.societyId,
      };

      const result = await db
        .select(values)
        .from(societyPosts)
        .innerJoin(
          societyMembers,
          eq(societyPosts.societyId, societyMembers.societyId),
        )
        .where(
          and(
            eq(societyPosts.authorId, userId),
            eq(societyMembers.userId, userId),
            eq(societyMembers.role, "society_head"),
            eq(societyMembers.status, "active"),
            eq(societyPosts.isPublished, true),
          ),
        )
        .orderBy(desc(societyPosts.createdAt));

      logger.info({
        controller,
        event: "get_my_posts_success",
        requestId,
        metadata: { count: result.length },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_my_posts_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getMyEvents(req: Request, res: Response, next: NextFunction) {
    const controller = "getMyEvents";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_my_events_initiated",
        requestId,
      });

      const userId = req.body.user?.id;

      if (!userId || !uuidErrorHandler(userId)) {
        logger.warn({
          controller,
          event: "invalid_user_id",
          requestId,
          metadata: { userId },
        });

        return res.status(400).json({
          message: "Valid user id is required.",
        });
      }

      const values = {
        id: societyEvents.id,
        title: societyEvents.title,
        description: societyEvents.description,
        image: societyEvents.image,
        location: societyEvents.location,
        startTime: societyEvents.startTime,
        endTime: societyEvents.endTime,
        status: societyEvents.status,
        createdAt: societyEvents.createdAt,
        societyId: societyEvents.societyId,
      };

      const result = await db
        .select(values)
        .from(societyEvents)
        .innerJoin(
          societyMembers,
          eq(societyEvents.societyId, societyMembers.societyId),
        )
        .where(
          and(
            eq(societyEvents.authorId, userId),
            eq(societyMembers.userId, userId),
            eq(societyMembers.role, "society_head"),
            eq(societyMembers.status, "active"),
          ),
        )
        .orderBy(desc(societyEvents.createdAt));

      logger.info({
        controller,
        event: "get_my_events_success",
        requestId,
        metadata: { count: result.length },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_my_events_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getMySocietiesPosts(req: Request, res: Response, next: NextFunction) {
    const controller = "getMySocietiesPosts";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_my_societies_posts_initiated",
        requestId,
      });

      const { id: societyId } = req.params;

      if (!societyId || !uuidErrorHandler(societyId)) {
        logger.warn({
          controller,
          event: "invalid_society_id",
          requestId,
          metadata: { societyId },
        });

        return res.status(400).json({
          message: "Valid society id is required.",
        });
      }

      const userId = req.body.user.id;

      const values = {
        id: societyPosts.id,
        title: societyPosts.title,
        description: societyPosts.description,
        image: societyPosts.image,
        createdAt: societyPosts.createdAt,
      };

      const result = await db
        .select(values)
        .from(societyPosts)
        .innerJoin(
          societyMembers,
          eq(societyPosts.societyId, societyMembers.societyId),
        )
        .where(
          and(
            eq(societyPosts.societyId, societyId),
            eq(societyPosts.authorId, userId),
            eq(societyMembers.userId, userId),
            eq(societyMembers.role, "society_head"),
            eq(societyMembers.status, "active"),
            eq(societyPosts.isPublished, true),
          ),
        )
        .orderBy(desc(societyPosts.createdAt));

      logger.info({
        controller,
        event: "get_my_societies_posts_success",
        requestId,
        metadata: { count: result.length },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_my_societies_posts_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async createSocietyPost(req: Request, res: Response, next: NextFunction) {
    const controller = "createSocietyPost";
    const requestId = req.id;

    const { id: societyId } = req.params;
    const userId = req.body.user?.id;

    logger.info({
      controller,
      event: "society_post_creation_initiated",
      requestId,
      metadata: { societyId, userId },
    });

    if (!societyId || !uuidErrorHandler(societyId)) {
      logger.warn({
        controller,
        event: "invalid_society_id",
        requestId,
        metadata: { societyId },
      });

      return res.status(400).json({
        message: "Valid society id is required.",
      });
    }

    if (!userId || !uuidErrorHandler(userId)) {
      logger.warn({
        controller,
        event: "invalid_user_id",
        requestId,
        metadata: { userId },
      });

      return res.status(400).json({
        message: "Valid user id is required.",
      });
    }

    upload(req, res, async (err) => {
      if (err) {
        logger.warn({
          controller,
          event: "multer_upload_failed",
          requestId,
          error: err.message,
        });

        return res.status(400).json({
          message: "Image upload failed.",
        });
      }

      const parsed = createSocietyPostSchema.safeParse(req.body);

      if (!parsed.success) {
        logger.warn({
          controller,
          event: "validation_failed",
          requestId,
          errors: parsed.error.flatten(),
        });

        return res.status(400).json({
          message: "Validation failed.",
        });
      }

      const { title, description, isPublished } = parsed.data;

      try {
        let imageUrl: string | null = null;

        if (req.file) {
          imageUrl = await streamUploadToCloudinary(req.file.buffer);
        }

        const inserted = await db
          .insert(societyPosts)
          .values({
            societyId,
            authorId: userId,
            title,
            description,
            image: imageUrl,
            isPublished: isPublished ?? true,
          })
          .returning({ id: societyPosts.id });

        logger.info({
          controller,
          event: "society_post_creation_success",
          requestId,
          metadata: { postId: inserted[0].id },
        });

        return res.status(201).json({
          message: "Post created successfully.",
        });
      } catch (error: any) {
        const pgError = error?.cause;

        if (pgError?.code) {
          switch (pgError.code) {
            case "23503":
              logger.warn({
                controller,
                event: "foreign_key_violation",
                requestId,
                detail: pgError.detail,
              });

              return res.status(400).json({
                message: "Invalid society or user reference.",
              });

            case "23502":
              logger.warn({
                controller,
                event: "not_null_violation",
                requestId,
                detail: pgError.detail,
              });

              return res.status(400).json({
                message: "Missing required database field.",
              });

            default:
              logger.error({
                controller,
                event: "unhandled_pg_error",
                requestId,
                code: pgError.code,
                detail: pgError.detail,
              });

              return res.status(500).json({
                message: "Database error occurred.",
              });
          }
        }

        logger.error({
          controller,
          event: "society_post_creation_failed",
          requestId,
          error: error.message,
        });

        return res.status(500).json({
          message: "Failed to create post.",
        });
      }
    });
  }

  async updateSocietyPost(req: Request, res: Response, next: NextFunction) {
    const controller = "updateSocietyPost";
    const requestId = req.id;

    const { id: postId } = req.params;
    const userId = req.body.user?.id;

    logger.info({
      controller,
      event: "society_post_update_initiated",
      requestId,
      metadata: { postId, userId },
    });

    if (!postId || !uuidErrorHandler(postId)) {
      logger.warn({
        controller,
        event: "invalid_post_id",
        requestId,
        metadata: { postId },
      });

      return res.status(400).json({
        message: "Valid post id is required.",
      });
    }

    if (!userId || !uuidErrorHandler(userId)) {
      return res.status(400).json({
        message: "Valid user id is required.",
      });
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Image upload failed.",
        });
      }

      const parsed = createSocietyPostSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed.",
        });
      }

      const { title, description, isPublished } = parsed.data;

      try {
        let imageUrl: string | undefined;

        if (req.file) {
          imageUrl = await streamUploadToCloudinary(req.file.buffer);
        }

        const existing = await db
          .select()
          .from(societyPosts)
          .where(eq(societyPosts.id, postId));

        if (!existing.length) {
          return res.status(404).json({
            message: "Post not found.",
          });
        }

        if (existing[0].authorId !== userId) {
          return res.status(403).json({
            message: "You are not allowed to update this post.",
          });
        }

        await db
          .update(societyPosts)
          .set({
            title,
            description,
            isPublished,
            ...(imageUrl && { image: imageUrl }),
          })
          .where(eq(societyPosts.id, postId));

        logger.info({
          controller,
          event: "society_post_update_success",
          requestId,
          metadata: { postId },
        });

        return res.status(200).json({
          message: "Post updated successfully.",
        });
      } catch (error: any) {
        logger.error({
          controller,
          event: "society_post_update_failed",
          requestId,
          error: error.message,
        });

        return res.status(500).json({
          message: "Failed to update post.",
        });
      }
    });
  }

  async deleteSocietyPost(req: Request, res: Response, next: NextFunction) {
    const controller = "deleteSocietyPost";
    const requestId = req.id;

    const { id: postId } = req.params;
    const userId = req.body.user?.id;

    logger.info({
      controller,
      event: "society_post_delete_initiated",
      requestId,
      metadata: { postId, userId },
    });

    if (!postId || !uuidErrorHandler(postId)) {
      return res.status(400).json({
        message: "Valid post id is required.",
      });
    }

    try {
      const existing = await db
        .select()
        .from(societyPosts)
        .where(eq(societyPosts.id, postId));

      if (!existing.length) {
        return res.status(404).json({
          message: "Post not found.",
        });
      }

      if (existing[0].authorId !== userId) {
        return res.status(403).json({
          message: "You are not allowed to delete this post.",
        });
      }

      await db.delete(societyPosts).where(eq(societyPosts.id, postId));

      logger.info({
        controller,
        event: "society_post_delete_success",
        requestId,
        metadata: { postId },
      });

      return res.status(200).json({
        message: "Post deleted successfully.",
      });
    } catch (error: any) {
      logger.error({
        controller,
        event: "society_post_delete_failed",
        requestId,
        error: error.message,
      });

      return res.status(500).json({
        message: "Failed to delete post.",
      });
    }
  }

  async getSocietyPostById(req: Request, res: Response, next: NextFunction) {
    const controller = "getSocietyPostById";
    const requestId = req.id;

    const { id: postId } = req.params;

    logger.info({
      controller,
      event: "get_society_post_initiated",
      requestId,
      metadata: { postId },
    });

    if (!postId || !uuidErrorHandler(postId)) {
      return res.status(400).json({
        message: "Valid post id is required.",
      });
    }

    try {
      const post = await db
        .select()
        .from(societyPosts)
        .where(eq(societyPosts.id, postId));

      if (!post.length) {
        return res.status(404).json({
          message: "Post not found.",
        });
      }

      return res.status(200).json(post[0]);
    } catch (error: any) {
      logger.error({
        controller,
        event: "get_society_post_failed",
        requestId,
        error: error.message,
      });

      return res.status(500).json({
        message: "Failed to fetch post.",
      });
    }
  }

  async getMySocietiesEvents(req: Request, res: Response, next: NextFunction) {
    const controller = "getMySocietiesEvents";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_my_societies_events_initiated",
        requestId,
      });

      const { id: societyId } = req.params;

      if (!societyId || !uuidErrorHandler(societyId)) {
        logger.warn({
          controller,
          event: "invalid_society_id",
          requestId,
          metadata: { societyId },
        });

        return res.status(400).json({
          message: "Valid society id is required.",
        });
      }

      const userId = req.body.user.id;

      const values = {
        id: societyEvents.id,
        title: societyEvents.title,
        description: societyEvents.description,
        image: societyEvents.image,
        location: societyEvents.location,
        startTime: societyEvents.startTime,
        endTime: societyEvents.endTime,
        status: societyEvents.status,
        createdAt: societyEvents.createdAt,
      };

      const result = await db
        .select(values)
        .from(societyEvents)
        .innerJoin(
          societyMembers,
          eq(societyEvents.societyId, societyMembers.societyId),
        )
        .where(
          and(
            eq(societyEvents.societyId, societyId),
            eq(societyEvents.authorId, userId),
            eq(societyMembers.userId, userId),
            eq(societyMembers.role, "society_head"),
            eq(societyMembers.status, "active"),
          ),
        )
        .orderBy(desc(societyEvents.createdAt));

      logger.info({
        controller,
        event: "get_my_societies_events_success",
        requestId,
        metadata: { count: result.length },
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error({
        controller,
        event: "get_my_societies_events_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async createSocietyEvent(req: Request, res: Response, next: NextFunction) {
    const controller = "createSocietyEvent";
    const requestId = req.id;

    const { id: societyId } = req.params;
    const userId = req.body.user?.id;

    logger.info({
      controller,
      event: "society_event_creation_initiated",
      requestId,
      metadata: { societyId, userId },
    });

    if (!societyId || !uuidErrorHandler(societyId)) {
      logger.warn({
        controller,
        event: "invalid_society_id",
        requestId,
        metadata: { societyId },
      });

      return res.status(400).json({
        message: "Valid society id is required.",
      });
    }

    if (!userId || !uuidErrorHandler(userId)) {
      logger.warn({
        controller,
        event: "invalid_user_id",
        requestId,
        metadata: { userId },
      });

      return res.status(400).json({
        message: "Valid user id is required.",
      });
    }

    upload(req, res, async (err) => {
      if (err) {
        logger.warn({
          controller,
          event: "multer_upload_failed",
          requestId,
          error: err.message,
        });

        return res.status(400).json({
          message: "Image upload failed.",
        });
      }

      const parsed = createSocietyEventSchema.safeParse(req.body);

      if (!parsed.success) {
        logger.warn({
          controller,
          event: "validation_failed",
          requestId,
          errors: parsed.error.flatten(),
        });

        return res.status(400).json({
          message: "Validation failed.",
        });
      }

      const { title, description, location, startTime, endTime, status } =
        parsed.data;

      try {
        let imageUrl: string | null = null;

        if (req.file) {
          imageUrl = await streamUploadToCloudinary(req.file.buffer);
        }

        const inserted = await db
          .insert(societyEvents)
          .values({
            societyId,
            authorId: userId,
            title,
            description,
            image: imageUrl,
            location,
            startTime: new Date(startTime),
            endTime: endTime ? new Date(endTime) : null,
            status: status ?? "upcoming",
          })
          .returning({ id: societyEvents.id });

        logger.info({
          controller,
          event: "society_event_creation_success",
          requestId,
          metadata: { eventId: inserted[0].id },
        });

        return res.status(201).json({
          message: "Event created successfully.",
        });
      } catch (error: any) {
        const pgError = error?.cause;

        if (pgError?.code) {
          switch (pgError.code) {
            case "23503":
              logger.warn({
                controller,
                event: "foreign_key_violation",
                requestId,
                detail: pgError.detail,
              });

              return res.status(400).json({
                message: "Invalid society or user reference.",
              });

            case "23502":
              logger.warn({
                controller,
                event: "not_null_violation",
                requestId,
                detail: pgError.detail,
              });

              return res.status(400).json({
                message: "Missing required database field.",
              });

            default:
              logger.error({
                controller,
                event: "unhandled_pg_error",
                requestId,
                code: pgError.code,
                detail: pgError.detail,
              });

              return res.status(500).json({
                message: "Database error occurred.",
              });
          }
        }

        logger.error({
          controller,
          event: "society_event_creation_failed",
          requestId,
          error: error.message,
        });

        return res.status(500).json({
          message: "Failed to create event.",
        });
      }
    });
  }

  async updateSocietyEvent(req: Request, res: Response, next: NextFunction) {
    const controller = "updateSocietyEvent";
    const requestId = req.id;

    const { id: eventId } = req.params;
    const userId = req.body.user?.id;

    logger.info({
      controller,
      event: "society_event_update_initiated",
      requestId,
      metadata: { eventId, userId },
    });

    if (!eventId || !uuidErrorHandler(eventId)) {
      logger.warn({
        controller,
        event: "invalid_event_id",
        requestId,
        metadata: { eventId },
      });

      return res.status(400).json({
        message: "Valid event id is required.",
      });
    }

    if (!userId || !uuidErrorHandler(userId)) {
      return res.status(400).json({
        message: "Valid user id is required.",
      });
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Image upload failed.",
        });
      }

      const parsed = createSocietyEventSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed.",
        });
      }

      const { title, description, location, startTime, endTime, status } =
        parsed.data;

      try {
        let imageUrl: string | undefined;

        if (req.file) {
          imageUrl = await streamUploadToCloudinary(req.file.buffer);
        }

        const existing = await db
          .select()
          .from(societyEvents)
          .where(eq(societyEvents.id, eventId));

        if (!existing.length) {
          return res.status(404).json({
            message: "Event not found.",
          });
        }

        if (existing[0].authorId !== userId) {
          return res.status(403).json({
            message: "You are not allowed to update this event.",
          });
        }

        await db
          .update(societyEvents)
          .set({
            title,
            description,
            location,
            startTime: new Date(startTime),
            endTime: endTime ? new Date(endTime) : null,
            status,
            ...(imageUrl && { image: imageUrl }),
          })
          .where(eq(societyEvents.id, eventId));

        logger.info({
          controller,
          event: "society_event_update_success",
          requestId,
          metadata: { eventId },
        });

        return res.status(200).json({
          message: "Event updated successfully.",
        });
      } catch (error: any) {
        logger.error({
          controller,
          event: "society_event_update_failed",
          requestId,
          error: error.message,
        });

        return res.status(500).json({
          message: "Failed to update event.",
        });
      }
    });
  }

  async deleteSocietyEvent(req: Request, res: Response, next: NextFunction) {
    const controller = "deleteSocietyEvent";
    const requestId = req.id;

    const { id: eventId } = req.params;
    const userId = req.body.user?.id;

    logger.info({
      controller,
      event: "society_event_delete_initiated",
      requestId,
      metadata: { eventId, userId },
    });

    if (!eventId || !uuidErrorHandler(eventId)) {
      return res.status(400).json({
        message: "Valid event id is required.",
      });
    }

    if (!userId || !uuidErrorHandler(userId)) {
      return res.status(400).json({
        message: "Valid user id is required.",
      });
    }

    try {
      const existing = await db
        .select()
        .from(societyEvents)
        .where(eq(societyEvents.id, eventId));

      if (!existing.length) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }

      if (existing[0].authorId !== userId) {
        return res.status(403).json({
          message: "You are not allowed to delete this event.",
        });
      }

      await db.delete(societyEvents).where(eq(societyEvents.id, eventId));

      logger.info({
        controller,
        event: "society_event_delete_success",
        requestId,
        metadata: { eventId },
      });

      return res.status(200).json({
        message: "Event deleted successfully.",
      });
    } catch (error: any) {
      logger.error({
        controller,
        event: "society_event_delete_failed",
        requestId,
        error: error.message,
      });

      return res.status(500).json({
        message: "Failed to delete event.",
      });
    }
  }
  async getSocietyEventById(req: Request, res: Response, next: NextFunction) {
    const controller = "getSocietyEventById";
    const requestId = req.id;

    const { id: eventId } = req.params;

    logger.info({
      controller,
      event: "get_society_event_initiated",
      requestId,
      metadata: { eventId },
    });

    if (!eventId || !uuidErrorHandler(eventId)) {
      return res.status(400).json({
        message: "Valid event id is required.",
      });
    }

    try {
      const event = await db
        .select()
        .from(societyEvents)
        .where(eq(societyEvents.id, eventId));

      if (!event.length) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }

      return res.status(200).json(event[0]);
    } catch (error: any) {
      logger.error({
        controller,
        event: "get_society_event_failed",
        requestId,
        error: error.message,
      });

      return res.status(500).json({
        message: "Failed to fetch event.",
      });
    }
  }
}

export const societyHeadController = new SocietyHeadController();
