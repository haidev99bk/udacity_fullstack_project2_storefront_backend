import express from "express";
import usersRoutes from "./users";

const apiRoutes = express.Router();

apiRoutes.use("/users", usersRoutes);

export default apiRoutes;
