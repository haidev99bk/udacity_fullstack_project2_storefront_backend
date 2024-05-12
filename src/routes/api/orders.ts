import express from "express";
import ordersHandler from "../../handlers/order";
import { tokenVerifyMiddleware } from "../../middlewares/tokenVerifyMiddleware";

const orderRoutes = express.Router();

orderRoutes.get("/", ordersHandler.getAll);
orderRoutes.get("/:id", tokenVerifyMiddleware, ordersHandler.getById);
orderRoutes.put("/:id", tokenVerifyMiddleware, ordersHandler.updateOrder);
orderRoutes.get(
  "/current-orders/:userId",
  tokenVerifyMiddleware,
  ordersHandler.getOrdersByUserId
);
orderRoutes.post("/create", tokenVerifyMiddleware, ordersHandler.create);
orderRoutes.post(
  "/add-products/:id",
  tokenVerifyMiddleware,
  ordersHandler.addMoreProducts
);
orderRoutes.delete(
  "/:orderId",
  tokenVerifyMiddleware,
  ordersHandler.deleteOrder
);

export default orderRoutes;
