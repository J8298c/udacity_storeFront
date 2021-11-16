import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, NODE_ENV } =
  process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV !== 'test' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
