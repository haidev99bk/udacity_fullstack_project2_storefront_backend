import express from "express";
import productsHandler from "../../handlers/products";
import { verifyToken } from "../../middlewares/verifyToken";

const productsRoutes = express.Router();

productsRoutes.get("/", productsHandler.getAll);
productsRoutes.post("/create", verifyToken, productsHandler.create);
productsRoutes.get("/:id", productsHandler.get);
productsRoutes.delete("/:id", verifyToken, productsHandler.deleteProduct);
productsRoutes.put("/:id", verifyToken, productsHandler.update);

export default productsRoutes;
