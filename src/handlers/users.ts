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

    res.json(token);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userStore.getAll();
    res.json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUserId = async (req: Request, res: Response) => {
  try {
    const user = await userStore.getById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userStore.deleteUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userStore.updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    if (!req.body.userName || !req.body.password) {
      res.status(400).send("Pls provide username and password");
      return;
    }

    const user = await userStore.authenticate(
      req.body.userName,
      req.body.password
    );

    if (!user) {
      res.status(400).send("Password is incorrect");
      return;
    }

    res.json(generateToken(user));
  } catch (err) {
    res.status(400).send(err);
  }
};

const usersHandlers = {
  createUser,
  getUsers,
  getUserId,
  deleteUser,
  updateUser,
  authenticate,
};

export default usersHandlers;
