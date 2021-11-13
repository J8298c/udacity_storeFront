import Client from '../db';

export const fetchAllProducts = async () => {
  const client = await Client.connect()
  const fetchQuery = 'SELECT * FROM products';
  const results = await client.query(fetchQuery);
  client.release()
  return results.rows;
}

export const fetchSingleProduct = async (id: number) => {
  const client = await Client.connect()
  const fetchQuery = 'SELECT * FROM products WHERE id=($1)'
  const results = await client.query(fetchQuery, [id])
  client.release()
  return results.rows[0];
}

export const orderProduct = async (productId: number, userId: number, quantity: number) => {
  const client = await Client.connect();
  const insertQuery = 'INSERT INTO products_orders (quantity, product_id, user_id) VALUES($1, $2, $3)'
  await client.query(insertQuery, [quantity, productId, userId])
  client.release()
}

export const fetchOrders = async () => {
  const client = await Client.connect();
  const fetchQuery = 'SELECT * FROM products_orders';
  const results = await client.query(fetchQuery)
  client.release()
  return results.rows
}