import dotnev from "dotenv";
import faker from "faker";

dotnev.config();

import { Pool } from "pg";

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

const seedProducts = async () => {
  const sqlQuery =
    "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
  const dbCon = await client.connect();
  const results = await dbCon.query(sqlQuery, [
    faker.commerce.productName(),
    Number(faker.commerce.price(1, 25)),
  ]);
  console.log(results.rowCount);
  dbCon.release();
  return;
};

seedProducts();
