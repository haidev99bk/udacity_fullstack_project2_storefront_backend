import express from "express";
import usersHandlers from "../../handlers/users";
import { verifyToken } from "../../middlewares/verifyToken";

const usersRoutes = express.Router();

usersRoutes.post("/create", usersHandlers.createUser);
usersRoutes.get("/", usersHandlers.getUsers);
usersRoutes.get("/:id", usersHandlers.getUserId);
usersRoutes.delete("/:id", verifyToken, usersHandlers.deleteUser);
usersRoutes.put("/:id", verifyToken, usersHandlers.updateUser);
usersRoutes.post("/authenticate", usersHandlers.authenticate);

export default usersRoutes;
