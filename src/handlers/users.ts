const getUsers = () => {};
import type { Request, Response } from "express";
import { UserFull, UserStore } from "../models/user";
import { generateToken } from "../utils/token";

const userStore = new UserStore();

const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, password, userName } = req.body as UserFull;

  if (!firstName || !lastName || !password || !userName) {
    res.status(400);
    res.send("Pls provide both firstName, lastName, password and userName");
    return;
  }

  try {
    const token = generateToken({ firstName, lastName, userName });
    const createdUser = await userStore.create(req.body);

    console.log("createdUser", createdUser);
    res.json(token);
  } catch (err) {
    console.log("createUser err: ", err);
    res.status(400).json({ err });
  }
};

const usersHandlers = {
  getUsers,
  createUser,
};

export default usersHandlers;
