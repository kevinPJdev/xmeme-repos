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
//onst connstr = process.env.DATABASE_URL.concat('?sslmode=require');

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig)

export default pool;