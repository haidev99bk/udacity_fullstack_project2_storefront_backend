import express from "express";
import ordersHandler from "../../handlers/order";

const orderRoutes = express.Router();

orderRoutes.get("/", ordersHandler.getAll);
orderRoutes.get("/:id", ordersHandler.getById);
orderRoutes.post("/:id", ordersHandler.updateOrder);
orderRoutes.get("/current-orders/:userId", ordersHandler.getOrdersByUserId);
orderRoutes.post("/create", ordersHandler.create);
orderRoutes.post("/add-products/:id", ordersHandler.addMoreProducts);
orderRoutes.delete("/:orderId", ordersHandler.deleteOrder);

export default orderRoutes;
