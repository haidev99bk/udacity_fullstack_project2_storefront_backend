import pool from "../utils/database";
import { hashPassword } from "../utils/hashPass";

export interface UserBase {
  firstName: string;
  lastName: string;
  userName: string;
}

export interface UserFull extends UserBase {
  password: string;
}

export interface UserDB extends UserFull {
  id: number;
}

export class UserStore {
  async create(user: UserFull): Promise<UserDB> {
    const { firstName, lastName, userName, password } = user;

    try {
      const sql =
        "INSERT INTO users (first_name, last_name, user_name, hashed_password) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await pool.query(sql, [
        firstName,
        lastName,
        userName,
        hashPassword(password),
      ]);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
  async getAll(): Promise<UserDB[]> {
    try {
      const sql = "SELECT * FROM users";

      const users = await pool.query(sql);
      return users.rows;
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
  async getById(id: string): Promise<UserDB> {
    try {
      const sql = "SELECT * FROM users WHERE id=$1";

      const users = await pool.query(sql, [id]);
      return users.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
  async deleteUserById(id: string): Promise<UserDB> {
    try {
      const sql = "DELETE FROM users WHERE id=$1";
      const result = await pool.query(sql, [id]);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
  async updateUserById(id: string, user: UserFull): Promise<UserDB> {
    try {
      const sql =
        "UPDATE users SET user_name=$2, first_name=$3, last_name=$4, hashed_password=$5 WHERE id=$1 RETURNING *";
      const result = await pool.query(sql, [
        id,
        user.userName,
        user.firstName,
        user.lastName,
        hashPassword(user.password),
      ]);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
}
