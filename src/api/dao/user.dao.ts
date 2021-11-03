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

export const getUser = async (email: string): Promise<User> => {
  const sqlCon = await client.connect();
  const findQuery = "SELECT * FROM users WHERE email=($1)";
  const results = await sqlCon.query(findQuery, [email]);
  sqlCon.release();
  return results.rows[0];
};

export const getAllUsers = async (): Promise<User[]> => {
  const sqlCon = await client.connect();
  const findQuery = "SELECT email, id FROM users";
  const results = await sqlCon.query(findQuery);
  sqlCon.release();
  return results.rows;
};

export const fetchSingleUserById = async (id: number): Promise<User | null> => {
  const sqlCon = await client.connect();
  const findQuery = "SELECT email FROM users WHERE id=($1)";
  const results = await sqlCon.query(findQuery, [id]);
  if (!results.rows.length) {
    return null;
  }
  return results.rows[0];
};
