import express from "express";
import usersHandlers from "../../handlers/users";

const usersRoutes = express.Router();

usersRoutes.get("/", usersHandlers.getUsers);
usersRoutes.post("/create", usersHandlers.createUser);

export default usersRoutes;
