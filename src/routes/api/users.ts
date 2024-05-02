import express from "express";
import usersHandlers from "../../handlers/users";

const usersRoutes = express.Router();

usersRoutes.post("/create", usersHandlers.createUser);
usersRoutes.get("/", usersHandlers.getUsers);
usersRoutes.get("/:id", usersHandlers.getUserId);
usersRoutes.delete("/:id", usersHandlers.deleteUser);
usersRoutes.put("/:id", usersHandlers.updateUser);
usersRoutes.post("/authenticate", usersHandlers.authenticate);

export default usersRoutes;
