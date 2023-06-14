import { Request, Response } from "express";
import prisma from "../../db/Db-context";
import { createToken } from "../../utils/jwt.util";
import { sendMail } from "../../utils/email.util";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findAdmin = await prisma.admin.findUnique({ where: { email: email } });
    const findUser = await prisma.devotee.findUnique({ where: { email: email } });

    if (findAdmin && findAdmin.password === password) {
      const token = createToken({ email: findAdmin.email!, userId: findAdmin.adminID });
      res.status(200).json({ user: false, message: "Login successful", token, data: findAdmin });
    } else if (findUser && findUser.password === password) {
      const OTP = Math.floor(Math.random() * 1000).toString();
      const Data = await prisma.oTP.findUnique({ where: { email: email } });

      if (Data != null) {
        await prisma.oTP.update({
          where: { email: email },
          data: { otp: OTP },
        });
      } else {
        await prisma.oTP.create({
          data: { email: email, otp: OTP },
        });
      }
      const Body = `Your OTP For Email : ${email} is ${OTP}`;
      sendMail(Body, email);
      res.status(200).json({ user: true, message: "Login successful", data: findUser });
    } else {
      res.status(402).json("user creads wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const userPayment = async (req: Request, res: Response) => {
  try {
    const { userId, amount, month, year } = req.body;
    const user = await prisma.devotee.findUnique({ where: { email: userId } });
    const pay = await prisma.payment.create({ data: { amount: parseInt(amount), month: month, year: parseInt(year), devoteeID: user?.id! } });
    console.log(pay);
    res.status(200).json({ pay: "payment succesfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
