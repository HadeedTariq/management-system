import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/society/all", asyncHandler(adminController.getSocieties));
router.get(
  "/society/details/:id",
  asyncHandler(adminController.getSocietyDetails),
);
router.get(
  "/society/get-existing-members/:id",
  asyncHandler(adminController.getSocietyExistingMembers),
);
router.post("/society/create", asyncHandler(adminController.createSociety));
router.put("/society/update/:id", asyncHandler(adminController.updateSociety));
router.delete(
  "/society/delete/:id",
  asyncHandler(adminController.deleteSociety),
);

router.get("/users/all", asyncHandler(adminController.getPlatformUsers));
router.post(
  "/users/make-society-head/",
  asyncHandler(adminController.assignSocietyHead),
);
router.post(
  "/users/remove-society-head/",
  asyncHandler(adminController.removeSocietyHead),
);

export { router as adminRouter };
