import { Request, Response } from "express";
import prisma from "../../db/Db-context";

export const getUserPaymentData = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const userData = await prisma.devotee.findMany({ where: { email: email } });

    res.status(404).json(userData);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
