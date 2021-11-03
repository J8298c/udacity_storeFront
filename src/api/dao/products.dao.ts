import client from "../../db";
import { Product } from "../interfaces/Products";

export const getAllProducts = async (): Promise<Product[]> => {
  const sqlConnection = await client.connect();
  const query = "SELECT * FROM products";
  const results = await sqlConnection.query(query);
  sqlConnection.release();
  return results.rows;
};

export const getProduct = async (id: number): Promise<Product> => {
  const sqlConnection = await client.connect();
  const query = `SELECT * FROM products WHERE id=($1)`;
  const results = await sqlConnection.query(query, [id]);
  sqlConnection.release();
  return results.rows[0];
};

export const insertProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  const sqlCon = await client.connect();
  const insertQuery =
    "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
  const results = await sqlCon.query(insertQuery, [name, price]);
  sqlCon.release();
  return results.rows[0];
};
