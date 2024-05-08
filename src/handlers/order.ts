import { OrderProduct, OrdersStore } from "../models/orders";
import type { Request, Response } from "express";

const ordersStore = new OrdersStore();

const getAll = async (req: Request, res: Response) => {
  try {
    const orders = await ordersStore.getAll();

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).send(`Failed to get all orders: ${err}`);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const orders = await ordersStore.getById(req.params.id);

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).send(`Failed to get the order: ${err}`);
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await ordersStore.getOrdersByUserId(req.params.userId);

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).send(`Failed to get the order: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const orderProducts = req.body.orderProducts as OrderProduct[];

    if (!userId || !(orderProducts.length > 0)) {
      res
        .status(400)
        .json(
          "Pls provide completed info: {userId: string, orderProducts: [{ product_id: string,  quantity: number}]"
        );
      return;
    }

    const orderInfo = await ordersStore.create(userId, orderProducts);

    res.status(200).json(orderInfo);
  } catch (err) {
    res.status(400).send(`Failed to create order: ${err}`);
  }
};

const addMoreProducts = async (req: Request, res: Response) => {
  try {
    if (!req.params.id || !req.body.productId || !req.body.quantity) {
      return res.status(400).json({
        error: "Pls provides both orderId, productId, quantity",
      });
    }

    const product = await ordersStore.addMoreProduct(
      req.params.id,
      req.body.productId,
      parseInt(req.body.quantity)
    );

    return res.status(201).json(product);
  } catch (err) {
    res.status(400).send(`Failed to add more products: ${err}`);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    if (typeof req.body.status !== "boolean") {
      return res.status(400).json("Pls provide a new status");
    }

    const order = await ordersStore.updateOrder(req.params.id, req.body.status);

    return res.status(200).json(order);
  } catch (err) {
    res.status(400).send(`Failed to update the order: ${err}`);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await ordersStore.deleteOrder(req.params.orderId);

    return res.status(200).json(order);
  } catch (err) {
    res.status(400).send(`Failed to delete the order: ${err}`);
  }
};

const ordersHandler = {
  getAll,
  getById,
  create,
  addMoreProducts,
  updateOrder,
  getOrdersByUserId,
  deleteOrder,
};

export default ordersHandler;
