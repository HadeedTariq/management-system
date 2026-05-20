import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { societyHeadController } from "./societyHead.controller";
import { checkAuth } from "../middleware";

const router = Router();

router.use(checkAuth);
router.get(
  "/my-analytics",
  asyncHandler(societyHeadController.societyHeadAnalytics),
);
router.get("/my-societies", asyncHandler(societyHeadController.getMySocieties));
router.get("/my-posts", asyncHandler(societyHeadController.getMyPosts));
router.get("/my-events", asyncHandler(societyHeadController.getMyEvents));

// ~ societies post management
router.get(
  "/society-posts/:id",
  asyncHandler(societyHeadController.getMySocietiesPosts),
);
router.post(
  "/society-posts/create/:id",
  asyncHandler(societyHeadController.createSocietyPost),
);
router.put(
  "/society-posts/:id",
  asyncHandler(societyHeadController.updateSocietyPost),
);
router.delete(
  "/society-posts/:id",
  asyncHandler(societyHeadController.deleteSocietyPost),
);
router.get(
  "/society-posts/details/:id",
  asyncHandler(societyHeadController.getSocietyPostById),
);
// ~ society events management
router.get(
  "/society-events/:id",
  asyncHandler(societyHeadController.getMySocietiesEvents),
);
router.post(
  "/society-events/create/:id",
  asyncHandler(societyHeadController.createSocietyEvent),
);
router.put(
  "/society-events/:id",
  asyncHandler(societyHeadController.updateSocietyEvent),
);
router.delete(
  "/society-events/:id",
  asyncHandler(societyHeadController.deleteSocietyEvent),
);
router.get(
  "/society-events/details/:id",
  asyncHandler(societyHeadController.getSocietyEventById),
);

export { router as societyHeadRouter };
