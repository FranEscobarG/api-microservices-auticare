import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    authServiceURL: process.env.AUTH_SERVICE_URL || 'http://localhost:3004',
    userServiceURL: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    notificationServiceURL: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3002',
    paymentsServiceURL: process.env.PAYMENTS_SERVICE_URL || 'http://localhost:3003',
    // publicationServiceUrl: process.env.PUBLICATION_SERVICE_URL || 'http://localhost:3005',
};
