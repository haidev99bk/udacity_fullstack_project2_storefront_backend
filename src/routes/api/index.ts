import express from "express";
import usersRoutes from "./users";
import productsRoutes from "./products";

const apiRoutes = express.Router();

apiRoutes.use("/users", usersRoutes);
apiRoutes.use("/products", productsRoutes);

export default apiRoutes;
