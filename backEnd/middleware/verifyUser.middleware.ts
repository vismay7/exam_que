import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const VerifyDevotee = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  jwt.verify(token as string, process.env.KEY!, (err, data) => {
    if (!err) {
      next();
    } else {
      res.status(400).send("Invalid user access");
    }
  });
};
