import express from "express";
import productsHandler from "../../handlers/products";
import { tokenVerifyMiddleware } from "../../middlewares/tokenVerifyMiddleware";

const productsRoutes = express.Router();

productsRoutes.get("/", productsHandler.getAll);
productsRoutes.post("/create", tokenVerifyMiddleware, productsHandler.create);
productsRoutes.get("/:id", productsHandler.get);
productsRoutes.delete(
  "/:id",
  tokenVerifyMiddleware,
  productsHandler.deleteProduct
);
productsRoutes.put("/:id", tokenVerifyMiddleware, productsHandler.update);

export default productsRoutes;
