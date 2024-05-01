import { UserBase } from "../models/user";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

dotEnv.config();

export const generateToken = (user: UserBase) => {
  return jwt.sign(user, process.env.SECRET_KEY as string);
};
