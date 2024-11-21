import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3002,
  mongoURI: process.env.MONGO_URI || '',
  rabbitURL: process.env.RABBIT_URL || 'amqp://guest:guest@34.235.59.24:5672',
  whatsApiToken: process.env.WHATSAPP_API_TOKEN,
  testPhoneNumber: process.env.TEST_PHONE_NUMBER,
  
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT): 465,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};
