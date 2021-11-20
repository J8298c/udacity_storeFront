import Client from "../db";
import { Product } from "../interfaces/products";

export const fetchAllProducts = async (): Promise<Product[]> => {
  const client = await Client.connect();
  const fetchQuery = "SELECT * FROM products";
  const results = await client.query(fetchQuery);
  client.release();
  return results.rows;
};

export const createNewProduct = async (
  name: string,
  price: number
): Promise<void> => {
  const client = await Client.connect();
  const insertQuery = "INSERT INTO products (name, price) VALUES($1, $2)";
  await client.query(insertQuery, [name, price]);
  client.release();
};

export const fetchSingleProduct = async (id: number): Promise<Product> => {
  const client = await Client.connect();
  const fetchQuery = "SELECT * FROM products WHERE id=($1)";
  const results = await client.query(fetchQuery, [id]);
  client.release();
  return results.rows[0];
};

export const orderProduct = async (
  productId: number,
  userId: number,
  quantity: number
) => {
  const client = await Client.connect();
  const insertQuery =
    "INSERT INTO orders (quantity, product_id, user_id) VALUES($1, $2, $3)";
  await client.query(insertQuery, [quantity, productId, userId]);
  client.release();
};

export const fetchOrders = async () => {
  const client = await Client.connect();
  const fetchQuery = "SELECT * FROM orders";
  const results = await client.query(fetchQuery);
  client.release();
  return results.rows;
};
