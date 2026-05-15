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

router.get(
  "/event/details/:id",
  asyncHandler(studentController.getEventDetails),
);
router.use(checkAuth);
router.post("/society/join/:id", asyncHandler(studentController.joinSociety));
router.post("/society/leave/:id", asyncHandler(studentController.leaveSociety));
router.get(
  "/portal/my-details",
  asyncHandler(studentController.studentDetails),
);
router.get(
  "/portal/joined-societies",
  asyncHandler(studentController.joinedSocieties),
);
router.get("/portal/saved-posts", asyncHandler(studentController.savedPosts));
router.get("/portal/saved-events", asyncHandler(studentController.savedEvents));

export { router as studentRouter };
