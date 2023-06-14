import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const VerifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  jwt.verify(token as string, process.env.SECRET!, (err, data) => {
    if (!err) {
      next();
    } else {
      res.status(400).send("Invalid user access");
    }
  });
};
