import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    userServiceURL: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    notificationServiceURL: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3002',
    paymentsServiceURL: process.env.PAYMENTS_SERVICE_URL || 'http://localhost:3003',
    recommendationsServiceURL: process.env.RECOMMENDATIONS_SERVICE_URL || 'http://localhost:3004',
    miningServiceURL: process.env.MINING_SERVICE_URL || 'http://localhost:3005',
};
