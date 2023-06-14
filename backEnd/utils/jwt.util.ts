import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtData {
  userId: number;
  email: string;
}

const secretKey = process.env.SECRET;
const tokenExpiration = "2h";

const createToken = (data: JwtData): string => {
  const token = jwt.sign(data, secretKey!, { expiresIn: tokenExpiration });
  return token;
};

export { createToken };
