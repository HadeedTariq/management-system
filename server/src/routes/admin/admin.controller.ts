import { NextFunction, Request, Response } from "express";

import { env } from "@/common/utils/envConfig";
import { errorParser, uuidErrorHandler } from "@/utils/errorParser.util";
import { logger } from "@/common/middleware/requestLogger";
import { db } from "@/db/client";
import { createSocietySchema } from "./admin.validator";
import { societies, societyMembers, users } from "@/db";
import { and, desc, eq, sql } from "drizzle-orm";

class AdminController {
  constructor() {
    this.createSociety = this.createSociety.bind(this);
  }

  async createSociety(req: Request, res: Response, next: NextFunction) {
    const controller = "createSociety";
    const requestId = req.id;

    logger.info({
      controller,
      event: "create_society_initiated",
      requestId,
      metadata: { body: req.body },
    });

    const parsed = createSocietySchema.safeParse(req.body);

    if (!parsed.success) {
      logger.warn({
        controller,
        event: "validation_failed",
        requestId,
        metadata: { errors: parsed.error.flatten() },
      });

      return errorParser(parsed, res);
    }

    const data = parsed.data;

    try {
      const [society] = await db
        .insert(societies)
        .values({
          title: data.title,
          description: data.description ?? null,
          status: data.status ?? "active",
        })
        .returning({
          id: societies.id,
        });

      logger.info({
        controller,
        event: "create_society_success",
        requestId,
        metadata: { societyId: society.id },
      });

      return res.status(201).json({
        message: "Society created successfully",
      });
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code) {
        switch (pgError.code) {
          case "23505":
            logger.warn({
              controller,
              event: "duplicate_key_violation",
              requestId,
              metadata: pgError.detail,
            });

            return res.status(409).json({
              message: "Society already exists",
            });

          case "23502":
            return res.status(400).json({
              message: `Missing required field: ${pgError.column}`,
            });

          case "22P02":
            return res.status(400).json({
              message: "Invalid input format",
            });
        }
      }

      logger.error({
        controller,
        event: "create_society_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getSocieties(req: Request, res: Response, next: NextFunction) {
    const controller = "getSocieties";
    const requestId = req.id;

    try {
      logger.info({
        controller,
        event: "get_societies_initiated",
        requestId,
      });

      const values: any = {
        id: societies.id,
        title: societies.title,
        description: societies.description,
        status: societies.status,
        createdAt: societies.createdAt,
        updatedAt: societies.updatedAt,
      };

      const societiesData = await db.select(values).from(societies);

      logger.info({
        controller,
        event: "get_societies_success",
        requestId,
        metadata: { count: societiesData.length },
      });

      return res.status(200).json(societiesData);
    } catch (error) {
      logger.error({
        controller,
        event: "get_societies_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getSocietyDetails(req: Request, res: Response, next: NextFunction) {
    const controller = "getSocietyDetails";
    const requestId = req.id;
    const { id } = req.params;

    if (!id || !uuidErrorHandler(id)) {
      res.status(400).json({
        message: "Valid request id is required.",
      });
      return;
    }

    try {
      logger.info({
        controller,
        event: "get_society_details_initiated",
        requestId,
        metadata: { societyId: id },
      });

      const values = {
        id: societies.id,
        title: societies.title,
        description: societies.description,
        status: societies.status,
        createdAt: societies.createdAt,
        updatedAt: societies.updatedAt,
      };

      const [society] = await db
        .select(values)
        .from(societies)
        .where(eq(societies.id, id));

      if (!society) {
        logger.warn({
          controller,
          event: "society_not_found",
          requestId,
          metadata: { societyId: id },
        });

        return res.status(404).json({
          message: "Society not found",
        });
      }

      logger.info({
        controller,
        event: "get_society_details_success",
        requestId,
        metadata: { societyId: id },
      });

      return res.status(200).json(society);
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code === "22P02") {
        logger.warn({
          controller,
          event: "invalid_id_format",
          requestId,
          metadata: { societyId: id },
        });

        return res.status(400).json({
          message: "Invalid society ID format",
        });
      }

      logger.error({
        controller,
        event: "get_society_details_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getSocietyExistingMembers(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const controller = "getSocietyExistingMembers";
    const requestId = req.id;
    const { id } = req.params;

    if (!id || !uuidErrorHandler(id)) {
      return res.status(400).json({
        message: "Valid request id is required.",
      });
    }

    try {
      logger.info({
        controller,
        event: "get_society_members_initiated",
        requestId,
        metadata: { societyId: id },
      });

      const values = {
        memberId: societyMembers.id,
        userId: societyMembers.userId,
        role: societyMembers.role,
        status: societyMembers.status,
        joinedAt: societyMembers.joinedAt,

        userName: users.userName,
        email: users.email,
        isActive: users.isActive,
        isVerified: users.isVerified,
      };

      const members = await db
        .select(values)
        .from(societyMembers)
        .innerJoin(users, eq(societyMembers.userId, users.id))
        .where(
          and(
            eq(societyMembers.societyId, id),
            eq(societyMembers.status, "active"), // 🔥 important filter
          ),
        );

      if (!members.length) {
        logger.warn({
          controller,
          event: "no_members_found",
          requestId,
          metadata: { societyId: id },
        });

        return res.status(404).json({
          message: "No members found for this society",
        });
      }

      logger.info({
        controller,
        event: "get_society_members_success",
        requestId,
        metadata: {
          societyId: id,
          count: members.length,
        },
      });

      return res.status(200).json(members);
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code === "22P02") {
        logger.warn({
          controller,
          event: "invalid_id_format",
          requestId,
          metadata: { societyId: id },
        });

        return res.status(400).json({
          message: "Invalid society ID format",
        });
      }

      logger.error({
        controller,
        event: "get_society_members_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async updateSociety(req: Request, res: Response, next: NextFunction) {
    const controller = "updateSociety";
    const requestId = req.id;
    const { id } = req.params;

    if (!id || !uuidErrorHandler(id)) {
      res.status(400).json({
        message: "Valid request id is required.",
      });
      return;
    }

    logger.info({
      controller,
      event: "update_society_initiated",
      requestId,
      metadata: { params: req.params, body: req.body },
    });

    const parsed = createSocietySchema.partial().safeParse(req.body);

    if (!parsed.success) {
      logger.warn({
        controller,
        event: "validation_failed",
        requestId,
        metadata: { errors: parsed.error.flatten() },
      });

      return errorParser(parsed, res);
    }

    try {
      const updated = await db
        .update(societies)
        .set({
          ...parsed.data,
        })
        .where(eq(societies.id, id))
        .returning({
          id: societies.id,
        });

      if (!updated.length) {
        logger.warn({
          controller,
          event: "society_not_found",
          requestId,
          metadata: { societyId: id },
        });

        return res.status(404).json({
          message: "Society not found",
        });
      }

      logger.info({
        controller,
        event: "update_society_success",
        requestId,
        metadata: { societyId: id },
      });

      return res.status(200).json({
        message: "Society updated successfully",
      });
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code) {
        switch (pgError.code) {
          case "23505":
            return res.status(409).json({
              message: "Duplicate value detected",
            });

          case "22P02":
            return res.status(400).json({
              message: "Invalid ID format",
            });
        }
      }

      logger.error({
        controller,
        event: "update_society_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async deleteSociety(req: Request, res: Response, next: NextFunction) {
    const controller = "deleteSociety";
    const requestId = req.id;
    const { id } = req.params;

    logger.info({
      controller,
      event: "delete_society_initiated",
      requestId,
      metadata: { params: req.params },
    });

    try {
      const deleted = await db
        .delete(societies)
        .where(eq(societies.id, id))
        .returning({
          id: societies.id,
        });

      if (!deleted.length) {
        logger.warn({
          controller,
          event: "society_not_found",
          requestId,
          metadata: { societyId: id },
        });

        return res.status(404).json({
          message: "Society not found",
        });
      }

      logger.info({
        controller,
        event: "delete_society_success",
        requestId,
        metadata: { societyId: id },
      });

      return res.status(200).json({
        message: "Society deleted successfully",
      });
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code === "22P02") {
        return res.status(400).json({
          message: "Invalid ID format",
        });
      }

      if (pgError?.code === "23503") {
        return res.status(400).json({
          message: "Cannot delete: society is referenced by other records",
        });
      }

      logger.error({
        controller,
        event: "delete_society_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async getPlatformUsers(req: Request, res: Response, next: NextFunction) {
    const controller = "getPlatformUsers";
    const requestId = req.id;

    logger.info({
      controller,
      event: "get_platform_users_initiated",
      requestId,
      metadata: { query: req.query },
    });

    try {
      const { limit = "20", current_page = "1" } = req.query;

      const parsedLimit = Number(limit);
      const parsedPage = Number(current_page);

      if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
        return res
          .status(400)
          .json({ message: "Limit must be a positive integer" });
      }

      if (!Number.isInteger(parsedPage) || parsedPage <= 0) {
        return res
          .status(400)
          .json({ message: "Current page must be a positive integer" });
      }

      const finalLimit = parsedLimit > 40 ? 40 : parsedLimit;
      const offset = (parsedPage - 1) * finalLimit;

      const usersResult = await db
        .select({
          id: users.id,
          userName: users.userName,
          email: users.email,
          role: users.role,
          source: users.source,
          isVerified: users.isVerified,
          isActive: users.isActive,
          gender: users.gender,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(finalLimit)
        .offset(offset);

      const countResult = await db
        .select({
          total: sql<number>`count(${users.id})`,
        })
        .from(users);

      const totalUsers = Number(countResult[0]?.total ?? 0);
      const totalPages = Math.ceil(totalUsers / finalLimit);

      logger.info({
        controller,
        event: "get_platform_users_success",
        requestId,
        metadata: { usersFetched: usersResult.length, totalUsers },
      });

      return res.status(200).json({
        currentPage: parsedPage,
        totalUsers,
        totalPages,
        users: usersResult,
      });
    } catch (error: any) {
      logger.error({
        controller,
        event: "get_platform_users_failed",
        requestId,
        message: error?.message,
        stack: error?.stack,
      });

      return res.status(500).json({
        message: "An unexpected error occurred while fetching users.",
      });
    }
  }

  // ~ society users management
  async assignSocietyHead(req: Request, res: Response, next: NextFunction) {
    const controller = "assignSocietyHead";
    const requestId = req.id;

    const { societyId, userId } = req.body;

    if (
      !societyId ||
      !userId ||
      !uuidErrorHandler(societyId) ||
      !uuidErrorHandler(userId)
    ) {
      logger.warn({
        controller,
        event: "invalid_input",
        requestId,
        metadata: { societyId, userId },
      });

      return res.status(400).json({
        message: "Invalid or missing societyId/userId",
      });
    }

    logger.info({
      controller,
      event: "assign_society_head_initiated",
      requestId,
      metadata: { societyId, userId },
    });

    try {
      // check if already member
      const existingMember = await db
        .select()
        .from(societyMembers)
        .where(
          and(
            eq(societyMembers.societyId, societyId),
            eq(societyMembers.userId, userId),
          ),
        );

      let result;

      if (existingMember.length) {
        // update role to society_head
        result = await db
          .update(societyMembers)
          .set({ role: "society_head" })
          .where(
            and(
              eq(societyMembers.societyId, societyId),
              eq(societyMembers.userId, userId),
            ),
          )
          .returning({
            id: societyMembers.id,
          });

        logger.info({
          controller,
          event: "member_promoted_to_society_head",
          requestId,
          metadata: { societyId, userId },
        });
      } else {
        // insert new member as society_head
        result = await db
          .insert(societyMembers)
          .values({
            societyId,
            userId,
            role: "society_head",
            status: "active",
          })
          .returning({
            id: societyMembers.id,
          });

        logger.info({
          controller,
          event: "society_head_created",
          requestId,
          metadata: { societyId, userId },
        });
      }

      return res.status(200).json({
        message: "Society head assigned successfully",
        data: result,
      });
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code === "22P02") {
        return res.status(400).json({
          message: "Invalid ID format",
        });
      }

      if (pgError?.code === "23503") {
        return res.status(400).json({
          message: "Invalid societyId or userId reference",
        });
      }

      if (pgError?.code === "23505") {
        return res.status(400).json({
          message: "User already exists in society",
        });
      }

      logger.error({
        controller,
        event: "assign_society_head_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }

  async removeSocietyHead(req: Request, res: Response, next: NextFunction) {
    const controller = "removeSocietyHead";
    const requestId = req.id;

    const { societyId, userId } = req.body;

    if (
      !societyId ||
      !userId ||
      !uuidErrorHandler(societyId) ||
      !uuidErrorHandler(userId)
    ) {
      logger.warn({
        controller,
        event: "invalid_input",
        requestId,
        metadata: { societyId, userId },
      });

      return res.status(400).json({
        message: "Invalid or missing societyId/userId",
      });
    }

    logger.info({
      controller,
      event: "remove_society_head_initiated",
      requestId,
      metadata: { societyId, userId },
    });

    try {
      const member = await db
        .select()
        .from(societyMembers)
        .where(
          and(
            eq(societyMembers.societyId, societyId),
            eq(societyMembers.userId, userId),
          ),
        );

      if (!member.length) {
        return res.status(404).json({
          message: "Member not found in society",
        });
      }

      if (member[0].role !== "society_head") {
        return res.status(400).json({
          message: "User is not a society head",
        });
      }

      const updated = await db
        .update(societyMembers)
        .set({ role: "member" })
        .where(
          and(
            eq(societyMembers.societyId, societyId),
            eq(societyMembers.userId, userId),
          ),
        )
        .returning({
          id: societyMembers.id,
        });

      logger.info({
        controller,
        event: "society_head_removed",
        requestId,
        metadata: { societyId, userId },
      });

      return res.status(200).json({
        message: "Society head removed successfully",
        data: updated,
      });
    } catch (error: any) {
      const pgError = error?.cause;

      if (pgError?.code === "22P02") {
        return res.status(400).json({
          message: "Invalid ID format",
        });
      }

      logger.error({
        controller,
        event: "remove_society_head_failed",
        requestId,
        metadata: { error },
      });

      return next(error);
    }
  }
}

export const adminController = new AdminController();
