import pool from "../utils/database";

export interface Order {
  order_id: string;
  status: boolean;
}

export interface OrderDB extends Order {
  id: string;
}

export interface OrderProduct {
  product_id: string;
  quantity: number;
}

export interface OrderProductDB extends OrderProduct {
  id: string;
  order_id: string;
}

export interface OrderInfo extends OrderDB {
  products: OrderProduct[];
}

export class OrdersStore {
  async getAll(): Promise<OrderDB[]> {
    try {
      const orderInfo = [];
      const sql = "SELECT * FROM orders";

      const orders = await pool.query(sql);

      const productInfoSql =
        "SELECT product_id, quantity FROM order_products WHERE order_id = $1";

      for (const order of orders.rows) {
        const productInfo = await pool.query(productInfoSql, [order.order_id]);

        orderInfo.push({
          ...order,
          products: productInfo.rows,
        });
      }

      return orderInfo as OrderInfo[];
    } catch (err) {
      throw new Error(`Failed to get orders: ${err}`);
    }
  }

  async getById(id: string): Promise<OrderDB> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";

      const order = await pool.query(sql, [id]);

      return order.rows[0] as OrderInfo;
    } catch (err) {
      throw new Error(`Failed to get order: ${err}`);
    }
  }

  async getOrdersByUserId(userId: string): Promise<OrderInfo[]> {
    try {
      const result: OrderInfo[] = [];
      const sqlGetOrders = "SELECT * FROM orders WHERE user_id=($1)";
      const orders = await pool.query(sqlGetOrders, [userId]);

      const sqlGetOrderProducts =
        "SELECT * FROM order_products WHERE order_id=($1)";

      for (let order of orders.rows) {
        const products = await pool.query(sqlGetOrderProducts, [order.id]);
        result.push({
          ...order,
          products: products.rows,
        });
      }

      return result;
    } catch (err) {
      throw new Error(`Failed to get current orders: ${err}`);
    }
  }

  async create(
    userId: string,
    orderProducts: OrderProduct[]
  ): Promise<OrderDB> {
    try {
      let orderInfo = {} as OrderInfo;
      // create order for user
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, FALSE) RETURNING *";

      const orders = await pool.query(sql, [userId]);

      orderInfo = { ...orders.rows[0], products: [] };

      // add list of products info to the order
      const orderedProductsInfoSql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";

      for (let product of orderProducts) {
        const orderProducts = await pool.query(orderedProductsInfoSql, [
          orderInfo.id,
          product.product_id,
          product.quantity,
        ]);

        orderInfo.products = orderProducts.rows;
      }

      return orderInfo as OrderInfo;
    } catch (err) {
      throw new Error(`Failed to create order: ${err}`);
    }
  }

  async addMoreProduct(orderId: string, productId: string, quantity: number) {
    try {
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";

      const ordersProducts = await pool.query(sql, [
        orderId,
        productId,
        quantity.toString(),
      ]);

      const newOrderedProduct = ordersProducts.rows[0];

      return newOrderedProduct as OrderInfo;
    } catch (err) {
      throw new Error(`Failed to create order: ${err}`);
    }
  }

  async updateOrder(orderId: string, status: boolean) {
    try {
      const sql = "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *";

      const order = await pool.query(sql, [status, orderId]);

      return order.rows[0] as OrderInfo;
    } catch (err) {
      throw new Error(`Failed to update the order: ${err}`);
    }
  }

  async deleteOrder(orderId: string) {
    try {
      const sqlDeleteProducts =
        "DELETE FROM order_products WHERE order_id=$1 RETURNING *";
      await pool.query(sqlDeleteProducts, [orderId]);

      const sqlDeleteTheOrder = "DELETE FROM orders WHERE id=$1 RETURNING *";

      const order = await pool.query(sqlDeleteTheOrder, [orderId]);

      return order.rows[0] as OrderInfo;
    } catch (err) {
      throw new Error(`Failed to delete the order: ${err}`);
    }
  }
}
