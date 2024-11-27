import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'mysecret',
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || '',
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  dbName: process.env.DB_NAME || 'users_auticare',
  rabbitURL: process.env.RABBIT_URL || 'amqp://guest:guest@34.235.59.24:5672',
};
