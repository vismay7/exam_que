import { Router } from "express";
import { login, userPayment } from "../controllers/login/login.controllers";
import adminRouter from "./admin/admin.routes";
import { VerifyOTP } from "../controllers/verifyOtp";

const router = Router();

router.post("/login", login);
router.post("/verify", VerifyOTP);
router.post("/payment/", userPayment);
router.use("/admin", adminRouter);

export default router;
