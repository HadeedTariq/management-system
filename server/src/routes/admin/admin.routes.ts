import { Router } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { adminController } from "./admin.controller";
import { adminTokenChecker, isAdmin } from "./admin.middleware";

const router = Router();

router.use(isAdmin);

router.post("/set-up", asyncHandler(adminController.adminAuthHandler));

router.use(adminTokenChecker);

router.get("/reach-able", asyncHandler(adminController.adminHealthChecker));
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
router.post(
  "/users/remove-society-head/",
  asyncHandler(adminController.removeSocietyHead),
);
router.delete(
  "/users/delete/:userId",
  asyncHandler(adminController.deleteUser),
);
router.post("/users/ban/", asyncHandler(adminController.banUser));

export { router as adminRouter };
