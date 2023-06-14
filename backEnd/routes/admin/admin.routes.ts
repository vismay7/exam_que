import { Router } from "express";
import { UpdateUser, addUser, getAllUser, getUserById } from "../../controllers/admin/admin.controller";
import { VerifyAdmin } from "../../middleware/verifyAdmin.middleware";

const adminRouter = Router();

adminRouter.post("/form", VerifyAdmin, addUser);
adminRouter.get("/dashboard", VerifyAdmin, getAllUser);
adminRouter.get("/getDashboard/:id", VerifyAdmin, getUserById);
adminRouter.post("/editUser/:id", UpdateUser);

export default adminRouter;
