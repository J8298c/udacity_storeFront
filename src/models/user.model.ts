import Client from "../db";
import { User } from "../interfaces/user";

export const insertUser = async (
  email: string,
  first_name: string,
  last_name: string,
  password: string
) => {
  const client = await Client.connect();
  const insertQuery =
    "INSERT INTO users (email, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *";
  const results = await client.query(insertQuery, [
    email,
    first_name,
    last_name,
    password,
  ]);
  client.release();
  return results.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const client = await Client.connect();
  const fetchQuery = "SELECT password, id FROM users WHERE email=($1)";
  const results = await client.query(fetchQuery, [email]);
  client.release();
  return results.rows[0];
};

export const fetchUsers = async (): Promise<User[]> => {
  const client = await Client.connect();
  const fetchQuery = "SELECT email FROM users";
  const results = await client.query(fetchQuery);
  client.release();
  return results.rows;
};
