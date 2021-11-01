import client from "../../db";
import { User } from "../interfaces/User";

export const insertUser = async (
  email: string,
  hashedPassword: string
): Promise<User> => {
  const sqlCon = await client.connect();
  const query =
    "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *";
  const results = await sqlCon.query(query, [email, hashedPassword]);
  sqlCon.release();
  return results.rows[0];
};
