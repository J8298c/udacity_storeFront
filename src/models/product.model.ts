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
  const fetchQuery = 'SELECT name, price FROM products WHERE id=($1)'
  const results = await client.query(fetchQuery, [id])
  client.release()
  return results.rows[0];
}