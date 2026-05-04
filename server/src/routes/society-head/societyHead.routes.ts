import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { societyHeadController } from "./societyHead.controller";
import { checkAuth } from "../middleware";

const router = Router();

router.use(checkAuth);
router.get("/my-societies", asyncHandler(societyHeadController.getMySocieties));
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
  "/society-posts/:id",
  asyncHandler(societyHeadController.getSocietyPostById),
);

export { router as societyHeadRouter };
