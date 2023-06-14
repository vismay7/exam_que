import { Request, Response } from "express";
import prisma from "../db/Db-context";
import { createToken } from "../utils/jwt.util";

export const VerifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const data = await prisma.oTP.findUnique({
      where: { email: email },
    });
    if (data != null && otp === data.otp) {
      const token = createToken(data as any);
      res.status(200).json({ user: true, message: "Login successful", token: token });
    } else res.status(201).send("invalid otp");
  } catch (error) {
    res.status(202).send("Something went wrong !");
  }
};
