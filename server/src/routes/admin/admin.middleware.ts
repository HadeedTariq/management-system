import { env } from "@/common/utils/envConfig";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next({
        message: "Access Token not found",
        status: 404,
      });
    }

    const user: any = jwt.verify(accessToken, env.JWT_ACCESS_TOKEN_SECRET);

    if (!user) {
      return next({
        message: "Invalid Access Token",
        status: 404,
      });
    }

    if (user.role !== "admin") {
      return next({
        message: "You are not authorized to perform this action",
        status: 403,
      });
    }

    if (req.body === undefined) {
      req.body = {};
    }

    req.body.user = user;
    next();
  } catch (error) {
    return next({
      message:
        error instanceof jwt.JsonWebTokenError
          ? "Please authenticate to perform this action"
          : "Authentication Error",
      status: 401,
    });
  }
}

export function adminTokenChecker(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { setupToken } = req.cookies;

    if (!setupToken) {
      return next({
        status: 401,
        message: "Authentication required. Token missing.",
      });
    }

    let decoded: any;

    try {
      decoded = jwt.verify(setupToken, env.JWT_SETUP_TOKEN_SECRET);
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError) {
        return next({
          status: 401,
          message: "Session expired. Please re-authenticate.",
        });
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return next({
          status: 401,
          message: "Invalid authentication token.",
        });
      }

      return next({
        status: 500,
        message: "Internal token validation error.",
      });
    }

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return next({
        status: 401,
        message: "Malformed token payload.",
      });
    }

    // Optional: enforce internal expiry if included inside payload
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return next({
        status: 440,
        message: "Token has expired. Please authenticate again.",
      });
    }

    return next();
  } catch (error: any) {
    return next({
      status: 500,
      message: "Unexpected authentication error.",
    });
  }
}
