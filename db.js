import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Pool = require('pg').Pool;
require("dotenv").config();

//Production and Development DB connections
const devConfig = {
  user:"postgres",
  password:"welcome123",
  host:"localhost",
  database:"x-meme",
  port: 5432
}

const proConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig)

export default pool;