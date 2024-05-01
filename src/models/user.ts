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

      return result.rows[0] as UserDB;
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
}
