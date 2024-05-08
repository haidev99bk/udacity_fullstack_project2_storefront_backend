import express from "express";
import usersRoutes from "./users";
import productsRoutes from "./products";
import orderRoutes from "./orders";

const apiRoutes = express.Router();

apiRoutes.use("/users", usersRoutes);
apiRoutes.use("/products", productsRoutes);
apiRoutes.use("/orders", orderRoutes);

export default apiRoutes;
