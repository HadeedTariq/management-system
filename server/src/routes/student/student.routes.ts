import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { checkAuth } from "../middleware";
import { studentController } from "./student.controller";

const router = Router();

router.get(
  "/get-all-societies",
  asyncHandler(studentController.getAllSocieites),
);
router.get("/get-all-events", asyncHandler(studentController.getAllEvents));

router.get(
  "/society/details/:id",
  asyncHandler(studentController.getSocietyDetails),
);
router.use(checkAuth);
router.post("/society/join/:id", asyncHandler(studentController.joinSociety));
router.post(
  "/society/leave/:id",
  asyncHandler(studentController.getSocietyDetails),
);

export { router as studentRouter };
