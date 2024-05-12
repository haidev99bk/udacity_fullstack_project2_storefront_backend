import pool from '../utils/database'

interface Product {
  name: string
  price: number
}

interface ProductDB extends Product {
  id: string
}

export class ProductsStore {
  async getAll(): Promise<ProductDB[]> {
    try {
      const sql = 'SELECT * FROM products'

      const users = await pool.query(sql)
      return users.rows
    } catch (err) {
      throw new Error(`Failed to get products: ${err}`)
    }
  }
  async get(id: number): Promise<ProductDB[]> {
    try {
      const sql = 'SELECT * FROM products WHERE id = $1'

      const users = await pool.query(sql, [id])
      return users.rows[0]
    } catch (err) {
      throw new Error(`Failed to get product: ${err}`)
    }
  }
  async create(name: string, price: number): Promise<ProductDB> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'

      const users = await pool.query(sql, [name, price])
      return users.rows[0]
    } catch (err) {
      throw new Error(`Failed to create product: ${err}`)
    }
  }

  async update(id: number, newData: Product): Promise<ProductDB> {
    try {
      const sql =
        'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *'
      const { rows } = await pool.query(sql, [newData.name, newData.price, id])
      return rows[0]
    } catch (err) {
      throw new Error(`Failed to update product: ${err}`)
    }
  }

  async deleteProduct(id: number): Promise<ProductDB> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      const { rows } = await pool.query(sql, [id])
      return rows[0]
    } catch (err) {
      throw new Error(`Could not delete product ${id}. ${err}`)
    }
  }
}
