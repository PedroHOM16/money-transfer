// import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  dialect: 'postgres',
  username: process.env.PGUSER || 'pedro',
  password: process.env.PGPASSWORD || '1609',
  database: process.env.PGDATABASE || 'ngcash_api',
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
}

export default config;