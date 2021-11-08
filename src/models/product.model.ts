import Client from '../db';

export const fetchAllProducts = async () => {
  const client = await Client.connect()
  const fetchQuery = 'SELECT * FROM products';
  const results = await client.query(fetchQuery);
  client.release()
  return results.rows;
}