import dotenv from 'dotenv';
import Client  from './src/db';

dotenv.config();

async function insertProducts():Promise<void> {
  try {
    const client = await Client.connect();
    const insertQuery = `
      INSERT INTO products(name, price) VALUES ("apple candle", 1.00), ("storage bin", 25.00), ("nintendo", 85.00)
    `
    await client.query(insertQuery);
    client.release()
  } catch (err) {
    console.error(err)
  }
}

insertProducts()